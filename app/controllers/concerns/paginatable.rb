module Paginatable
  extend ActiveSupport::Concern

  DEFAULT_PAGE_SIZE = 30

  private

    def paginate(scope, page_size: DEFAULT_PAGE_SIZE)
      pagy = Pagy::Offset.new(count: scope.count, page: page_number, limit: page_size)

      @page_size = pagy.limit
      @page_number = pagy.page
      @total_count = pagy.count

      pagy.records(scope)
    end

    def page_number
      number = params[:page].to_i
      number.positive? ? number : 1
    end
end
