# frozen_string_literal: true

json.employees @employees do |employee|
  json.partial! "api/employees/employee", employee: employee

  if employee.salary
    json.salary do
      json.partial! "api/employees/salary", salary: employee.salary
    end
  else
    json.salary nil
  end
end

json.page_size @page_size
json.page_number @page_number
json.total_count @total_count
