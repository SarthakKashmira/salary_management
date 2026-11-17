module Employees
  class FetchService
    SEARCHABLE_COLUMNS = %w[employee_id first_name last_name email phone department designation].freeze

    attr_reader :search_term

    def initialize(search_term: nil)
      @search_term = search_term.to_s.strip
    end

    def process
      search_term.present? ? Employee.where(search_clause, term: search_pattern) : Employee.all
    end

    private

      def search_clause
        SEARCHABLE_COLUMNS.map { |column| "LOWER(employees.#{column}) LIKE :term" }.join(" OR ")
      end

      def search_pattern
        "%#{ActiveRecord::Base.sanitize_sql_like(search_term.downcase)}%"
      end
  end
end
