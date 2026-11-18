module Api
  class DepartmentsController < BaseController
    include Paginatable

    before_action :get_department, only: [ :update, :destroy ]

    def index
      departments = Departments::FetchService.new(search_term: params[:search_term]).process
      @departments = paginate(departments)
    end

    def create
      @department = Department.create!(department_params)
    end

    def update
      @department.update!(department_params)
    end

    def destroy
      @department.destroy!
      render_success(message: "Department deleted successfully")
    end

    private

      def get_department
        @department = Department.find(params[:id])
      end

      def department_params
        params.require(:department).permit(:name, :code, :description)
      end
  end
end
