RATES_TO_USD = YAML.load_file(Rails.root.join("config/exchange_rates.yml")).freeze

bank = Money::Bank::VariableExchange.new

RATES_TO_USD.each_key do |from_code|
  RATES_TO_USD.each_key do |to_code|
    next if from_code == to_code

    bank.add_rate(from_code, to_code, RATES_TO_USD[from_code] / RATES_TO_USD[to_code])
  end
end

Money.default_bank = bank
Money.default_currency = "USD"
Money.locale_backend = :currency
