# frozen_string_literal: true

json.users @users, partial: "api/users/user", as: :user

json.page_size @page_size
json.page_number @page_number
json.total_count @total_count
