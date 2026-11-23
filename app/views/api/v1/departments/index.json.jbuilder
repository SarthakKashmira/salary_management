# frozen_string_literal: true

json.departments @departments, partial: "api/v1/departments/department", as: :department

json.page_size @page_size
json.page_number @page_number
json.total_count @total_count
