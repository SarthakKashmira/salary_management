require "test_helper"

module Employees
  class UpdateServiceTest < ActiveSupport::TestCase
    setup do
      @country = Country.create!(name: "India", code: "IN")
      @currency = Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")
      @employee = Employee.create!(
        employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
        joining_date: Date.current, country: @country
      )
    end

    def test_updates_the_employee_attributes
      UpdateService.new(
        employee: @employee, employee_params: { first_name: "Janet" },
        salary_params: { amount: 1000, currency_id: @currency.id }
      ).process

      assert_equal "Janet", @employee.reload.first_name
    end

    def test_creates_a_salary_with_todays_effective_date_when_the_employee_has_none
      UpdateService.new(
        employee: @employee, employee_params: {}, salary_params: { amount: 1000, currency_id: @currency.id }
      ).process

      assert_equal Date.current, @employee.salary.reload.effective_from
      assert_equal 1000, @employee.salary.amount.to_i
    end

    def test_bumps_the_effective_date_when_the_salary_amount_changes
      salary = Salary.create!(employee: @employee, currency: @currency, amount: 1000, effective_from: 1.year.ago.to_date)

      UpdateService.new(
        employee: @employee, employee_params: {}, salary_params: { amount: 2000, currency_id: @currency.id }
      ).process

      assert_equal Date.current, salary.reload.effective_from
      assert_equal 2000, salary.amount.to_i
    end

    def test_does_not_bump_the_effective_date_when_the_salary_amount_is_unchanged
      original_date = 1.year.ago.to_date
      salary = Salary.create!(employee: @employee, currency: @currency, amount: 1000, effective_from: original_date)

      UpdateService.new(
        employee: @employee, employee_params: { first_name: "Janet" },
        salary_params: { amount: 1000, currency_id: @currency.id }
      ).process

      assert_equal original_date, salary.reload.effective_from
    end
  end
end
