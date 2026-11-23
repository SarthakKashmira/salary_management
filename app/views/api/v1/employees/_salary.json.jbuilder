# frozen_string_literal: true

json.extract! salary, :id, :amount, :effective_from

json.currency do
  json.extract! salary.currency, :id, :name, :code, :symbol
end
