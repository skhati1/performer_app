import React, { useState, useEffect } from 'react'
import SearchBox from './SearchBox'
import FilterBar from './FilterBar'
import SongCard from './SongCard'
import './Home.css'

const Home = ({ songs }) => {
  const [filteredSongs, setFilteredSongs] = useState(songs)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  // Get all unique tags from songs
  const allTags = [...new Set(songs.flatMap(song => song.customTags))]

  useEffect(() => {
    let filtered = songs

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(song =>
        song.songName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(song =>
        selectedTags.every(tag => song.customTags.includes(tag))
      )
    }

    setFilteredSongs(filtered)
  }, [songs, searchTerm, selectedTags])

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTags([])
  }

  return (
    <div className="home">
      <div className="container">
        <header className="home-header fade-in">
          <h4 className="app-title">🎵Performer</h4>
        </header>

        <div className="search-section fade-in">
          <SearchBox
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search songs or artists..."
          />
        </div>

        <div className="filter-section fade-in">
          <FilterBar
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearFilters={clearFilters}
          />
        </div>

        <div className="results-section">
          <div className="results-header">
            <h2>
              {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''} found
            </h2>
            {(searchTerm || selectedTags.length > 0) && (
              <button className="clear-all-btn" onClick={clearFilters}>
                Clear All Filters
              </button>
            )}
          </div>

          <div className="songs-grid fade-in">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                />
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🎵</div>
                <h3>No songs found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home