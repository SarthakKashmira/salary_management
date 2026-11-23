# Broadcasts and caches progress for any long-running background task (employee
# imports, demo data seed/clear, ...) so an ActionCable channel can relay it to
# the browser live, and replay the latest state to a client that subscribes late.
module ProgressTracker
  CACHE_EXPIRY = 10.minutes

  module_function

  def broadcast(topic, percent:, stage:, message:, **extra)
    payload = { percent: percent, stage: stage, message: message, **extra }
    Rails.cache.write(cache_key(topic), payload, expires_in: CACHE_EXPIRY)
    ActionCable.server.broadcast(topic, payload)
  end

  def latest(topic)
    Rails.cache.read(cache_key(topic))
  end

  def cache_key(topic)
    "progress/#{topic}"
  end
end
