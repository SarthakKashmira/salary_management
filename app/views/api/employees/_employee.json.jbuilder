# frozen_string_literal: true

json.extract! employee,
  :id,
  :employee_id,
  :first_name,
  :last_name,
  :email,
  :phone,
  :department,
  :designation,
  :joining_date,
  :status,
  :created_at,
  :updated_at

json.country do
  json.id employee.country&.id
  json.name employee.country&.name
  json.code employee.country&.code
end
