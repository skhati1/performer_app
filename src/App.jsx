import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SongDetail from './components/SongDetail'
import { loadSongs } from './utils/songLoader'
import './App.css'

function App() {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true)
        const loadedSongs = await loadSongs()
        setSongs(loadedSongs)
      } catch (err) {
        setError('Failed to load songs: ' + err.message)
        console.error('Error loading songs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSongs()
  }, [])

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner loading"></div>
        <p>Loading songs ...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home songs={songs} />} />
        <Route path="/song/:songId" element={<SongDetail songs={songs} />} />
      </Routes>
    </div>
  )
}

export default App