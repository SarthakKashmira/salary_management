module Employees
  class FetchService
    SEARCHABLE_COLUMNS = %w[
      employees.employee_id
      employees.first_name
      employees.last_name
      employees.email
      employees.phone
      employees.designation
    ].freeze

    attr_reader :search_term

    def initialize(search_term: nil)
      @search_term = search_term.to_s.strip
    end

    def process
      scope = search_term.present? ? Employee.where(search_clause, term: search_pattern, department_ids:) : Employee.all
      scope.order(:employee_id)
    end

    private

      def search_clause
        (SEARCHABLE_COLUMNS.map { |column| "LOWER(#{column}) LIKE :term" } << "employees.department_id IN (:department_ids)")
          .join(" OR ")
      end

      def department_ids
        Department.where("LOWER(departments.name) LIKE ?", search_pattern).pluck(:id)
      end

      def search_pattern
        "%#{ActiveRecord::Base.sanitize_sql_like(search_term.downcase)}%"
      end
  end
end
