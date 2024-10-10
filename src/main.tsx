import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>,
)