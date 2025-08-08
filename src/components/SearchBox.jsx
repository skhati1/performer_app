import React from 'react'
import './SearchBox.css'

const SearchBox = ({ searchTerm, onSearchChange, placeholder }) => {
  const handleClear = () => {
    onSearchChange('')
  }

  return (
    <div className="search-box">
      <div className="search-input-container">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-search-btn" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBox