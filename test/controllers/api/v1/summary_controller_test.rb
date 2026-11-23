require "test_helper"

module Api
  module V1
    class SummaryControllerTest < ActionDispatch::IntegrationTest
      requires_authentication :get, :api_v1_summary_path, as: :json

      setup do
        @user = User.create!(first_name: "Jane", last_name: "Doe", email: "jane@example.com", role: :admin, password: "secret123")
      end

      def test_show_returns_the_summary_for_the_default_currency
        country = Country.create!(name: "India", code: "IN")
        currency = Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")
        employee = Employee.create!(
          employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
          joining_date: Date.current, country: country
        )
        Salary.create!(employee: employee, currency: currency, amount: 1000, effective_from: Date.current)

        get api_v1_summary_path, headers: auth_headers_for(@user), as: :json

        assert_response :success
        body = response.parsed_body

        assert_equal 1, body["totalEmployees"]
        assert_equal 1, body["employeesWithSalary"]
        assert_equal "INR", body["currency"]["code"]
      end

      def test_show_with_no_currencies_returns_nil_stats
        get api_v1_summary_path, headers: auth_headers_for(@user), as: :json

        assert_response :success
        body = response.parsed_body

        assert_nil body["currency"]
        assert_nil body["total"]
      end
    end
  end
end
