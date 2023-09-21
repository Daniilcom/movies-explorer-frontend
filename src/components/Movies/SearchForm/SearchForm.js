import { React } from 'react'
import './SearchForm.css'
import search from '../../../images/icons/search__button.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" name="searc">
          <input
            className="search__input"
            type="search"
            placeholder="Фильм"
            required
          />
          <button type="submit" className="search__button">
            <img className="search__icon" src={search} alt="Поиск" />
          </button>
        </form>
      </div>
      <div className="search__checkbox">
        <FilterCheckbox />
        <p className="search__checkbox-text">Короткометражки</p>
      </div>
    </section>
  )
}

export default SearchForm
