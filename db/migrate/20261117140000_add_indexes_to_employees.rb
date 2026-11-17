class AddIndexesToEmployees < ActiveRecord::Migration[8.1]
  def change
    # Back the uniqueness validations with a database guarantee.
    add_index :employees, :employee_id, unique: true
    add_index :employees, :email, unique: true

    # The employees list eager loads the country of every row on the page.
    add_index :employees, :country_id
  end
end
