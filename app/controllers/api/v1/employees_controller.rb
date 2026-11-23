module Api
  module V1
    class EmployeesController < BaseController
      include Paginatable

      before_action :get_employee, only: [ :show, :update, :destroy ]
      before_action -> { authorize @employee }, only: [ :update, :destroy ]

      def index
        employees = Employees::FetchService.new(search_term: params[:search_term]).process
        @employees = paginate(employees.includes(:country, :department, salary: :currency))
      end

      def show
        @salary = @employee.salary
      end

      def create
        authorize Employee
        @employee = Employees::CreateService.new(employee_params: employee_params, salary_params: salary_params).process
        @salary = @employee.salary
      end

      def update
        @employee = Employees::UpdateService.new(
          employee: @employee, employee_params: employee_params, salary_params: salary_params
        ).process
        @salary = @employee.salary
      end

      def destroy
        @employee.destroy!
        render_success(message: "Employee deleted successfully")
      end

      def bulk_destroy
        authorize Employee, :destroy?
        Employee.where(id: bulk_destroy_ids).destroy_all
        render_success(message: "Employees deleted successfully")
      end

      private

        def bulk_destroy_ids
          params.permit(ids: []).fetch(:ids, [])
        end

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
end
