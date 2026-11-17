class CreateSalaries < ActiveRecord::Migration[8.1]
  def change
    create_table :salaries do |t|
      t.bigint :employee_id, null: false
      t.decimal :amount, precision: 15, scale: 2, null: false
      t.bigint :currency_id, null: false
      t.date :effective_from, null: false

      t.timestamps
    end

    add_foreign_key :salaries, :employees
    add_foreign_key :salaries, :currencies
  end
end
