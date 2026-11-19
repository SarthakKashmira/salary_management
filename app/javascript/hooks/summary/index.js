import { useQuery } from '@tanstack/react-query'

import summaryApi from 'apis/summary'
import QUERY_KEYS from 'constants/queryKeys'

const { SUMMARY } = QUERY_KEYS

const useFetchSummary = (currencyCode, options = {}) =>
  useQuery({
    queryKey: [SUMMARY, currencyCode],
    queryFn: async () => {
      const { data } = await summaryApi.fetchSummary({ currencyCode })

      return data
    },
    enabled: Boolean(currencyCode),
    ...options,
  })

export { useFetchSummary }
