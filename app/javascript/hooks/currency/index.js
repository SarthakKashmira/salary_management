import { useQuery } from '@tanstack/react-query'

import currencyApi from 'apis/currency'
import QUERY_KEYS from 'constants/queryKeys'

const useFetchCurrencies = (options = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.CURRENCIES],
    queryFn: async () => {
      const { data } = await currencyApi.fetchCurrencies()

      return data
    },
    ...options,
  })

export { useFetchCurrencies }
