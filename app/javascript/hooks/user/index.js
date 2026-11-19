import { useQuery } from '@tanstack/react-query'

import userApi from 'apis/user'
import QUERY_KEYS from 'constants/queryKeys'
import useMutationWithInvalidation from 'hooks/useMutationWithInvalidation'

const { USERS } = QUERY_KEYS

const useFetchUsers = (params = {}, options = {}) =>
  useQuery({
    queryKey: [USERS, params],
    queryFn: async () => {
      const { data } = await userApi.fetchUsers(params)

      return data
    },
    ...options,
  })

const useShowUser = (id, options = {}) =>
  useQuery({
    enabled: Boolean(id),
    queryKey: [USERS, id],
    queryFn: async () => {
      const { data } = await userApi.fetchUser(id)

      return data
    },
    ...options,
  })

const useCreateUser = (options = {}) =>
  useMutationWithInvalidation(userApi.createUser, {
    keysToInvalidate: [[USERS]],
    ...options,
  })

const useUpdateUser = (options = {}) =>
  useMutationWithInvalidation(userApi.updateUser, {
    keysToInvalidate: [[USERS]],
    ...options,
  })

const useDeleteUser = (options = {}) =>
  useMutationWithInvalidation(userApi.deleteUser, {
    keysToInvalidate: [[USERS]],
    ...options,
  })

export { useFetchUsers, useShowUser, useCreateUser, useUpdateUser, useDeleteUser }
