require "test_helper"
require "tempfile"

class EmployeeImportJobTest < ActiveJob::TestCase
  include ActionCable::TestHelper

  setup do
    @country = Country.create!(name: "India", code: "IN")
    @currency = Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")
    @import_id = "import-#{SecureRandom.uuid}"
  end

  def test_imports_employees_and_broadcasts_the_starting_and_completed_progress
    path = write_csv([
      "first_name,last_name,email,employee_id,country,salary_currency,salary_amount,designation,status,department",
      "Jane,Doe,jane@example.com,EMP1,IN,INR,1000,,,"
    ])

    EmployeeImportJob.perform_now(path, @import_id)

    progress = Employees::ImportProgress.latest(@import_id)

    assert_equal 100, progress[:percent]
    assert_equal 1, progress[:createdCount]
    assert_empty progress[:failures]
    assert_equal 1, Employee.count
  end

  def test_deletes_the_uploaded_file_after_processing
    path = write_csv([
      "first_name,last_name,email,employee_id,country,salary_currency,salary_amount,designation,status,department"
    ])

    EmployeeImportJob.perform_now(path, @import_id)

    assert_not File.exist?(path)
  end

  private

    def write_csv(lines)
      file = Tempfile.new([ "import", ".csv" ])
      file.write(lines.join("\n"))
      file.flush
      file.close
      file.path
    end
end
