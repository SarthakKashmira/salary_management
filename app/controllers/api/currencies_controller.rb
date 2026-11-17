module Api
  class CurrenciesController < BaseController
    def index
      @currencies = Currency.all
    end
  end
end
