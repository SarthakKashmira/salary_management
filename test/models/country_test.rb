require "test_helper"

class CountryTest < ActiveSupport::TestCase
  def test_valid_with_a_name_and_a_code
    country = Country.new(name: "India", code: "IN")

    assert country.valid?
  end

  def test_invalid_without_a_name
    country = Country.new(code: "IN")

    assert_not country.valid?
    assert_includes country.errors[:name], "can't be blank"
  end

  def test_invalid_without_a_code
    country = Country.new(name: "India")

    assert_not country.valid?
    assert_includes country.errors[:code], "can't be blank"
  end

  def test_invalid_with_a_duplicate_code
    Country.create!(name: "India", code: "IN")
    country = Country.new(name: "Indonesia", code: "IN")

    assert_not country.valid?
    assert_includes country.errors[:code], "has already been taken"
  end

  def test_has_many_employees
    country = Country.create!(name: "India", code: "IN")
    employee = Employee.create!(
      employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
      joining_date: Date.current, country: country
    )

    assert_equal [ employee ], country.employees
  end
end
