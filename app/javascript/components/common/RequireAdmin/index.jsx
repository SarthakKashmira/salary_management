import { Navigate } from 'react-router-dom'

import routes from 'constants/routes'
import { isAdmin } from 'utils/auth'

export default function RequireAdmin({ children }) {
  return isAdmin() ? children : <Navigate replace to={routes.forbidden} />
}
