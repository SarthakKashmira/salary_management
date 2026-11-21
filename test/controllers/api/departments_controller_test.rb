require "test_helper"

module Api
  class DepartmentsControllerTest < ActionDispatch::IntegrationTest
    requires_authentication :get, :api_departments_path, as: :json

    setup do
      @admin = User.create!(first_name: "Admin", last_name: "User", email: "admin@example.com", role: :admin, password: "secret123")
      @member = User.create!(first_name: "Member", last_name: "User", email: "member@example.com", role: :member, password: "secret123")
    end

    def test_index_returns_paginated_departments
      Department.create!(name: "Engineering")

      get api_departments_path, headers: auth_headers_for(@member), as: :json

      assert_response :success
      body = response.parsed_body

      assert_equal 1, body["totalCount"]
      assert_equal "Engineering", body["departments"].first["name"]
    end

    def test_show_returns_the_department
      department = Department.create!(name: "Engineering")

      get api_department_path(department), headers: auth_headers_for(@member), as: :json

      assert_response :success
      assert_equal "Engineering", response.parsed_body["name"]
    end

    def test_create_as_admin_creates_a_department
      post api_departments_path, params: { department: { name: "Engineering" } }, headers: auth_headers_for(@admin), as: :json

      assert_response :success
      assert Department.exists?(name: "Engineering")
    end

    def test_create_as_a_member_is_forbidden
      post api_departments_path, params: { department: { name: "Engineering" } }, headers: auth_headers_for(@member), as: :json

      assert_response :forbidden
    end

    def test_create_with_invalid_params_is_unprocessable
      post api_departments_path, params: { department: { name: "" } }, headers: auth_headers_for(@admin), as: :json

      assert_response :unprocessable_entity
    end

    def test_update_as_admin_updates_the_department
      department = Department.create!(name: "Engineering")

      patch api_department_path(department), params: { department: { name: "Platform" } }, headers: auth_headers_for(@admin), as: :json

      assert_response :success
      assert_equal "Platform", department.reload.name
    end

    def test_update_as_a_member_is_forbidden
      department = Department.create!(name: "Engineering")

      patch api_department_path(department), params: { department: { name: "Platform" } }, headers: auth_headers_for(@member), as: :json

      assert_response :forbidden
    end

    def test_destroy_as_admin_deletes_an_empty_department
      department = Department.create!(name: "Engineering")

      delete api_department_path(department), headers: auth_headers_for(@admin), as: :json

      assert_response :success
      assert_not Department.exists?(department.id)
    end

    def test_destroy_as_admin_is_unprocessable_when_employees_are_assigned
      department = Department.create!(name: "Engineering")
      country = Country.create!(name: "India", code: "IN")
      Employee.create!(
        employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
        joining_date: Date.current, country: country, department: department
      )

      delete api_department_path(department), headers: auth_headers_for(@admin), as: :json

      assert_response :unprocessable_entity
      assert Department.exists?(department.id)
    end

    def test_destroy_as_a_member_is_forbidden
      department = Department.create!(name: "Engineering")

      delete api_department_path(department), headers: auth_headers_for(@member), as: :json

      assert_response :forbidden
    end

    def test_bulk_destroy_as_admin_deletes_the_given_departments
      department = Department.create!(name: "Engineering")

      delete bulk_destroy_api_departments_path, params: { ids: [ department.id ] }, headers: auth_headers_for(@admin), as: :json

      assert_response :success
      assert_equal 1, response.parsed_body["deletedCount"]
      assert_not Department.exists?(department.id)
    end

    def test_bulk_destroy_as_a_member_is_forbidden
      department = Department.create!(name: "Engineering")

      delete bulk_destroy_api_departments_path, params: { ids: [ department.id ] }, headers: auth_headers_for(@member), as: :json

      assert_response :forbidden
    end
  end
end
