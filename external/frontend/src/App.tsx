import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

import './global-style.css'

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
