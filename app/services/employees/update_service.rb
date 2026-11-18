module Employees
  class UpdateService
    attr_reader :employee, :employee_params, :salary_params

    def initialize(employee:, employee_params:, salary_params:)
      @employee = employee
      @employee_params = employee_params
      @salary_params = salary_params
    end

    def process
      employee.update!(employee_params)
      update_salary!

      employee
    end

    private

      def update_salary!
        salary = employee.salary || employee.build_salary
        attributes = salary_params.to_h.symbolize_keys

        # A new salary (this employee never had one) or a changed amount both
        # mean the new figure takes effect today - an unchanged amount being
        # re-saved alongside other edits shouldn't bump the effective date.
        attributes[:effective_from] = Date.current if salary.new_record? || amount_changed?(salary, attributes[:amount])

        salary.update!(attributes)
      end

      def amount_changed?(salary, new_amount)
        new_amount.present? && salary.amount != BigDecimal(new_amount.to_s)
      end
  end
end
