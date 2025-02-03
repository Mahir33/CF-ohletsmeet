import React from 'react'
import ReactDOM from 'react-dom/client'
import * as atatus from 'atatus-spa';
import App from './App.jsx'
import './index.css'

atatus.config('2627646d9e674103ac690a43b4239300').install();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
