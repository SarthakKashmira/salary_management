module Users
  class FetchService
    SEARCHABLE_COLUMNS = %w[first_name last_name email phone].freeze

    attr_reader :search_term

    def initialize(search_term: nil)
      @search_term = search_term.to_s.strip
    end

    def process
      scope = search_term.present? ? User.where(search_clause, term: search_pattern) : User.all
      scope.order(:email)
    end

    private

      def search_clause
        SEARCHABLE_COLUMNS.map { |column| "LOWER(users.#{column}) LIKE :term" }.join(" OR ")
      end

      def search_pattern
        "%#{ActiveRecord::Base.sanitize_sql_like(search_term.downcase)}%"
      end
  end
end
