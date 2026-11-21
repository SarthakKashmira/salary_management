require "test_helper"

class CurrencyTest < ActiveSupport::TestCase
  def test_valid_with_a_name_code_and_symbol
    currency = Currency.new(name: "Indian Rupee", code: "INR", symbol: "₹")

    assert currency.valid?
  end

  def test_invalid_without_a_name
    currency = Currency.new(code: "INR", symbol: "₹")

    assert_not currency.valid?
    assert_includes currency.errors[:name], "can't be blank"
  end

  def test_invalid_without_a_code
    currency = Currency.new(name: "Indian Rupee", symbol: "₹")

    assert_not currency.valid?
    assert_includes currency.errors[:code], "can't be blank"
  end

  def test_invalid_without_a_symbol
    currency = Currency.new(name: "Indian Rupee", code: "INR")

    assert_not currency.valid?
    assert_includes currency.errors[:symbol], "can't be blank"
  end

  def test_has_many_salaries
    currency = Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")
    country = Country.create!(name: "India", code: "IN")
    employee = Employee.create!(
      employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
      joining_date: Date.current, country: country
    )
    salary = Salary.create!(employee: employee, currency: currency, amount: 1000, effective_from: Date.current)

    assert_equal [ salary ], currency.salaries
  end
end
