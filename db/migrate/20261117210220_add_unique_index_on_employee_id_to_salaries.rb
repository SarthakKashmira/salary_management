class AddUniqueIndexOnEmployeeIdToSalaries < ActiveRecord::Migration[8.1]
  def change
    add_index :salaries, :employee_id, unique: true
  end
end
