import { Navigate } from 'react-router-dom'

import routes from 'constants/routes'
import { isAuthenticated } from 'utils/auth'

export default function RequireAuth({ children }) {
  return isAuthenticated() ? children : <Navigate replace to={routes.login} />
}
