require "test_helper"

class DepartmentTest < ActiveSupport::TestCase
  def test_valid_with_just_a_name
    department = Department.new(name: "Engineering")

    assert department.valid?
  end

  def test_invalid_without_a_name
    department = Department.new(code: "ENG")

    assert_not department.valid?
    assert_includes department.errors[:name], "can't be blank"
  end

  def test_invalid_with_a_duplicate_name
    Department.create!(name: "Engineering")
    department = Department.new(name: "Engineering")

    assert_not department.valid?
    assert_includes department.errors[:name], "has already been taken"
  end

  def test_allows_multiple_departments_with_a_nil_code
    Department.create!(name: "Engineering")
    department = Department.new(name: "Sales")

    assert department.valid?
  end

  def test_invalid_with_a_duplicate_code
    Department.create!(name: "Engineering", code: "ENG")
    department = Department.new(name: "Sales", code: "ENG")

    assert_not department.valid?
    assert_includes department.errors[:code], "has already been taken"
  end

  def test_cannot_be_destroyed_while_employees_are_assigned_to_it
    department = Department.create!(name: "Engineering")
    country = Country.create!(name: "India", code: "IN")
    Employee.create!(
      employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
      joining_date: Date.current, country: country, department: department
    )

    assert_not department.destroy
    assert_includes department.errors[:base].first, "cannot be deleted"
    assert Department.exists?(department.id)
  end

  def test_can_be_destroyed_when_no_employees_are_assigned_to_it
    department = Department.create!(name: "Engineering")

    assert department.destroy
  end
end
