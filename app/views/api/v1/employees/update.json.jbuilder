# frozen_string_literal: true

json.partial! "api/v1/employees/employee", employee: @employee

if @salary
  json.salary do
    json.partial! "api/v1/employees/salary", salary: @salary
  end
else
  json.salary nil
end
