import { useQuery } from '@tanstack/react-query'

import departmentApi from 'apis/department'
import QUERY_KEYS from 'constants/queryKeys'
import useMutationWithInvalidation from 'hooks/useMutationWithInvalidation'

const { DEPARTMENTS } = QUERY_KEYS

const useFetchDepartments = (params = {}, options = {}) =>
  useQuery({
    queryKey: [DEPARTMENTS, params],
    queryFn: async () => {
      const { data } = await departmentApi.fetchDepartments(params)

      return data
    },
    ...options,
  })

const useCreateDepartment = (options = {}) =>
  useMutationWithInvalidation(departmentApi.createDepartment, {
    keysToInvalidate: [[DEPARTMENTS]],
    ...options,
  })

export { useFetchDepartments, useCreateDepartment }
