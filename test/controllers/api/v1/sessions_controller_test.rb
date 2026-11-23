require "test_helper"

module Api
  module V1
    class SessionsControllerTest < ActionDispatch::IntegrationTest
      setup do
        @user = User.create!(
          first_name: "Jane", last_name: "Doe", email: "jane@example.com", role: :admin, password: "secret123"
        )
      end

      def test_create_with_valid_credentials_returns_a_token
        post api_v1_session_path, params: { session: { email: "jane@example.com", password: "secret123" } }, as: :json

        assert_response :success
        body = response.parsed_body

        assert body["token"].present?
        assert_equal "jane@example.com", body["user"]["email"]
      end

      def test_create_with_an_incorrect_password_is_unauthorized
        post api_v1_session_path, params: { session: { email: "jane@example.com", password: "wrong" } }, as: :json

        assert_response :unauthorized
        assert_equal [ "Invalid email or password" ], response.parsed_body["errors"]
      end

      def test_create_with_an_unknown_email_is_unauthorized
        post api_v1_session_path, params: { session: { email: "nobody@example.com", password: "secret123" } }, as: :json

        assert_response :unauthorized
      end
    end
  end
end
