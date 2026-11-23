module ExchangeRates
  # RATES_TO_USD is defined in config/initializers/money.rb (also used to seed
  # the default Money bank at boot) and reused here as the fallback for any
  # currency the ECB doesn't publish a rate for - refresh! only ever
  # overwrites a value, never removes one.
  FALLBACK_RATES_TO_USD = RATES_TO_USD

  FALLBACK_FILE = Rails.root.join("config/exchange_rates.yml")
  FALLBACK_FILE_HEADER = <<~COMMENT
    # 1 unit of the currency equals this many USD. Loaded once at boot as
    # RATES_TO_USD (config/initializers/money.rb) and reused by ExchangeRates
    # as the fallback for any currency the daily ECB refresh doesn't publish a
    # rate for (app/services/exchange_rates.rb).
    #
    # Rewritten by `bin/rails exchange_rates:refresh_fallback_file` on every
    # deploy (see bin/docker-entrypoint) - edits made by hand here only last
    # until the next deploy refreshes it.
  COMMENT

  CACHE_KEY = "exchange_rates/rates_to_usd"
  CACHE_EXPIRY = 2.days

  module_function

  def rates_to_usd
    Rails.cache.read(CACHE_KEY) || FALLBACK_RATES_TO_USD
  end

  def refresh!(bank: live_bank)
    rates = compute_live_rates(bank: bank)
    Rails.cache.write(CACHE_KEY, rates, expires_in: CACHE_EXPIRY)
    rates
  end

  def write_fallback_file!(bank: nil, path: FALLBACK_FILE)
    rates = compute_live_rates(bank: bank || live_bank)
    body = rates.map { |code, rate| "#{code}: #{format_rate(rate)}" }.join("\n")

    File.write(path, "#{FALLBACK_FILE_HEADER}#{body}\n")
    Rails.logger.info("[exchange_rates] refreshed #{path} with live rates")
    true
  rescue StandardError => e
    Rails.logger.warn("[exchange_rates] couldn't refresh #{path}, leaving it as-is: #{e.message}")
    false
  end

  def live_bank
    ::EuCentralBank.new.tap(&:update_rates)
  end

  def compute_live_rates(bank:)
    eur_to_usd = bank.get_rate("EUR", "USD")

    FALLBACK_RATES_TO_USD.each_with_object({}) do |(code, fallback_rate), result|
      result[code] = code == "USD" ? 1.0 : (eur_to_usd / bank.get_rate("EUR", code)).round(6)
    rescue Money::Bank::UnknownRate, CurrencyUnavailable
      result[code] = fallback_rate
    end
  end

  def format_rate(value)
    return "1.0" if value == 1.0

    formatted = format("%.5f", value).sub(/0+\z/, "")
    formatted.end_with?(".") ? "#{formatted}0" : formatted
  end
end
