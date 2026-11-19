module Api
  class DepartmentsController < BaseController
    include Paginatable

    before_action :get_department, only: [ :show, :update, :destroy ]

    def index
      departments = Departments::FetchService.new(search_term: params[:search_term]).process
      @departments = paginate(departments)
    end

    def show
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

    def bulk_destroy
      result = Departments::BulkDestroyService.new(ids: bulk_destroy_ids).process
      @deleted_count = result.deleted_count
      @failed_departments = result.failed_departments
    end

    private

      def get_department
        @department = Department.find(params[:id])
      end

      def bulk_destroy_ids
        params.permit(ids: []).fetch(:ids, [])
      end

      def department_params
        params.require(:department).permit(:name, :code, :description)
      end
  end
end
