module Departments
  class BulkDestroyService
    Result = Struct.new(:deleted_count, :failed_departments, keyword_init: true)
    FailedDepartment = Struct.new(:id, :name, :employees_count, keyword_init: true)

    attr_reader :ids

    def initialize(ids:)
      @ids = ids
    end

    def process
      departments = Department.where(id: ids).includes(:employees).to_a
      deletable, blocked = departments.partition { |department| department.employees.empty? }

      Department.where(id: deletable.map(&:id)).destroy_all

      Result.new(
        deleted_count: deletable.size,
        failed_departments: blocked.map { |department|
          FailedDepartment.new(id: department.id, name: department.name, employees_count: department.employees.size)
        }
      )
    end
  end
end
