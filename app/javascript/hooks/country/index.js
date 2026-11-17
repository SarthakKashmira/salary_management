import { useQuery } from '@tanstack/react-query'

import countryApi from 'apis/country'
import QUERY_KEYS from 'constants/queryKeys'

const useFetchCountries = (options = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.COUNTRIES],
    queryFn: async () => {
      const { data } = await countryApi.fetchCountries()

      return data
    },
    ...options,
  })

export { useFetchCountries }
