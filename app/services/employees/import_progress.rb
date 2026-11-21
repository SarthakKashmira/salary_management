module Employees
  module ImportProgress
    CACHE_EXPIRY = 10.minutes

    module_function

    def broadcast(import_id, percent:, stage:, message:, **extra)
      payload = { percent: percent, stage: stage, message: message, **extra }
      Rails.cache.write(cache_key(import_id), payload, expires_in: CACHE_EXPIRY)
      ActionCable.server.broadcast("employee_import_#{import_id}", payload)
    end

    def latest(import_id)
      Rails.cache.read(cache_key(import_id))
    end

    def cache_key(import_id)
      "employee_import_progress/#{import_id}"
    end
  end
end
