module Employees
  class FetchService
    SEARCHABLE_COLUMNS = %w[
      employees.employee_id
      employees.first_name
      employees.last_name
      employees.email
      employees.phone
      employees.designation
      departments.name
    ].freeze

    attr_reader :search_term

    def initialize(search_term: nil)
      @search_term = search_term.to_s.strip
    end

    def process
      search_term.present? ? Employee.left_joins(:department).where(search_clause, term: search_pattern) : Employee.all
    end

    private

      def search_clause
        SEARCHABLE_COLUMNS.map { |column| "LOWER(#{column}) LIKE :term" }.join(" OR ")
      end

      def search_pattern
        "%#{ActiveRecord::Base.sanitize_sql_like(search_term.downcase)}%"
      end
  end
end
