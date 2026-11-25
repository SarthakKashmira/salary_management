class AllowNullLastNameOnUsers < ActiveRecord::Migration[8.1]
  def change
    change_column_null :users, :last_name, true
  end
end
