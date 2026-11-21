require "test_helper"

module Api
  class RegistrationsControllerTest < ActionDispatch::IntegrationTest
    def test_create_registers_a_brand_new_user_as_an_active_member
      post api_registration_path, params: {
        user: { first_name: "Jane", last_name: "Doe", email: "jane@example.com", password: "secret123" }
      }, as: :json

      assert_response :success
      body = response.parsed_body

      assert body["token"].present?

      user = User.find_by(email: "jane@example.com")

      assert user.active?
      assert user.member?
    end

    def test_create_completes_registration_for_an_invited_user
      invited = User.create!(
        first_name: "Jane", last_name: "Doe", email: "jane@example.com", role: :admin, status: :invited
      )

      post api_registration_path, params: {
        user: { first_name: "Jane", last_name: "Doe", email: "jane@example.com", password: "secret123" }
      }, as: :json

      assert_response :success
      assert_equal 1, User.where(email: "jane@example.com").count
      assert invited.reload.active?
      assert invited.admin?
      assert invited.authenticate("secret123")
    end

    def test_create_with_an_already_registered_email_is_unprocessable
      User.create!(
        first_name: "Jane", last_name: "Doe", email: "jane@example.com", role: :member, password: "secret123"
      )

      post api_registration_path, params: {
        user: { first_name: "Jane", last_name: "Doe", email: "jane@example.com", password: "secret123" }
      }, as: :json

      assert_response :unprocessable_entity
    end
  end
end
