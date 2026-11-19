import { useMutation } from '@tanstack/react-query'

import authApi from 'apis/auth'

const useLogin = (options = {}) => useMutation({ mutationFn: authApi.login, ...options })

const useRegister = (options = {}) => useMutation({ mutationFn: authApi.register, ...options })

export { useLogin, useRegister }
