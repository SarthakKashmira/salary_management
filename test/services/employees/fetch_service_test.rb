require "test_helper"

module Employees
  class FetchServiceTest < ActiveSupport::TestCase
    setup do
      @country = Country.create!(name: "India", code: "IN")
    end

    def test_returns_all_employees_when_no_search_term_is_given
      create_employee

      assert_equal 1, FetchService.new.process.count
    end

    def test_matches_by_employee_id
      employee = create_employee(employee_id: "EMPX1")

      assert_equal [ employee ], FetchService.new(search_term: "empx").process.to_a
    end

    def test_matches_by_first_name
      employee = create_employee(first_name: "Priya")

      assert_equal [ employee ], FetchService.new(search_term: "priy").process.to_a
    end

    def test_matches_by_department_name
      department = Department.create!(name: "Engineering")
      employee = create_employee(employee_id: "EMPX2", email: "other@example.com", department: department)

      assert_equal [ employee ], FetchService.new(search_term: "engineer").process.to_a
    end

    def test_returns_no_employees_when_nothing_matches
      create_employee

      assert_empty FetchService.new(search_term: "nonexistent").process
    end

    private

      def create_employee(**overrides)
        Employee.create!(
          {
            employee_id: "EMP1", first_name: "Jane", last_name: "Doe", email: "jane@example.com",
            joining_date: Date.current, country: @country
          }.merge(overrides)
        )
      end
  end
end
