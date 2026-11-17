class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :phone, null: false
      t.string :encrypted_password, null: false
      t.integer :role, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
