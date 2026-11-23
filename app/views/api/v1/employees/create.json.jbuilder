# frozen_string_literal: true

json.partial! "api/v1/employees/employee", employee: @employee

json.salary do
  json.partial! "api/v1/employees/salary", salary: @salary
end
