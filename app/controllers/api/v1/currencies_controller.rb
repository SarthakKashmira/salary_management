module Api
  module V1
    class CurrenciesController < BaseController
      def index
        @currencies = Currency.all
      end
    end
  end
end
