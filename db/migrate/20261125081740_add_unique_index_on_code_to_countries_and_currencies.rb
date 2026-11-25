class AddUniqueIndexOnCodeToCountriesAndCurrencies < ActiveRecord::Migration[8.1]
  def change
    # Lets demo_data:seed insert_all with unique_by: :code, so reseeding never duplicates a row.
    add_index :countries, :code, unique: true
    add_index :currencies, :code, unique: true
  end
end
