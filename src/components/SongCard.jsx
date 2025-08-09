import React from 'react'
import { useSongCompletion } from "../SongCompletionContext";
import { useNavigate } from 'react-router-dom'
import './SongCard.css'

const SongCard = ({ song, index }) => {

  const { completedSongs, toggleSong } = useSongCompletion();
  const completed = completedSongs[song.id];

  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/song/${song.id}`)
  }

  return (
    <div 
      className="song-card fade-in" 
      onClick={handleCardClick}
      style={{
        animationDelay: `${index * 0.1}s`,
        opacity: completed ? 0.5 : 1,
      }}
    >
      <div className="song-card-header">
        <div className="song-info">
          <h3 className="song-title">{song.songName}</h3>
          <p className="song-artist">{song.artist}</p>
        </div>
        <div className="song-key">
          <span className="key-label">Key</span>
          <span className="key-value">{song.key}</span>
        </div>
      </div>

      <div className="song-details">
        
        <div className="song-chords">
          <span className="chords-label">Chords:</span>
          <div className="chords-list">
            {song.chords?.slice(0, 4).map((chord, idx) => (
              <span key={idx} className="chord">{chord}</span>
            ))}
            {song.chords?.length > 4 && (
              <span className="chord-more">+{song.chords?.length - 4}</span>
            )}
          </div>
        </div>
      </div>

      <div className="song-tags">
        {song.customTags?.slice(0, 3).map((tag, idx) => (
          <span key={idx} className="song-tag">{tag}</span>
        ))}
        {song.customTags.length > 3 && (
          <span className="tag-more">+{song.customTags.length - 3}</span>
        )}
      </div>

      <div className="card-footer">
        <span className="view-details">View Details →</span>
      </div>
    </div>
  )
}

export default SongCard