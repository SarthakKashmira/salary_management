# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# This app seeds data manually instead, via two rake tasks (see lib/tasks/demo_data.rake):
#   bin/rails demo_data:seed  - seed departments, team members, currencies, countries, and demo employees/salaries
#   bin/rails demo_data:clear - delete all of the above
