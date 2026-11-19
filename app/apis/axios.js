import axios from 'axios'
import { stringify } from 'qs'
import { toast } from 'react-toastify'

import i18n from 'common/i18n'
import { getFromLocalStorage, setToLocalStorage } from 'utils/storage'
import { preprocessForSerialization } from 'utils/url'

axios.defaults.baseURL = '/api'
axios.defaults.paramsSerializer = (params) => stringify(preprocessForSerialization(params))

const setAuthHeaders = () => {
  axios.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]')?.getAttribute('content'),
  }

  const token = getFromLocalStorage('authToken')
  const email = getFromLocalStorage('authEmail')

  if (token && email) {
    axios.defaults.headers['X-Auth-Email'] = email
    axios.defaults.headers['X-Auth-Token'] = token
  }
}

const handleSuccessResponse = (response) => {
  if (response) {
    response.success = response.status === 200
    if (response.data?.notice) toast.success(response.data.notice)
  }

  return response
}

const AUTH_ENDPOINTS = [ '/session', '/registration' ]

const handleErrorResponse = (axiosErrorObject) => {
  const { config, response } = axiosErrorObject
  const status = response?.status
  const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) => config?.url?.startsWith(endpoint))

  if (status === 401 && !isAuthEndpoint) {
    setToLocalStorage({ authToken: null, authEmail: null, userId: null })
    setTimeout(() => (window.location.href = '/login'), 2000)
  }

  const reason =
    response?.data?.errors?.join(', ') || response?.data?.error || axiosErrorObject.message || i18n.t('api.defaultError')
  toast.error(status ? i18n.t('api.errorWithStatus', { reason, status }) : reason)

  if (status === 423) window.location.href = '/login'

  return Promise.reject(axiosErrorObject)
}

const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse)
}

const resetAuthTokens = () => {
  delete axios.defaults.headers['X-Auth-Email']
  delete axios.defaults.headers['X-Auth-Token']
}

export { setAuthHeaders, registerIntercepts, resetAuthTokens }
