class EmployeeImportChannel < ApplicationCable::Channel
  def subscribed
    stream_from "employee_import_#{params[:import_id]}"

    latest = Employees::ImportProgress.latest(params[:import_id])
    transmit(latest) if latest
  end
end
