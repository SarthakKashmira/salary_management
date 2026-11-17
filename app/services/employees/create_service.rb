module Employees
  class CreateService
    attr_reader :employee_params, :salary_params

    def initialize(employee_params:, salary_params:)
      @employee_params = employee_params
      @salary_params = salary_params
    end

    def process
      employee = Employee.new(employee_params)

      ActiveRecord::Base.transaction do
        employee.save!
        employee.salaries.create!(salary_params)
      end

      employee
    end
  end
end
