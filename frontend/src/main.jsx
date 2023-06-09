import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './style.css'
import './assets/boxicons.min.css'
import { BrowserRouter } from 'react-router-dom'
import './assets/js/bootstrap.bundle.js'

import { AuthContextProvider } from './context/AuthContext'
import { CategoryContextProvider } from './context/CategoryContext'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CategoryContextProvider>
          <App />

        </CategoryContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
