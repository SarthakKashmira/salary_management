# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Beyond the admin account below, this app seeds data manually instead, via two rake tasks (see
# lib/tasks/demo_data.rake):
#   bin/rails demo_data:seed  - seed departments, team members, currencies, countries, and demo employees/salaries
#   bin/rails demo_data:clear - delete all of the above except currencies and countries

User.find_or_create_by!(email: "hrmanager@incubyte.com") do |user|
  user.first_name = "HR"
  user.last_name = "Manager"
  user.role = :admin
  user.status = :active
  user.password = "welcome"
end
