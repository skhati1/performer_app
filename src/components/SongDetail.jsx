import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSongById } from '../utils/songLoader'
import './SongDetail.css'

const SongDetail = ({ songs }) => {
  const { songId } = useParams()
  const navigate = useNavigate()
  const [currentLanguage, setCurrentLanguage] = useState('english')
  const [song, setSong] = useState(null)

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
        {index < lyrics.split('\n').length - 1 && <br />}
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
          <div className="header-actions">
            <button className="share-btn" onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: song.songName,
                  text: `Check out "${song.songName}" by ${song.artist}`,
                  url: window.location.href
                })
              }
            }}>
              📤 Share
            </button>
          </div>
        </header>

        <div className="song-detail-content">
          <div className="song-info-section">
            <div className="song-main-info">
              <h1 className="song-title">{song.songName}</h1>
              <p className="song-artist">by {song.artist}</p>
            </div>

            <div className="song-chords-section">
              <h3>Chords</h3>
              <div className="chords-display">
                {song.chords.map((chord, index) => (
                  <span key={index} className="chord-item">{chord}</span>
                ))}
              </div>
            </div>

            <div className="song-tags-section">
              <h3>Tags</h3>
              <div className="tags-display">
                {song.customTags.map((tag, index) => (
                  <span key={index} className="tag-item">{tag}</span>
                ))}
              </div>
            </div>
          </div>

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
    </div>
  )
}

export default SongDetail