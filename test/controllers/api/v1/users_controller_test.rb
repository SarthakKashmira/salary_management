require "test_helper"

module Api
  module V1
    class UsersControllerTest < ActionDispatch::IntegrationTest
      requires_authentication :get, :api_v1_users_path, as: :json

      setup do
        @admin = User.create!(first_name: "Admin", last_name: "User", email: "admin@example.com", role: :admin, password: "secret123")
        @member = User.create!(first_name: "Member", last_name: "User", email: "member@example.com", role: :member, password: "secret123")
      end

      def test_index_is_available_to_a_member
        get api_v1_users_path, headers: auth_headers_for(@member), as: :json

        assert_response :success
        body = response.parsed_body

        assert_equal 2, body["totalCount"]
        assert_equal 25, body["pageSize"]
      end

      def test_index_filters_by_search_term
        get api_v1_users_path, params: { search_term: "admin" }, headers: auth_headers_for(@member), as: :json

        body = response.parsed_body

        assert_equal 1, body["users"].size
        assert_equal "admin@example.com", body["users"].first["email"]
      end

      def test_show_returns_the_user
        get api_v1_user_path(@member), headers: auth_headers_for(@admin), as: :json

        assert_response :success
        assert_equal "member@example.com", response.parsed_body["email"]
      end

      def test_create_as_admin_invites_a_new_team_member
        assert_emails 1 do
          post api_v1_users_path, params: {
            user: { first_name: "New", last_name: "Hire", email: "newhire@example.com", role: "member" }
          }, headers: auth_headers_for(@admin), as: :json
        end

        assert_response :success

        user = User.find_by(email: "newhire@example.com")

        assert user.invited?
      end

      def test_create_as_a_member_is_forbidden
        post api_v1_users_path, params: {
          user: { first_name: "New", last_name: "Hire", email: "newhire@example.com", role: "member" }
        }, headers: auth_headers_for(@member), as: :json

        assert_response :forbidden
      end

      def test_update_as_admin_updates_the_user
        patch api_v1_user_path(@member), params: { user: { first_name: "Updated" } }, headers: auth_headers_for(@admin), as: :json

        assert_response :success
        assert_equal "Updated", @member.reload.first_name
      end

      def test_update_as_a_member_is_forbidden
        patch api_v1_user_path(@admin), params: { user: { first_name: "Updated" } }, headers: auth_headers_for(@member), as: :json

        assert_response :forbidden
      end

      def test_destroy_as_admin_deletes_the_user
        delete api_v1_user_path(@member), headers: auth_headers_for(@admin), as: :json

        assert_response :success
        assert_not User.exists?(@member.id)
      end

      def test_destroy_as_a_member_is_forbidden
        delete api_v1_user_path(@admin), headers: auth_headers_for(@member), as: :json

        assert_response :forbidden
      end
    end
  end
end
