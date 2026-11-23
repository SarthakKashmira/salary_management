require "test_helper"

class RefreshExchangeRatesJobTest < ActiveJob::TestCase
  def test_perform_refreshes_and_caches_the_exchange_rates
    eur_rates = { "EUR" => 1.0, "USD" => 1.1, "INR" => 91.0 }
    fake_bank = Struct.new(:eur_rates) do
      def get_rate(from, to)
        raise ArgumentError, "fake only supports EUR as the from currency" unless from == "EUR"

        eur_rates.fetch(to) { raise Money::Bank::UnknownRate, "no rate for EUR->#{to}" }
      end
    end.new(eur_rates)

    original_live_bank = ExchangeRates.method(:live_bank)
    ExchangeRates.define_singleton_method(:live_bank) { fake_bank }

    RefreshExchangeRatesJob.perform_now

    assert_equal (1.1 / 91.0).round(6), ExchangeRates.rates_to_usd["INR"]
  ensure
    ExchangeRates.define_singleton_method(:live_bank, original_live_bank)
    Rails.cache.delete(ExchangeRates::CACHE_KEY)
  end
end
