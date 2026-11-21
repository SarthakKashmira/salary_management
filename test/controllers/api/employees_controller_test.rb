require "test_helper"

module Api
  class EmployeesControllerTest < ActionDispatch::IntegrationTest
    requires_authentication :get, :api_employees_path, as: :json

    setup do
      @admin = User.create!(first_name: "Admin", last_name: "User", email: "admin@example.com", role: :admin, password: "secret123")
      @member = User.create!(first_name: "Member", last_name: "User", email: "member@example.com", role: :member, password: "secret123")
      @country = Country.create!(name: "India", code: "IN")
      @currency = Currency.create!(name: "Indian Rupee", code: "INR", symbol: "₹")
    end

    def create_employee(**overrides)
      Employee.create!(
        {
          employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
          joining_date: Date.current, country: @country
        }.merge(overrides)
      )
    end

    def test_index_returns_paginated_employees
      create_employee

      get api_employees_path, headers: auth_headers_for(@member), as: :json

      assert_response :success
      body = response.parsed_body

      assert_equal 1, body["totalCount"]
      assert_equal "jane@example.com", body["employees"].first["email"]
    end

    def test_show_returns_the_employee_with_its_salary
      employee = create_employee
      Salary.create!(employee: employee, currency: @currency, amount: 1000, effective_from: Date.current)

      get api_employee_path(employee), headers: auth_headers_for(@member), as: :json

      assert_response :success
      body = response.parsed_body

      assert_equal "jane@example.com", body["email"]
      assert_equal "1000.0", body["salary"]["amount"]
    end

    def test_create_as_admin_creates_an_employee_with_its_salary
      post api_employees_path, params: {
        employee: {
          employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
          joining_date: Date.current, country_id: @country.id
        },
        salary: { amount: 1000, currency_id: @currency.id, effective_from: Date.current }
      }, headers: auth_headers_for(@admin), as: :json

      assert_response :success
      assert Employee.exists?(employee_id: "EMP1")
    end

    def test_create_as_a_member_is_forbidden
      post api_employees_path, params: {
        employee: {
          employee_id: "EMP1", first_name: "Jane", email: "jane@example.com",
          joining_date: Date.current, country_id: @country.id
        },
        salary: { amount: 1000, currency_id: @currency.id, effective_from: Date.current }
      }, headers: auth_headers_for(@member), as: :json

      assert_response :forbidden
    end

    def test_create_with_invalid_employee_params_is_unprocessable
      post api_employees_path, params: {
        employee: { employee_id: "", first_name: "Jane", email: "jane@example.com", country_id: @country.id },
        salary: { amount: 1000, currency_id: @currency.id, effective_from: Date.current }
      }, headers: auth_headers_for(@admin), as: :json

      assert_response :unprocessable_entity
    end

    def test_update_as_admin_updates_the_employee
      employee = create_employee
      Salary.create!(employee: employee, currency: @currency, amount: 1000, effective_from: Date.current)

      patch api_employee_path(employee), params: {
        employee: { first_name: "Janet" }, salary: { amount: 1000 }
      }, headers: auth_headers_for(@admin), as: :json

      assert_response :success
      assert_equal "Janet", employee.reload.first_name
    end

    def test_update_as_a_member_is_forbidden
      employee = create_employee
      Salary.create!(employee: employee, currency: @currency, amount: 1000, effective_from: Date.current)

      patch api_employee_path(employee), params: {
        employee: { first_name: "Janet" }, salary: { amount: 1000 }
      }, headers: auth_headers_for(@member), as: :json

      assert_response :forbidden
    end

    def test_destroy_as_admin_deletes_the_employee
      employee = create_employee

      delete api_employee_path(employee), headers: auth_headers_for(@admin), as: :json

      assert_response :success
      assert_not Employee.exists?(employee.id)
    end

    def test_destroy_as_a_member_is_forbidden
      employee = create_employee

      delete api_employee_path(employee), headers: auth_headers_for(@member), as: :json

      assert_response :forbidden
    end

    def test_bulk_destroy_as_admin_deletes_the_given_employees
      employee = create_employee

      delete bulk_destroy_api_employees_path, params: { ids: [ employee.id ] }, headers: auth_headers_for(@admin), as: :json

      assert_response :success
      assert_not Employee.exists?(employee.id)
    end

    def test_bulk_destroy_as_a_member_is_forbidden
      employee = create_employee

      delete bulk_destroy_api_employees_path, params: { ids: [ employee.id ] }, headers: auth_headers_for(@member), as: :json

      assert_response :forbidden
    end
  end
end
