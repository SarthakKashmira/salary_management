module Api
  module V1
    class SummaryController < BaseController
      def show
        @summary = Summary::FetchService.new(currency_code: params[:currency_code]).process
      end
    end
  end
end
