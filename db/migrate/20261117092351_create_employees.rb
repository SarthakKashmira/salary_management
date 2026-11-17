class CreateEmployees < ActiveRecord::Migration[8.1]
  def change
    create_table :employees do |t|
      t.string :employee_id, null: false
      t.string :first_name, null: false
      t.string :last_name
      t.string :email, null: false
      t.string :phone
      t.string :department
      t.string :designation
      t.bigint :country_id, null: false
      t.date :joining_date, null: false
      t.string :status, null: false, default: "active"

      t.timestamps
    end

    add_foreign_key :employees, :countries
  end
end
