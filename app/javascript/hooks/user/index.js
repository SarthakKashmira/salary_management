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

const useCreateUser = (options = {}) =>
  useMutationWithInvalidation(userApi.createUser, {
    keysToInvalidate: [[USERS]],
    ...options,
  })

export { useFetchUsers, useCreateUser }
