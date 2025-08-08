import React from 'react'
import './FilterBar.css'

const FilterBar = ({ tags, selectedTags, onTagToggle, onClearFilters }) => {
  if (tags.length === 0) return null

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <h3>Filter:</h3>
        {selectedTags.length > 0 && (
          <button className="clear-filters-btn" onClick={onClearFilters}>
            Clear ({selectedTags.length})
          </button>
        )}
      </div>
      
      <div className="filter-tags">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => onTagToggle(tag)}
          >
            <span className="tag-text">{tag}</span>
            {selectedTags.includes(tag) && <span className="tag-check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar