import { useQuery } from '@tanstack/react-query'

import departmentApi from 'apis/department'
import QUERY_KEYS from 'constants/queryKeys'

const useFetchDepartments = (options = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.DEPARTMENTS],
    queryFn: async () => {
      const { data } = await departmentApi.fetchDepartments()

      return data
    },
    ...options,
  })

export { useFetchDepartments }
