require "test_helper"

module Api
  module V1
    class DemoDataControllerTest < ActionDispatch::IntegrationTest
      requires_authentication :post, :api_v1_demo_data_seed_path

      setup do
        @admin = User.create!(first_name: "Admin", last_name: "User", email: "admin@example.com", role: :admin, password: "secret123")
        @member = User.create!(first_name: "Member", last_name: "User", email: "member@example.com", role: :member, password: "secret123")
      end

      def test_seed_as_a_member_is_forbidden
        post api_v1_demo_data_seed_path, headers: auth_headers_for(@member), as: :json

        assert_response :forbidden
      end

      def test_clear_as_a_member_is_forbidden
        post api_v1_demo_data_clear_path, headers: auth_headers_for(@member), as: :json

        assert_response :forbidden
      end

      def test_seed_as_admin_populates_demo_data
        with_env("DEMO_EMPLOYEE_COUNT" => "2") do
          post api_v1_demo_data_seed_path, headers: auth_headers_for(@admin), as: :json
        end

        assert_response :success
        assert_equal 10, Department.count
        assert Employee.count >= 2
        assert Currency.exists?(code: "USD")
      end

      def test_clear_as_admin_deletes_all_demo_data
        Country.create!(name: "India", code: "IN")
        Department.create!(name: "Engineering")

        post api_v1_demo_data_clear_path, headers: auth_headers_for(@admin), as: :json

        assert_response :success
        assert_equal 0, Country.count
        assert_equal 0, Department.count
      end

      private

        def with_env(overrides)
          original = overrides.keys.index_with { |key| ENV[key] }
          overrides.each { |key, value| ENV[key] = value }
          yield
        ensure
          original.each { |key, value| ENV[key] = value }
        end
    end
  end
end
