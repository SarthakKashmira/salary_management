# frozen_string_literal: true

json.total_employees @summary[:total_employees]
json.employees_with_salary @summary[:employees_with_salary]

if @summary[:currency]
  json.currency do
    json.extract! @summary[:currency], :id, :name, :code, :symbol
  end
else
  json.currency nil
end

json.max @summary[:max]
json.min @summary[:min]
json.average @summary[:average]
json.median @summary[:median]
json.total @summary[:total]
