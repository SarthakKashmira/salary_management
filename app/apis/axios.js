import axios from 'axios'
import { toast } from 'react-toastify'

import i18n from 'common/i18n'
import { getFromLocalStorage, setToLocalStorage } from 'utils/storage'

axios.defaults.baseURL = '/api'

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
    toast.success(i18n.t('api.success'))
  }

  return response
}

const handleErrorResponse = (axiosErrorObject) => {
  const { response } = axiosErrorObject
  const status = response?.status

  if (status === 401) {
    setToLocalStorage({ authToken: null, authEmail: null, userId: null })
    setTimeout(() => (window.location.href = '/'), 2000)
  }

  const reason = response?.data?.error || axiosErrorObject.message || i18n.t('api.defaultError')
  toast.error(status ? i18n.t('api.errorWithStatus', { reason, status }) : reason)

  if (status === 423) window.location.href = '/'

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
