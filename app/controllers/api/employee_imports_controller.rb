module Api
  class EmployeeImportsController < BaseController
    ALLOWED_EXTENSIONS = %w[.csv .xlsx .xls].freeze

    def create
      authorize Employee, :create?

      file = params.require(:file)

      unless ALLOWED_EXTENSIONS.include?(File.extname(file.original_filename).downcase)
        return render json: { errors: [ "Upload a .csv or .xlsx file" ] }, status: :unprocessable_entity
      end

      EmployeeImportJob.perform_async(Employees::ImportService.persist_upload(file))

      render_success(message: "File received - employees will be imported in the background")
    end
  end
end
