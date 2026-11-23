class EmployeeImportChannel < ApplicationCable::Channel
  def self.topic_for(import_id) = "employee_import_#{import_id}"

  def subscribed
    stream_from self.class.topic_for(params[:import_id])

    latest = ProgressTracker.latest(self.class.topic_for(params[:import_id]))
    transmit(latest) if latest
  end
end
