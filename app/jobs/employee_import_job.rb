class EmployeeImportJob < ApplicationJob
  queue_as :default

  def perform(file_path, import_id)
    Employees::ImportProgress.broadcast(import_id, percent: 10, stage: "uploaded", message: "File uploaded - starting import")

    result = Employees::ImportService.new(file_path: file_path, import_id: import_id).process

    Rails.logger.info(
      "[employee import] #{result.created_count} employee(s) created, #{result.failures.size} row(s) failed"
    )
    result.failures.each { |failure| Rails.logger.info("[employee import] row #{failure.row}: #{failure.reason}") }

    Employees::ImportProgress.broadcast(
      import_id,
      percent: 100,
      stage: "completed",
      message: "Import completed",
      createdCount: result.created_count,
      failures: result.failures.map { |failure| { row: failure.row, reason: failure.reason } }
    )
  ensure
    FileUtils.rm_f(file_path)
  end
end
