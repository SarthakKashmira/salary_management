class AddCurrencyIdAndAmountIndexToSalaries < ActiveRecord::Migration[8.1]
  def change
    # Summary reads every amount per currency; with amount in the index, Postgres answers that from the
    # index alone instead of scanning salaries once per currency.
    add_index :salaries, [ :currency_id, :amount ]
  end
end
