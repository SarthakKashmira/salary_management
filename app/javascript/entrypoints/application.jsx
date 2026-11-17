import { createRoot } from 'react-dom/client'

import { registerIntercepts, setAuthHeaders } from 'apis/axios'
import { COLORS } from 'common/theme'
import App from '../App'

import './application.css'

document.body.style.backgroundColor = COLORS.cream

// Registered here rather than in a component effect: React StrictMode runs effects twice
// and can stack two interceptors causig two toastr
setAuthHeaders()
registerIntercepts()

const container = document.getElementById('root')
createRoot(container).render(<App />)
