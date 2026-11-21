require "test_helper"

class ExchangeRatesTest < ActiveSupport::TestCase
  FakeBank = Struct.new(:rates) do
    def get_rate(from, to)
      rates.fetch([ from, to ]) { raise Money::Bank::UnknownRate, "no rate for #{from}->#{to}" }
    end
  end

  def test_rates_to_usd_returns_the_fallback_table_when_nothing_has_been_cached
    assert_equal ExchangeRates::FALLBACK_RATES_TO_USD, ExchangeRates.rates_to_usd
  end

  def test_rates_to_usd_returns_the_cached_table_once_refreshed
    bank = FakeBank.new({ [ "USD", "EUR" ] => 0.9 })

    ExchangeRates.refresh!(bank: bank)

    assert_equal (1.0 / 0.9).round(6), ExchangeRates.rates_to_usd["EUR"]
  end

  def test_refresh_uses_the_live_rate_when_the_bank_knows_it
    bank = FakeBank.new({ [ "USD", "INR" ] => 83.0 })

    rates = ExchangeRates.refresh!(bank: bank)

    assert_equal (1.0 / 83.0).round(6), rates["INR"]
  end

  def test_refresh_falls_back_to_the_static_rate_when_the_bank_does_not_know_it
    bank = FakeBank.new({})

    rates = ExchangeRates.refresh!(bank: bank)

    assert_equal ExchangeRates::FALLBACK_RATES_TO_USD["PKR"], rates["PKR"]
  end

  def test_refresh_always_keeps_usd_pegged_to_one
    bank = FakeBank.new({ [ "USD", "USD" ] => 123.0 })

    rates = ExchangeRates.refresh!(bank: bank)

    assert_equal 1.0, rates["USD"]
  end
end
