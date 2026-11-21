require "test_helper"

class EmployeeTest < ActiveSupport::TestCase
  setup do
    @country = Country.create!(name: "India", code: "IN")
  end

  def test_valid_with_the_required_attributes
    employee = Employee.new(valid_attributes)

    assert employee.valid?
  end

  def test_invalid_without_an_employee_id
    employee = Employee.new(valid_attributes(employee_id: nil))

    assert_not employee.valid?
    assert_includes employee.errors[:employee_id], "can't be blank"
  end

  def test_invalid_without_a_first_name
    employee = Employee.new(valid_attributes(first_name: nil))

    assert_not employee.valid?
    assert_includes employee.errors[:first_name], "can't be blank"
  end

  def test_invalid_without_an_email
    employee = Employee.new(valid_attributes(email: nil))

    assert_not employee.valid?
    assert_includes employee.errors[:email], "can't be blank"
  end

  def test_invalid_without_a_joining_date
    employee = Employee.new(valid_attributes(joining_date: nil))

    assert_not employee.valid?
    assert_includes employee.errors[:joining_date], "can't be blank"
  end

  def test_invalid_without_a_country
    employee = Employee.new(valid_attributes(country: nil))

    assert_not employee.valid?
    assert_includes employee.errors[:country], "must exist"
  end

  def test_invalid_with_a_duplicate_employee_id
    Employee.create!(valid_attributes)
    employee = Employee.new(valid_attributes(email: "other@example.com"))

    assert_not employee.valid?
    assert_includes employee.errors[:employee_id], "has already been taken"
  end

  def test_invalid_with_a_duplicate_email
    Employee.create!(valid_attributes)
    employee = Employee.new(valid_attributes(employee_id: "EMP2"))

    assert_not employee.valid?
    assert_includes employee.errors[:email], "has already been taken"
  end

  def test_valid_without_a_department
    employee = Employee.new(valid_attributes(department: nil))

    assert employee.valid?
  end

  def test_defaults_to_an_active_status
    employee = Employee.create!(valid_attributes)

    assert employee.active?
  end

  def test_destroying_an_employee_destroys_its_salary
    currency = Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")
    employee = Employee.create!(valid_attributes)
    salary = Salary.create!(employee: employee, currency: currency, amount: 1000, effective_from: Date.current)

    employee.destroy

    assert_not Salary.exists?(salary.id)
  end

  private

    def valid_attributes(**overrides)
      {
        employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
        joining_date: Date.current, country: @country
      }.merge(overrides)
    end
end
