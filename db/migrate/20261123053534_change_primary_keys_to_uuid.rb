class ChangePrimaryKeysToUuid < ActiveRecord::Migration[8.1]
  def up
    drop_table :salaries
    drop_table :employees
    drop_table :departments
    drop_table :currencies
    drop_table :countries
    drop_table :users

    create_table :countries, id: :string do |t|
      t.string :name, null: false
      t.string :code, null: false
      t.timestamps
    end

    create_table :currencies, id: :string do |t|
      t.string :name, null: false
      t.string :code, null: false
      t.string :symbol, null: false
      t.timestamps
    end

    create_table :departments, id: :string do |t|
      t.string :name, null: false
      t.string :code
      t.text :description
      t.timestamps
    end
    add_index :departments, :code, unique: true
    add_index :departments, :name, unique: true

    create_table :employees, id: :string do |t|
      t.string :employee_id, null: false
      t.string :first_name, null: false
      t.string :last_name
      t.string :email, null: false
      t.string :phone
      t.string :designation
      t.string :country_id, null: false
      t.date :joining_date, null: false
      t.string :status, default: "active", null: false
      t.string :department_id
      t.timestamps
    end
    add_index :employees, :country_id
    add_index :employees, :department_id
    add_index :employees, :email, unique: true
    add_index :employees, :employee_id, unique: true

    create_table :salaries, id: :string do |t|
      t.string :employee_id, null: false
      t.decimal :amount, precision: 15, scale: 2, null: false
      t.string :currency_id, null: false
      t.date :effective_from, null: false
      t.timestamps
    end
    add_index :salaries, :employee_id, unique: true

    create_table :users, id: :string do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :phone
      t.string :password_digest
      t.integer :role, null: false
      t.integer :status, default: 0, null: false
      t.timestamps
    end
    add_index :users, :email, unique: true

    add_foreign_key :employees, :countries
    add_foreign_key :employees, :departments
    add_foreign_key :salaries, :currencies
    add_foreign_key :salaries, :employees
  end

  def down
    raise ActiveRecord::IrreversibleMigration, "switching back to integer ids would require regenerating all demo data"
  end
end
