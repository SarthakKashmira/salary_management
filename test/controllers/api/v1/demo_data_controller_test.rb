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

      def test_seed_as_admin_enqueues_the_job
        assert_enqueued_jobs 1, only: DemoDataJob do
          post api_v1_demo_data_seed_path, headers: auth_headers_for(@admin), as: :json
        end

        assert_response :success
        job_args = enqueued_jobs.last[:args]
        assert_equal "seed", job_args.first
        assert_equal job_args.second, JSON.parse(response.body)["taskId"]
      end

      def test_clear_as_admin_enqueues_the_job
        assert_enqueued_jobs 1, only: DemoDataJob do
          post api_v1_demo_data_clear_path, headers: auth_headers_for(@admin), as: :json
        end

        assert_response :success
        job_args = enqueued_jobs.last[:args]
        assert_equal "clear", job_args.first
        assert_equal job_args.second, JSON.parse(response.body)["taskId"]
      end
    end
  end
end
