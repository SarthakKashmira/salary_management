module Api
  module V1
    class CountriesController < BaseController
      def index
        @countries = Country.all
      end
    end
  end
end
