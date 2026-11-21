class ChangeDepartmentCodeNullableOnDepartments < ActiveRecord::Migration[8.1]
  def change
    change_column_null :departments, :code, true
  end
end
