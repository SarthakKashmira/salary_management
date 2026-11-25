# Lets the employee search's LOWER(column) LIKE '%term%' use an index instead of scanning the table.
# Departments and users stay small enough that Postgres scans them anyway, so they get no trigram indexes.
# Trigram indexes are Postgres-only (pg_trgm), so this is a no-op on SQLite and isn't captured in
# db/schema.rb - a production database created with db:schema:load needs this migration re-run.
class AddTrigramSearchIndexes < ActiveRecord::Migration[8.1]
  SEARCHABLE_COLUMNS = {
    employees: %w[employee_id first_name last_name email phone designation]
  }.freeze

  def up
    return unless postgres?

    enable_extension "pg_trgm"

    each_index do |table, column, name|
      add_index table, "lower(#{column}) gin_trgm_ops", using: :gin, name: name, if_not_exists: true
    end
  end

  def down
    return unless postgres?

    each_index { |table, _column, name| remove_index table, name: name, if_exists: true }
  end

  private

    def postgres?
      connection.adapter_name == "PostgreSQL"
    end

    def each_index
      SEARCHABLE_COLUMNS.each do |table, columns|
        columns.each { |column| yield table, column, "index_#{table}_on_lower_#{column}_trgm" }
      end
    end
end
