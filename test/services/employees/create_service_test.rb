require "test_helper"

module Employees
  class CreateServiceTest < ActiveSupport::TestCase
    setup do
      @country = Country.create!(name: "India", code: "IN")
      @currency = Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")
    end

    def test_creates_an_employee_with_its_salary
      employee = CreateService.new(employee_params: employee_params, salary_params: salary_params).process

      assert employee.persisted?
      assert_equal 1000, employee.salary.amount.to_i
      assert_equal @currency, employee.salary.currency
    end

    def test_rolls_back_when_the_employee_is_invalid
      assert_no_difference -> { Employee.count } do
        assert_raises(ActiveRecord::RecordInvalid) do
          CreateService.new(employee_params: employee_params(first_name: nil), salary_params: salary_params).process
        end
      end
    end

    def test_rolls_back_the_employee_when_the_salary_is_invalid
      assert_no_difference [ -> { Employee.count }, -> { Salary.count } ] do
        assert_raises(ActiveRecord::RecordInvalid) do
          CreateService.new(employee_params: employee_params, salary_params: salary_params(amount: nil)).process
        end
      end
    end

    private

      def employee_params(**overrides)
        {
          employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
          joining_date: Date.current, country_id: @country.id
        }.merge(overrides)
      end

      def salary_params(**overrides)
        { amount: 1000, currency_id: @currency.id, effective_from: Date.current }.merge(overrides)
      end
  end
end
