require "test_helper"

module Summary
  class FetchServiceTest < ActiveSupport::TestCase
    setup do
      @country = Country.create!(name: "India", code: "IN")
    end

    def test_defaults_to_the_first_currency_ordered_by_code_when_none_is_specified
      Currency.create!(name: "Euro", code: "EUR", symbol: "€")
      Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")

      result = FetchService.new.process

      assert_equal "EUR", result[:currency].code
    end

    def test_uses_the_given_currency_code_when_it_matches_an_existing_currency
      Currency.create!(name: "Euro", code: "EUR", symbol: "€")
      usd = Currency.create!(name: "US Dollar", code: "USD", symbol: "$")

      result = FetchService.new(currency_code: "usd").process

      assert_equal usd, result[:currency]
    end

    def test_falls_back_to_the_first_currency_when_the_given_code_does_not_match_any
      eur = Currency.create!(name: "Euro", code: "EUR", symbol: "€")

      result = FetchService.new(currency_code: "XXX").process

      assert_equal eur, result[:currency]
    end

    def test_returns_nil_stats_when_there_are_no_currencies
      result = FetchService.new.process

      assert_nil result[:currency]
      assert_equal 0, result[:employees_with_salary]
      assert_nil result[:max]
      assert_nil result[:min]
      assert_nil result[:average]
      assert_nil result[:median]
      assert_nil result[:total]
    end

    def test_computes_stats_for_salaries_already_in_the_target_currency
      usd = Currency.create!(name: "US Dollar", code: "USD", symbol: "$")
      create_employee_with_salary(usd, 1000)
      create_employee_with_salary(usd, 3000)

      result = FetchService.new(currency_code: "USD").process

      assert_equal 2, result[:total_employees]
      assert_equal 2, result[:employees_with_salary]
      assert_equal 3000, result[:max]
      assert_equal 1000, result[:min]
      assert_equal 2000, result[:average]
      assert_equal 2000, result[:median]
      assert_equal 4000, result[:total]
    end

    def test_converts_salaries_in_other_currencies_to_the_target_currency
      Currency.create!(name: "US Dollar", code: "USD", symbol: "$")
      inr = Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")
      create_employee_with_salary(inr, 1000)

      result = FetchService.new(currency_code: "USD").process

      assert_in_delta 12.0, result[:total], 0.01
    end

    private

      def create_employee_with_salary(currency, amount, employee_id: "EMP#{SecureRandom.hex(4)}")
        employee = Employee.create!(
          employee_id: employee_id, first_name: "Jane", email: "#{employee_id}@example.com",
          joining_date: Date.current, country: @country
        )
        Salary.create!(employee: employee, currency: currency, amount: amount, effective_from: Date.current)
        employee
      end
  end
end
