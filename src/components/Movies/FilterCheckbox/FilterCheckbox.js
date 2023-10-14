import React from 'react'
import { useLocation } from 'react-router-dom'
import './FilterCheckbox.css'

function FilterCheckbox({ shortFilmFilter, setShortFilmFilter }) {
  const location = useLocation()

  const handleCheckboxChange = (e) => {
    setShortFilmFilter(e.target.checked)
    location.pathname === '/movies'
      ? localStorage.setItem('shortFilms', JSON.stringify(e.target.checked))
      : localStorage.setItem(
          'shortSavedMovies',
          JSON.stringify(e.target.checked)
        )
  }

  return (
    <div className="filter">
      <input
        className="filter__input"
        type="checkbox"
        id="checkbox"
        onChange={handleCheckboxChange}
        checked={shortFilmFilter}
      />
      <label className="filter__label" />
    </div>
  )
}

export default FilterCheckbox
