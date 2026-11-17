import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import queryClient from 'common/queryClient'
import Layout from 'components/common/Layout'
import componentRoutes from 'components/constants/routes'

import 'react-toastify/dist/ReactToastify.css'
import 'common/i18n'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {componentRoutes.map(({ path, component: Component }) => (
              <Route element={<Component />} key={path} path={path} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  )
}
