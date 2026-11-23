class EmployeeImportJob < ApplicationJob
  queue_as :default

  def perform(blob_signed_id, import_id)
    ProgressTracker.broadcast(
      EmployeeImportChannel.topic_for(import_id), percent: 10, stage: "uploaded", message: "File uploaded - starting import"
    )

    blob = ActiveStorage::Blob.find_signed!(blob_signed_id)

    result = blob.open do |file|
      Employees::ImportService.new(file_path: file.path, import_id: import_id).process
    end

    Rails.logger.info(
      "[employee import] #{result.created_count} employee(s) created, #{result.failures.size} row(s) failed"
    )
    result.failures.each { |failure| Rails.logger.info("[employee import] row #{failure.row}: #{failure.reason}") }

    ProgressTracker.broadcast(
      EmployeeImportChannel.topic_for(import_id),
      percent: 100,
      stage: "completed",
      message: "Import completed",
      createdCount: result.created_count,
      failures: result.failures.map { |failure| { row: failure.row, reason: failure.reason } }
    )
  ensure
    blob&.purge
  end
end
