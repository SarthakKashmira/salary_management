module Api
  module V1
    class EmployeeImportsController < BaseController
      ALLOWED_EXTENSIONS = %w[.csv .xlsx .xls].freeze

      def create
        authorize Employee, :create?

        file = params.require(:file)

        unless ALLOWED_EXTENSIONS.include?(File.extname(file.original_filename).downcase)
          return render json: { errors: [ "Upload a .csv or .xlsx file" ] }, status: :unprocessable_entity
        end

        blob = ActiveStorage::Blob.create_and_upload!(io: file, filename: file.original_filename, content_type: file.content_type)

        import_id = SecureRandom.uuid
        EmployeeImportJob.perform_later(blob.signed_id, import_id)

        render json: { message: "File received - employees will be imported in the background", importId: import_id }
      end
    end
  end
end
