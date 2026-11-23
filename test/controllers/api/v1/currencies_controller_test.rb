require "test_helper"

module Api
  module V1
    class CurrenciesControllerTest < ActionDispatch::IntegrationTest
      requires_authentication :get, :api_v1_currencies_path, as: :json

      setup do
        @user = User.create!(first_name: "Jane", last_name: "Doe", email: "jane@example.com", role: :admin, password: "secret123")
      end

      def test_index_returns_all_currencies
        Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")

        get api_v1_currencies_path, headers: auth_headers_for(@user), as: :json

        assert_response :success
        body = response.parsed_body

        assert_equal 1, body.size
        assert_equal "INR", body.first["code"]
        assert_equal "₹", body.first["symbol"]
      end
    end
  end
end
