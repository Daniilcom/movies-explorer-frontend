import { React, useState, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import {
  moviesFilter,
  shortMoviesFilter,
  handleItemsFiltering,
  searchItem,
} from '../../utils/halpers'
import '../Movies/Movies.css'
import Header from '../Header/Header'
import SearchForm from '../Movies/SearchForm/SearchForm'
import Footer from '../Footer/Footer'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'

const SavedMovies = (props) => {
  const { onSave, onDelete, savedMovies, setSavedMovies, isLoading, isError } =
    props

  const [moviesToRender, setMoviesToRender] = useState([])
  const [searchInputValue, setSearchInputValue] = useState('')
  const [width, setWidth] = useState(window.innerWidth)
  const [shortFilmFilter, setShortFilmFilter] = useLocalStorage(
    'shortSavedMovies',
    false
  )

  const handleSearchMovies = (inputValue) => {
    searchItem(
      inputValue,
      setSearchInputValue,
      'foundSavedMovies',
      'saveSearchInputValue'
    )
  }

  const handleChangeSearchInputValue = (e) => {
    const newValue = e.target.value
    if (newValue === '') {
      setSearchInputValue(newValue)
    }
  }

  const handleMoviesFiltering = () => {
    return handleItemsFiltering(
      searchInputValue,
      savedMovies,
      shortFilmFilter,
      width,
      setMoviesToRender,
      moviesFilter,
      shortMoviesFilter
    )
  }

  useEffect(() => {
    handleMoviesFiltering()
  }, [searchInputValue, savedMovies, shortFilmFilter, width])

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm
          onChange={handleChangeSearchInputValue}
          onSearch={handleSearchMovies}
          shortFilmFilter={shortFilmFilter}
          setShortFilmFilter={setShortFilmFilter}
          localStorageKey={'saveSearchInputValue'}
        />
        <section className="saved-movies__container">
          {isLoading ? (
            <div className="movies__preloader">
              <Preloader />
            </div>
          ) : (
            <>
              {isError ? (
                <p className="movies__text">
                  Во время запроса произошла ошибка. Возможно, проблема с
                  соединением или сервер недоступен. Подождите немного и
                  попробуйте ещё раз
                </p>
              ) : (
                <>
                  {savedMovies.length === 0 ? (
                    <>
                      <p className="movies__text">
                        Ваш список фильмов ещё пуст
                      </p>
                    </>
                  ) : (
                    <>
                      {moviesToRender.length > 0 ? (
                        <>
                          <MoviesCardList
                            setWidth={setWidth}
                            onMoviesFiltering={handleMoviesFiltering}
                            searchInputValue={searchInputValue}
                            movies={moviesToRender}
                            onSave={onSave}
                            onDelete={onDelete}
                            savedMovies={savedMovies}
                            setSavedMovies={setSavedMovies}
                          />
                        </>
                      ) : (
                        <p className="movies__text">Ничего не найдено</p>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies
