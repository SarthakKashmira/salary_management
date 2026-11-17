module Api
  class CountriesController < BaseController
    def index
      @countries = Country.all
    end
  end
end
