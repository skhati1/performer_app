import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { SongCompletionProvider } from "./SongCompletionContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
    <SongCompletionProvider>
      <App />
    </SongCompletionProvider>
    </HashRouter>
  </React.StrictMode>,
)