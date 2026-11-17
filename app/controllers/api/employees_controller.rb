module Api
  class EmployeesController < BaseController
    def index
      employees = FetchEmployeeService.new(**employee_list_params).process

      @employees = employees.records
      @page_size = employees.page_size
      @page_number = employees.page_number
      @total_count = employees.total_count
    end

    private

      def employee_list_params
        params.permit(:search_term, :page).to_h.symbolize_keys
      end
  end
end
