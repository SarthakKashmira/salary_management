module ExchangeRates
  # RATES_TO_USD is defined in config/initializers/money.rb (also used to seed
  # the default Money bank at boot) and reused here as the fallback for any
  # currency the ECB doesn't publish a rate for - refresh! only ever
  # overwrites a value, never removes one.
  FALLBACK_RATES_TO_USD = RATES_TO_USD

  CACHE_KEY = "exchange_rates/rates_to_usd"
  CACHE_EXPIRY = 2.days

  module_function

  def rates_to_usd
    Rails.cache.read(CACHE_KEY) || FALLBACK_RATES_TO_USD
  end

  def refresh!(bank: live_bank)
    rates = FALLBACK_RATES_TO_USD.each_with_object({}) do |(code, fallback_rate), result|
      result[code] = code == "USD" ? 1.0 : (1.0 / bank.get_rate("USD", code)).round(6)
    rescue Money::Bank::UnknownRate
      result[code] = fallback_rate
    end

    Rails.cache.write(CACHE_KEY, rates, expires_in: CACHE_EXPIRY)
    rates
  end

  def live_bank
    Money::Bank::EuCentralBank.new.tap(&:update_rates)
  end
end
