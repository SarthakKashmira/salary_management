import { useQuery } from '@tanstack/react-query'

import employeeApi from 'apis/employee'
import QUERY_KEYS from 'constants/queryKeys'
import useMutationWithInvalidation from 'hooks/useMutationWithInvalidation'

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

const useShowEmployee = (id, options = {}) =>
  useQuery({
    enabled: Boolean(id),
    queryKey: [EMPLOYEES, id],
    queryFn: async () => {
      const { data } = await employeeApi.fetchEmployee(id)

      return data
    },
    ...options,
  })

const useCreateEmployee = (options = {}) =>
  useMutationWithInvalidation(employeeApi.createEmployee, {
    keysToInvalidate: [[EMPLOYEES]],
    ...options,
  })

const useUpdateEmployee = (options = {}) =>
  useMutationWithInvalidation(employeeApi.updateEmployee, {
    keysToInvalidate: [[EMPLOYEES]],
    ...options,
  })

const useBulkDeleteEmployees = (options = {}) =>
  useMutationWithInvalidation(employeeApi.bulkDeleteEmployees, {
    keysToInvalidate: [[EMPLOYEES]],
    ...options,
  })

export { useFetchEmployees, useShowEmployee, useCreateEmployee, useUpdateEmployee, useBulkDeleteEmployees }
