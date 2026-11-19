class ChangePhoneNullableOnUsers < ActiveRecord::Migration[8.1]
  def change
    change_column_null :users, :phone, true
  end
end
