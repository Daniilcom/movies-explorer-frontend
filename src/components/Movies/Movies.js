import { React, useState, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import {
  moviesFilter,
  shortMoviesFilter,
  calculateMoviesToRender,
  handleItemsFiltering,
  calculateMoviesToAdd,
  searchItem,
} from '../../utils/halpers'
import './Movies.css'
import Header from '../Header/Header'
import SearchForm from './SearchForm/SearchForm'
import Footer from '../Footer/Footer'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'

import moviesApi from '../../utils/MoviesApi'

const Movies = (props) => {
  const [allMovies, setAllMovies] = useState([])
  const [searchInputValue, setSearchInputValue] = useState('')
  const [isError, setIsError] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [width, setWidth] = useState(window.innerWidth)
  const [moviesToRender, setMoviesToRender] = useLocalStorage('addMovies', [])
  const [shortFilmFilter, setShortFilmFilter] = useLocalStorage(
    'shortFilms',
    false
  )

  const {
    onSave,
    onDelete,
    savedMovies,
    setSavedMovies,
    isLoading,
    setIsLoading,
  } = props

  const handleSearchMovies = (inputValue) => {
    searchItem(inputValue, setSearchInputValue, 'addMovies', 'searchInputValue')
    loadMovies()
  }

  const loadMovies = async () => {
    try {
      setIsLoading(true)
      const storedMovies = localStorage.getItem('allMovies')
      if (storedMovies) {
        setAllMovies(JSON.parse(storedMovies))
        setIsError(false)
      } else {
        const movies = await moviesApi.getMovies()
        localStorage.setItem('allMovies', JSON.stringify(movies))
        setAllMovies(movies)
        setIsError(false)
      }
    } catch (err) {
      console.log(err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const listMovies = moviesToRender.length

  const handleAddMovies = () => {
    const moviesToAdd = calculateMoviesToAdd(filteredMovies, listMovies, width)
    setMoviesToRender((prevMovies) => [...prevMovies, ...moviesToAdd])
  }

  const handleMoviesFiltering = () => {
    return handleItemsFiltering(
      searchInputValue,
      allMovies,
      shortFilmFilter,
      width,
      setMoviesToRender,
      moviesFilter,
      shortMoviesFilter,
      calculateMoviesToRender
    )
  }

  useEffect(() => {
    const storedSearchInput = localStorage.getItem('searchInputValue')
    if (storedSearchInput) {
      setSearchInputValue(storedSearchInput)
      loadMovies()
    }
  }, [])

  useEffect(() => {
    const filteredList = handleMoviesFiltering()
    setFilteredMovies(filteredList)
  }, [searchInputValue, allMovies, shortFilmFilter, width])

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm
          onSearch={handleSearchMovies}
          shortFilmFilter={shortFilmFilter}
          setShortFilmFilter={setShortFilmFilter}
          localStorageKey={'searchInputValue'}
        />
        <section className="movies__container">
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
                  {searchInputValue === '' ? (
                    <>
                      <p className="movies__text">
                        Введите в поиск название фильма
                      </p>
                    </>
                  ) : (
                    <>
                      {listMovies > 0 ? (
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
                          {listMovies > 0 &&
                            listMovies < filteredMovies.length && (
                              <button
                                className="movies__button"
                                onClick={handleAddMovies}
                              >
                                Ещё
                              </button>
                            )}
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

export default Movies
