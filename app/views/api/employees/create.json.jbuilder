# frozen_string_literal: true

json.partial! "api/employees/employee", employee: @employee

json.salary do
  json.extract! @salary, :id, :amount, :currency_id, :effective_from
end
