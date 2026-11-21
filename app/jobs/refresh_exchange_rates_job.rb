class RefreshExchangeRatesJob < ApplicationJob
  queue_as :default

  def perform
    ExchangeRates.refresh!
  end
end
