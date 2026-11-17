class FetchEmployeeService
  DEFAULT_PAGE_SIZE = 30
  SEARCHABLE_COLUMNS = %w[employee_id first_name last_name email phone department designation].freeze

  Result = Struct.new(:records, :page_size, :page_number, :total_count, keyword_init: true)

  attr_reader :search_term, :page

  def initialize(search_term: nil, page: nil)
    @search_term = search_term.to_s.strip
    @page = page
  end

  def process
    pagy = Pagy::Offset.new(count: employees.count, page: page_number, limit: DEFAULT_PAGE_SIZE)

    Result.new(
      records: pagy.records(employees.includes(:country)),
      page_size: pagy.limit,
      page_number: pagy.page,
      total_count: pagy.count
    )
  end

  private

    def employees
      @employees ||= search_term.present? ? Employee.where(search_clause, term: search_pattern) : Employee.all
    end

    def search_clause
      SEARCHABLE_COLUMNS.map { |column| "LOWER(employees.#{column}) LIKE :term" }.join(" OR ")
    end

    def search_pattern
      "%#{ActiveRecord::Base.sanitize_sql_like(search_term.downcase)}%"
    end

    def page_number
      number = page.to_i
      number.positive? ? number : 1
    end
end
