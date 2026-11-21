require "test_helper"

class SalaryTest < ActiveSupport::TestCase
  setup do
    country = Country.create!(name: "India", code: "IN")
    @currency = Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")
    @employee = Employee.create!(
      employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
      joining_date: Date.current, country: country
    )
  end

  def valid_attributes(**overrides)
    { employee: @employee, currency: @currency, amount: 1000, effective_from: Date.current }.merge(overrides)
  end

  def test_valid_with_the_required_attributes
    salary = Salary.new(valid_attributes)

    assert salary.valid?
  end

  def test_invalid_without_an_amount
    salary = Salary.new(valid_attributes(amount: nil))

    assert_not salary.valid?
    assert_includes salary.errors[:amount], "can't be blank"
  end

  def test_invalid_without_an_effective_from_date
    salary = Salary.new(valid_attributes(effective_from: nil))

    assert_not salary.valid?
    assert_includes salary.errors[:effective_from], "can't be blank"
  end

  def test_invalid_without_an_employee
    salary = Salary.new(valid_attributes(employee: nil))

    assert_not salary.valid?
    assert_includes salary.errors[:employee], "must exist"
  end

  def test_invalid_without_a_currency
    salary = Salary.new(valid_attributes(currency: nil))

    assert_not salary.valid?
    assert_includes salary.errors[:currency], "must exist"
  end

  def test_invalid_when_the_employee_already_has_a_salary
    Salary.create!(valid_attributes)
    salary = Salary.new(valid_attributes)

    assert_not salary.valid?
    assert_includes salary.errors[:employee_id], "has already been taken"
  end
end
