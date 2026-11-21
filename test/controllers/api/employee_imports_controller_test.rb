require "test_helper"

module Api
  class EmployeeImportsControllerTest < ActionDispatch::IntegrationTest
    requires_authentication :post, :api_employee_imports_path,
      params: -> { { file: fixture_file_upload("import_sample.csv", "text/csv") } }

    setup do
      @admin = User.create!(first_name: "Admin", last_name: "User", email: "admin@example.com", role: :admin, password: "secret123")
      @member = User.create!(first_name: "Member", last_name: "User", email: "member@example.com", role: :member, password: "secret123")
    end

    teardown do
      FileUtils.rm_rf(Rails.root.join("tmp", "imports"))
    end

    def test_create_as_a_member_is_forbidden
      post api_employee_imports_path,
        params: { file: fixture_file_upload("import_sample.csv", "text/csv") },
        headers: auth_headers_for(@member)

      assert_response :forbidden
    end

    def test_create_with_a_disallowed_file_type_is_unprocessable
      post api_employee_imports_path,
        params: { file: fixture_file_upload("import_sample.txt", "text/plain") },
        headers: auth_headers_for(@admin)

      assert_response :unprocessable_entity
    end

    def test_create_as_admin_enqueues_the_import_job
      assert_enqueued_with(job: EmployeeImportJob) do
        post api_employee_imports_path,
          params: { file: fixture_file_upload("import_sample.csv", "text/csv") },
          headers: auth_headers_for(@admin)
      end

      assert_response :success
      assert response.parsed_body["importId"].present?
    end
  end
end
