module Departments
  class FetchService
    SEARCHABLE_COLUMNS = %w[name code description].freeze

    attr_reader :search_term

    def initialize(search_term: nil)
      @search_term = search_term.to_s.strip
    end

    def process
      scope = search_term.present? ? Department.where(search_clause, term: search_pattern) : Department.all
      scope.order(:name)
    end

    private

      def search_clause
        SEARCHABLE_COLUMNS.map { |column| "LOWER(departments.#{column}) LIKE :term" }.join(" OR ")
      end

      def search_pattern
        "%#{ActiveRecord::Base.sanitize_sql_like(search_term.downcase)}%"
      end
  end
end
