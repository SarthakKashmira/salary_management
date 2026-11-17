import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import componentRoutes from './components/constants/routes'
import queryClient from './common/queryClient'

import 'react-toastify/dist/ReactToastify.css'
import './common/i18n'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {componentRoutes.map(({ path, component: Component }) => (
            <Route element={<Component />} key={path} path={path} />
          ))}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  )
}
