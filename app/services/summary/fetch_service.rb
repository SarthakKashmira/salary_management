module Summary
  class FetchService
    attr_reader :target_currency

    def initialize(currency_code: nil)
      @target_currency = Currency.find_by(code: currency_code&.upcase) || Currency.order(:code).first
    end

    def process
      amounts = converted_amounts

      {
        total_employees: Employee.count,
        currency: target_currency,
        employees_with_salary: amounts.size,
        max: money_amount(amounts.max),
        min: money_amount(amounts.min),
        average: money_amount(average_of(amounts)),
        median: money_amount(median_of(amounts)),
        total: money_amount(amounts.sum(0))
      }
    end

    private

      def converted_amounts
        return [] unless target_currency

        Currency.joins(:salaries).distinct.flat_map do |currency|
          rate = exchange_rate_for(currency)
          currency.salaries.pluck(:amount).map { |amount| amount * rate }
        end
      end

      def exchange_rate_for(currency)
        return BigDecimal(1) if currency == target_currency

        rates = ExchangeRates.rates_to_usd
        from_rate = rates[currency.code] or raise Money::Bank::UnknownRate, "No rate configured for #{currency.code}"
        to_rate = rates[target_currency.code] or raise Money::Bank::UnknownRate, "No rate configured for #{target_currency.code}"

        BigDecimal(from_rate.to_s) / BigDecimal(to_rate.to_s)
      end

      def money_amount(value)
        return nil if value.nil? || target_currency.nil?

        Money.from_amount(value, target_currency.code).to_f
      end

      def average_of(amounts)
        return nil if amounts.empty?

        amounts.sum / amounts.size
      end

      def median_of(amounts)
        return nil if amounts.empty?

        sorted = amounts.sort
        mid = sorted.size / 2

        sorted.size.odd? ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
      end
  end
end
