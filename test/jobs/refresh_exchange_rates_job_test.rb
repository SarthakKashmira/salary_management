require "test_helper"

class RefreshExchangeRatesJobTest < ActiveJob::TestCase
  def test_perform_refreshes_and_caches_the_exchange_rates
    fake_bank = Struct.new(:rate) do
      def get_rate(_from, _to)
        rate
      end
    end.new(80.0)

    original_live_bank = ExchangeRates.method(:live_bank)
    ExchangeRates.define_singleton_method(:live_bank) { fake_bank }

    RefreshExchangeRatesJob.perform_now

    assert_equal (1.0 / 80.0).round(6), ExchangeRates.rates_to_usd["INR"]
  ensure
    ExchangeRates.define_singleton_method(:live_bank, original_live_bank)
  end
end
