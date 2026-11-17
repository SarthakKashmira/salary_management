module Api
  class EmployeesController < BaseController
    include Paginatable

    before_action :get_employee, only: [ :show, :update, :destroy ]

    def index
      employees = Employees::FetchService.new(search_term: params[:search_term]).process
      @employees = paginate(employees.includes(:country, :department, salary: :currency))
    end

    def show
      @salary = @employee.salary
    end

    def create
      @employee = Employees::CreateService.new(employee_params: employee_params, salary_params: salary_params).process
      @salary = @employee.salary
    end

    def update
      @employee.update!(employee_params)
    end

    def destroy
      @employee.destroy!
      render_success(message: "Employee deleted successfully")
    end

    private

      def get_employee
        @employee = Employee.includes(:country, :department).find(params[:id])
      end

      def employee_params
        params.require(:employee).permit(
          :employee_id, :first_name, :last_name, :email, :phone,
          :department_id, :designation, :country_id, :joining_date, :status
        )
      end

      def salary_params
        params.require(:salary).permit(:amount, :currency_id, :effective_from)
      end
  end
end
