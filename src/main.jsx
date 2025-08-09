import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { SongCompletionProvider } from "./SongCompletionContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <SongCompletionProvider>
      <App />
    </SongCompletionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)