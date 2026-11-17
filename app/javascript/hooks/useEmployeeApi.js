import { useQuery } from '@tanstack/react-query'

import employeeApi from 'apis/employee'
import QUERY_KEYS from 'constants/queryKeys'

const { EMPLOYEES } = QUERY_KEYS

const useFetchEmployees = (params = {}, options = {}) =>
  useQuery({
    queryKey: [EMPLOYEES, params],
    queryFn: async () => {
      const { data } = await employeeApi.fetchEmployees(params)

      return data
    },
    ...options,
  })

export { useFetchEmployees }
