import { keepPreviousData, useQuery } from '@tanstack/react-query'

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
    placeholderData: keepPreviousData,
    ...options,
  })

const useShowDepartment = (id, options = {}) =>
  useQuery({
    enabled: Boolean(id),
    queryKey: [DEPARTMENTS, id],
    queryFn: async () => {
      const { data } = await departmentApi.fetchDepartment(id)

      return data
    },
    ...options,
  })

const useCreateDepartment = (options = {}) =>
  useMutationWithInvalidation(departmentApi.createDepartment, {
    keysToInvalidate: [[DEPARTMENTS]],
    ...options,
  })

const useUpdateDepartment = (options = {}) =>
  useMutationWithInvalidation(departmentApi.updateDepartment, {
    keysToInvalidate: [[DEPARTMENTS]],
    ...options,
  })

const useBulkDeleteDepartments = (options = {}) =>
  useMutationWithInvalidation(departmentApi.bulkDeleteDepartments, {
    keysToInvalidate: [[DEPARTMENTS]],
    ...options,
  })

export { useFetchDepartments, useShowDepartment, useCreateDepartment, useUpdateDepartment, useBulkDeleteDepartments }
