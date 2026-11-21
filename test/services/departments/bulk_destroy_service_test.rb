require "test_helper"

module Departments
  class BulkDestroyServiceTest < ActiveSupport::TestCase
    def test_destroys_departments_with_no_employees
      department = Department.create!(name: "Engineering")

      result = BulkDestroyService.new(ids: [ department.id ]).process

      assert_equal 1, result.deleted_count
      assert_empty result.failed_departments
      assert_not Department.exists?(department.id)
    end

    def test_does_not_destroy_departments_with_employees_assigned
      department = Department.create!(name: "Engineering")
      country = Country.create!(name: "India", code: "IN")
      Employee.create!(
        employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
        joining_date: Date.current, country: country, department: department
      )

      result = BulkDestroyService.new(ids: [ department.id ]).process

      assert_equal 0, result.deleted_count
      assert_equal 1, result.failed_departments.size

      failed = result.failed_departments.first

      assert_equal department.id, failed.id
      assert_equal department.name, failed.name
      assert_equal 1, failed.employees_count
      assert Department.exists?(department.id)
    end

    def test_partitions_a_mix_of_deletable_and_blocked_departments
      deletable = Department.create!(name: "Sales")
      blocked = Department.create!(name: "Engineering")
      country = Country.create!(name: "India", code: "IN")
      Employee.create!(
        employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
        joining_date: Date.current, country: country, department: blocked
      )

      result = BulkDestroyService.new(ids: [ deletable.id, blocked.id ]).process

      assert_equal 1, result.deleted_count
      assert_equal 1, result.failed_departments.size
      assert_equal blocked.id, result.failed_departments.first.id
      assert_not Department.exists?(deletable.id)
      assert Department.exists?(blocked.id)
    end
  end
end
