import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSongById } from '../utils/songLoader'
import './SongDetail.css'
import { useSongCompletion } from "../SongCompletionContext";

const SongDetail = ({ songs }) => {

  const { songId } = useParams()
  const navigate = useNavigate()
  const [currentLanguage, setCurrentLanguage] = useState('english')
  const [song, setSong] = useState(null)

  const { completedSongs, toggleSong } = useSongCompletion();

  useEffect(() => {
    const foundSong = getSongById(songs, songId)
    if (foundSong) {
      setSong(foundSong)
    } else {
      navigate('/')
    }
  }, [songId, songs, navigate])

  if (!song) {
    return (
      <div className="song-detail-loading">
        <div className="loading-spinner loading"></div>
        <p>Loading song...</p>
      </div>
    )
  }

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'english' ? 'hindi' : 'english')
  }

  const formatLyrics = (lyrics) => {
    if (!lyrics) return 'No lyrics available';
    return lyrics.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lyrics.split('\n')?.length - 1 && <br />}
      </React.Fragment>
    ))
  }

  return (
    <div className="song-detail fade-in">
      <div className="container">
        <header className="song-detail-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to Songs
          </button>
        </header>

        {/* Compact top bar */}
        <div className="song-top-bar">
          <span className="song-title">{song.songName}</span>
          <span className="song-artist">by {song.artist}</span>
          <span className="song-key">Key: {song.key}</span>
          {song.chords && song.chords.length > 0 && (
            <div className="chords-bar">
              {song.chords.map((chord, idx) => (
                <span key={idx} className="chord-tag">{chord} &nbsp;</span>
              ))}
            </div>
          )}
          <label className="completed-checkbox-label">
            <input
              type="checkbox"
              className="completed-checkbox"
              checked={!!completedSongs[song.id]}
              onChange={() => toggleSong(song.id)}
            />
            {completedSongs[song.id] && <span className="completed-text">Completed</span>}
          </label>
        </div>

        {/* Main content full width */}
        <div className="lyrics-section">
          <div className="lyrics-header">
            <h3>Lyrics</h3>
            <div className="language-toggle">
              <button
                className={`toggle-btn ${currentLanguage === 'english' ? 'active' : ''}`}
                onClick={() => setCurrentLanguage('english')}
              >
                English
              </button>
              <button
                className={`toggle-btn ${currentLanguage === 'hindi' ? 'active' : ''}`}
                onClick={() => setCurrentLanguage('hindi')}
              >
                हिंदी
              </button>
            </div>
          </div>
          <div className="lyrics-content">
            <div className={`lyrics-text ${currentLanguage}`}>
              {formatLyrics(song.lyrics[currentLanguage])}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongDetail