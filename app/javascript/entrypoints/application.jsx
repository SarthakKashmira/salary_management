import { createRoot } from 'react-dom/client'

import { COLORS } from 'common/theme'
import App from '../App'

import './application.css'

document.body.style.backgroundColor = COLORS.cream

const container = document.getElementById('root')
createRoot(container).render(<App />)
