module Employees
  class ImportService
    attr_reader :file_path, :import_id

    Result = Struct.new(:created_count, :failures, keyword_init: true)
    Failure = Struct.new(:row, :reason, keyword_init: true)

    def initialize(file_path:, import_id:)
      @file_path = file_path
      @import_id = import_id
    end

    def process
      sheet = Roo::Spreadsheet.open(file_path)
      headers = sheet.row(1).map { |header| header.to_s.strip.downcase }
      ProgressTracker.broadcast(
        EmployeeImportChannel.topic_for(import_id), percent: 25, stage: "headers_parsed", message: "Column headers parsed"
      )

      total_rows = sheet.last_row - 1
      ProgressTracker.broadcast(
        EmployeeImportChannel.topic_for(import_id),
        percent: 50, stage: "rows_parsed", message: "#{total_rows} row(s) found - importing employees"
      )

      created_count = 0
      failures = []

      (2..sheet.last_row).each do |row_number|
        row = headers.zip(sheet.row(row_number)).to_h

        import_row(row)
        created_count += 1
      rescue ActiveRecord::RecordInvalid => e
        failures << Failure.new(row: row_number, reason: e.record.errors.full_messages.join(", "))
      rescue RowError => e
        failures << Failure.new(row: row_number, reason: e.message)
      end

      Result.new(created_count: created_count, failures: failures)
    end

    private

      RowError = Class.new(StandardError)

      def import_row(row)
        country = find_country(row["country"])
        raise RowError, "Country not supported: #{row['country']}" unless country

        currency = find_currency(row["salary_currency"])
        raise RowError, "Currency not supported: #{row['salary_currency']}" unless currency

        employee = Employee.new(
          employee_id: row["employee_id"].to_s.strip,
          first_name: row["first_name"].to_s.strip,
          last_name: row["last_name"].to_s.strip,
          email: row["email"].to_s.strip.downcase,
          designation: row["designation"].to_s.strip.presence,
          status: normalize_status(row["status"]),
          department: find_or_create_department(row["department"]),
          country: country,
          joining_date: Date.current
        )

        ActiveRecord::Base.transaction do
          employee.save!
          employee.create_salary!(amount: row["salary_amount"], currency: currency, effective_from: Date.current)
        end
      end

      def find_country(value)
        return nil if value.blank?

        value = value.to_s.strip
        Country.where("lower(name) = :value OR upper(code) = :code", value: value.downcase, code: value.upcase).first
      end

      def find_currency(value)
        return nil if value.blank?

        Currency.where("upper(code) = ?", value.to_s.strip.upcase).first
      end

      def find_or_create_department(value)
        return nil if value.blank?

        name = value.to_s.strip
        Department.where("lower(name) = ?", name.downcase).first || Department.create!(name: name)
      end

      def normalize_status(value)
        normalized = value.to_s.strip.downcase
        Employee.statuses.key?(normalized) ? normalized : "active"
      end
  end
end
