import { resetAuthTokens, setAuthHeaders } from 'apis/axios'
import { getFromLocalStorage, setToLocalStorage } from 'utils/storage'

export const persistSession = ({ token, user }) => {
  setToLocalStorage({ authToken: token, authEmail: user.email, authRole: user.role, userId: user.id })
  setAuthHeaders()
}

export const clearSession = () => {
  setToLocalStorage({ authToken: null, authEmail: null, authRole: null, userId: null })
  resetAuthTokens()
}

export const isAuthenticated = () => Boolean(getFromLocalStorage('authToken') && getFromLocalStorage('authEmail'))

export const isAdmin = () => getFromLocalStorage('authRole') === 'admin'
