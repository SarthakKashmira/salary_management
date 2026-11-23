namespace :exchange_rates do
  desc "Refresh config/exchange_rates.yml with the latest live rates (safe no-op on failure)"
  task refresh_fallback_file: :environment do
    ExchangeRates.write_fallback_file!
  end
end
