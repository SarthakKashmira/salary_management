import { useMutation, useQueryClient } from '@tanstack/react-query'

const useMutationWithInvalidation = (mutationFn, { keysToInvalidate = [], onSuccess, ...options } = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: (...args) => {
      keysToInvalidate.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))
      onSuccess?.(...args)
    },
    ...options,
  })
}

export default useMutationWithInvalidation
