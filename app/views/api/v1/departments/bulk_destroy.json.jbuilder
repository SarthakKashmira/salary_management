# frozen_string_literal: true

json.deleted_count @deleted_count

json.failed_departments @failed_departments do |department|
  json.id department.id
  json.name department.name
  json.employees_count department.employees_count
end
