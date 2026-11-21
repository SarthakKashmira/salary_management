require "test_helper"
require "tempfile"

module Employees
  class ImportServiceTest < ActiveSupport::TestCase
    include ActionCable::TestHelper

    HEADERS = %w[
      first_name last_name email employee_id country salary_currency salary_amount designation status department
    ].freeze

    setup do
      @country = Country.create!(name: "India", code: "IN")
      @currency = Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")
      @import_id = "import-#{SecureRandom.uuid}"
    end

    teardown do
      @csv&.close
      @csv&.unlink
    end

    def test_creates_employees_and_salaries_for_valid_rows
      rows = [
        [ "Jane", "Doe", "jane@example.com", "EMP1", "IN", "INR", "1000", "", "", "" ],
        [ "John", "Smith", "john@example.com", "EMP2", "IN", "INR", "2000", "", "", "" ]
      ]

      result = service_for(rows).process

      assert_equal 2, result.created_count
      assert_empty result.failures
      assert_equal 2, Employee.count
      assert_equal 2, Salary.count
    end

    def test_matches_country_by_name_case_insensitively
      rows = [ [ "Jane", "Doe", "jane@example.com", "EMP1", "india", "INR", "1000", "", "", "" ] ]

      result = service_for(rows).process

      assert_equal 1, result.created_count
      assert_equal @country, Employee.find_by(employee_id: "EMP1").country
    end

    def test_records_a_failure_when_the_country_is_not_recognized
      rows = [ [ "Jane", "Doe", "jane@example.com", "EMP1", "Nowhere", "INR", "1000", "", "", "" ] ]

      result = service_for(rows).process

      assert_equal 0, result.created_count
      assert_equal 1, result.failures.size
      assert_match "Country not supported", result.failures.first.reason
      assert_equal 0, Employee.count
    end

    def test_records_a_failure_when_the_currency_is_not_recognized
      rows = [ [ "Jane", "Doe", "jane@example.com", "EMP1", "IN", "XXX", "1000", "", "", "" ] ]

      result = service_for(rows).process

      assert_equal 1, result.failures.size
      assert_match "Currency not supported", result.failures.first.reason
    end

    def test_records_a_failure_when_the_row_fails_model_validation
      Employee.create!(
        employee_id: "EMP1", first_name: "Existing", email: "existing@example.com",
        joining_date: Date.current, country: @country
      )
      rows = [ [ "Jane", "Doe", "jane@example.com", "EMP1", "IN", "INR", "1000", "", "", "" ] ]

      result = service_for(rows).process

      assert_equal 0, result.created_count
      assert_equal 1, result.failures.size
      assert_equal 2, result.failures.first.row
    end

    def test_creates_a_new_department_when_given_an_unknown_department_name
      rows = [ [ "Jane", "Doe", "jane@example.com", "EMP1", "IN", "INR", "1000", "", "", "Engineering" ] ]

      assert_difference -> { Department.count }, 1 do
        service_for(rows).process
      end

      assert_equal "Engineering", Employee.find_by(employee_id: "EMP1").department.name
    end

    def test_reuses_an_existing_department_matched_case_insensitively
      department = Department.create!(name: "Engineering")
      rows = [ [ "Jane", "Doe", "jane@example.com", "EMP1", "IN", "INR", "1000", "", "", "engineering" ] ]

      assert_no_difference -> { Department.count } do
        service_for(rows).process
      end

      assert_equal department, Employee.find_by(employee_id: "EMP1").department
    end

    def test_normalizes_an_unrecognized_status_to_active
      rows = [ [ "Jane", "Doe", "jane@example.com", "EMP1", "IN", "INR", "1000", "", "bogus", "" ] ]

      service_for(rows).process

      assert Employee.find_by(employee_id: "EMP1").active?
    end

    def test_accepts_a_valid_status_value
      rows = [ [ "Jane", "Doe", "jane@example.com", "EMP1", "IN", "INR", "1000", "", "inactive", "" ] ]

      service_for(rows).process

      assert Employee.find_by(employee_id: "EMP1").inactive?
    end

    def test_broadcasts_progress_after_parsing_headers_and_rows
      rows = [ [ "Jane", "Doe", "jane@example.com", "EMP1", "IN", "INR", "1000", "", "", "" ] ]

      assert_broadcasts("employee_import_#{@import_id}", 2) do
        service_for(rows).process
      end

      assert_equal 50, Employees::ImportProgress.latest(@import_id)[:percent]
    end

    def test_persist_upload_writes_the_uploaded_file_and_returns_its_path
      upload = Struct.new(:original_filename, :content) do
        def read
          content
        end
      end.new("employees.csv", "first_name\nJane\n")

      path = ImportService.persist_upload(upload)

      assert path.end_with?(".csv")
      assert_equal "first_name\nJane\n", File.read(path)
    ensure
      FileUtils.rm_f(path)
    end

    private

      def write_csv(rows)
        @csv = Tempfile.new([ "import", ".csv" ])
        @csv.write(rows.map { |row| row.join(",") }.join("\n"))
        @csv.flush
        @csv.path
      end

      def service_for(rows)
        ImportService.new(file_path: write_csv([ HEADERS ] + rows), import_id: @import_id)
      end
  end
end
