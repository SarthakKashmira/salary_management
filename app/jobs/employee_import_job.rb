class EmployeeImportJob
  include Sidekiq::Job

  def perform(file_path)
    result = Employees::ImportService.new(file_path: file_path).process

    Rails.logger.info(
      "[employee import] #{result.created_count} employee(s) created, #{result.failures.size} row(s) failed"
    )
    result.failures.each { |failure| Rails.logger.info("[employee import] row #{failure.row}: #{failure.reason}") }
  ensure
    FileUtils.rm_f(file_path)
  end
end
