require "test_helper"

class ExchangeRatesTest < ActiveSupport::TestCase
  FakeBank = Struct.new(:eur_rates) do
    def get_rate(from, to)
      raise ArgumentError, "fake only supports EUR as the from currency" unless from == "EUR"

      eur_rates.fetch(to) { raise Money::Bank::UnknownRate, "no rate for EUR->#{to}" }
    end
  end

  teardown do
    Rails.cache.delete(ExchangeRates::CACHE_KEY)
  end

  def test_rates_to_usd_returns_the_fallback_table_when_nothing_has_been_cached
    assert_equal ExchangeRates::FALLBACK_RATES_TO_USD, ExchangeRates.rates_to_usd
  end

  def test_rates_to_usd_returns_the_cached_table_once_refreshed
    bank = FakeBank.new({ "USD" => 1.1, "EUR" => 1.0 })

    ExchangeRates.refresh!(bank: bank)

    assert_equal 1.1, ExchangeRates.rates_to_usd["EUR"]
  end

  def test_refresh_uses_the_live_rate_when_the_bank_knows_it
    bank = FakeBank.new({ "USD" => 1.1, "INR" => 91.0 })

    rates = ExchangeRates.refresh!(bank: bank)

    assert_equal (1.1 / 91.0).round(6), rates["INR"]
  end

  def test_refresh_falls_back_to_the_static_rate_when_the_bank_does_not_know_it
    bank = FakeBank.new({ "USD" => 1.1 })

    rates = ExchangeRates.refresh!(bank: bank)

    assert_equal ExchangeRates::FALLBACK_RATES_TO_USD["PKR"], rates["PKR"]
  end

  def test_refresh_always_keeps_usd_pegged_to_one
    bank = FakeBank.new({ "USD" => 1.1 })

    rates = ExchangeRates.refresh!(bank: bank)

    assert_equal 1.0, rates["USD"]
  end

  def test_write_fallback_file_writes_live_rates_without_scientific_notation
    bank = FakeBank.new({ "USD" => 1.1, "INR" => 91.0, "VND" => 27500.0 })
    path = Rails.root.join("tmp/exchange_rates_test_#{SecureRandom.hex(4)}.yml")

    assert ExchangeRates.write_fallback_file!(bank: bank, path: path)

    contents = File.read(path)
    written = YAML.load(contents)

    assert_equal (1.1 / 91.0).round(6), written["INR"]
    assert_equal (1.1 / 27500.0).round(6), written["VND"]
    refute_match(/e-?\d/, contents)
    assert_match(/\A# /, contents)
  ensure
    FileUtils.rm_f(path)
  end

  def test_write_fallback_file_leaves_the_file_untouched_on_failure
    failing_bank = Object.new.tap { |b| b.define_singleton_method(:get_rate) { |*| raise "network down" } }
    path = Rails.root.join("tmp/exchange_rates_test_#{SecureRandom.hex(4)}.yml")
    File.write(path, "existing: contents\n")

    result = ExchangeRates.write_fallback_file!(bank: failing_bank, path: path)

    assert_not result
    assert_equal "existing: contents\n", File.read(path)
  ensure
    FileUtils.rm_f(path)
  end
end
