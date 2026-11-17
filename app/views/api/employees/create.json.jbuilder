# frozen_string_literal: true

json.partial! "api/employees/employee", employee: @employee

json.salary do
  json.partial! "api/employees/salary", salary: @salary
end
