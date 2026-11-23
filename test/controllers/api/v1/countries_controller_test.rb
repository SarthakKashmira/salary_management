require "test_helper"

module Api
  module V1
    class CountriesControllerTest < ActionDispatch::IntegrationTest
      requires_authentication :get, :api_v1_countries_path, as: :json

      setup do
        @user = User.create!(first_name: "Jane", last_name: "Doe", email: "jane@example.com", role: :admin, password: "secret123")
      end

      def test_index_returns_all_countries
        Country.create!(name: "India", code: "IN")

        get api_v1_countries_path, headers: auth_headers_for(@user), as: :json

        assert_response :success
        body = response.parsed_body

        assert_equal 1, body.size
        assert_equal "India", body.first["name"]
        assert_equal "IN", body.first["code"]
      end
    end
  end
end
