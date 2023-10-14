import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useValidation from '../../../hooks/useValidation'
import './SearchForm.css'
import search from '../../../images/icons/search__button.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm(props) {
  const {
    onChange,
    onSearch,
    localStorageKey,
    setShortFilmFilter,
    shortFilmFilter,
  } = props

  const [inputValue, setInputValue] = useState('')
  const { handleChange, errors, isValid } = useValidation()
  const [activeField, setActiveField] = useState(null)

  const location = useLocation()
  const handlePath = (path) => location.pathname === path

  function onChangeInput(e) {
    setInputValue(e.target.value)
    handleChange(e)
    if (handlePath('/saved-movies')) {
      onChange(e)
    }
  }

  function handleSubmite(e) {
    e.preventDefault()
    if (isValid) {
      onSearch(inputValue)
    }
  }

  const handleFocus = (field) => {
    setActiveField(field)
  }

  const handleBlur = () => {
    setActiveField(null)
  }

  useEffect(() => {
    handlePath('/movies')
      ? setInputValue(localStorage.getItem(localStorageKey))
      : setInputValue(localStorage.removeItem(localStorageKey))
  }, [])

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" name="searc" onSubmit={handleSubmite}>
          <input
            className="search__input"
            type="search"
            placeholder="Фильм"
            value={inputValue || ''}
            onChange={(e) => onChangeInput(e)}
            required
            name="search"
            onFocus={() => handleFocus('search')}
            onBlur={handleBlur}
          />
          <button type="submit" className="search__button" disabled={!isValid}>
            <img className="search__icon" src={search} alt="Поиск" />
          </button>
        </form>
        {activeField && errors.search && (
          <span className="search__error">{errors.search}</span>
        )}
      </div>
      <div className="search__checkbox">
        <FilterCheckbox
          setShortFilmFilter={setShortFilmFilter}
          shortFilmFilter={shortFilmFilter}
        />
        <p className="search__checkbox-text">Короткометражки</p>
      </div>
    </section>
  )
}

export default SearchForm
