import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import queryClient from 'common/queryClient'
import theme from 'common/theme'
import Layout from 'components/common/Layout'
import RequireAuth from 'components/common/RequireAuth'
import componentRoutes from 'components/constants/routes'
import ForgotPassword from 'components/ForgotPassword'
import Login from 'components/Login'
import routes from 'constants/routes'

import 'react-toastify/dist/ReactToastify.css'
import 'common/i18n'

export default function App() {
  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Login />} path={routes.login} />
            <Route element={<ForgotPassword />} path={routes.forgotPassword} />
            <Route
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              {componentRoutes.map(({ path, component: Component }) => (
                <Route element={<Component />} key={path} path={path} />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </ConfigProvider>
  )
}
