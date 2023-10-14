import { React, useState, useEffect, useRef } from 'react'
import './Movies.css'
import Header from '../Header/Header'
import SearchForm from './SearchForm/SearchForm'
import Footer from '../Footer/Footer'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'

import moviesApi from '../../utils/MoviesApi'

const Movies = () => {
  const [allMovies, setAllMovies] = useState([])
  const [searchInputValue, setSearchInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [width, setWidth] = useState(window.innerWidth)
  const [moviesToRender, setMoviesToRender] = useState([])

  const moviesFilter = (value, movies) => {
    return movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(value.toLowerCase())
    })
  }
  const searchMovies = (inputValue) => {
    if (inputValue !== searchInputValue) {
      localStorage.removeItem('addMovies')
    }
    localStorage.setItem('searchInputValue', inputValue)
    setSearchInputValue(inputValue)
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

  useEffect(() => {
    const storedSearchInput = localStorage.getItem('searchInputValue')
    if (storedSearchInput) {
      setSearchInputValue(storedSearchInput)
      loadMovies()
    }
  }, [])

  useEffect(() => {
    const filteredList = moviesFilter(searchInputValue, allMovies)
    setFilteredMovies(filteredList)
  }, [allMovies, searchInputValue])

  const resizeTimeoutId = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeTimeoutId.current)

      resizeTimeoutId.current = setTimeout(() => {
        setWidth(window.innerWidth)
      }, 300)

      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeoutId)
    }
  }, [])

  useEffect(() => {
    const storedAddMovies = localStorage.getItem('addMovies')
    const parsedAddMovies = JSON.parse(storedAddMovies)
    if (parsedAddMovies !== null && parsedAddMovies.length > 0) {
      setMoviesToRender(parsedAddMovies)
    } else {
      let moviesToRender

      if (width <= 767) {
        moviesToRender = filteredMovies.slice(0, 5)
      } else if (width <= 955) {
        moviesToRender = filteredMovies.slice(0, 8)
      } else if (width < 1280) {
        moviesToRender = filteredMovies.slice(0, 12)
      } else {
        moviesToRender = filteredMovies.slice(0, 16)
      }

      setMoviesToRender(moviesToRender)
      localStorage.setItem('addMovies', JSON.stringify(moviesToRender))
    }
  }, [width, filteredMovies])

  const listMovies = moviesToRender.length

  const handleAddMovies = () => {
    let moviesToAdd

    if (width <= 767) {
      moviesToAdd = filteredMovies.slice(listMovies, listMovies + 2)
    } else if (width <= 955) {
      moviesToAdd = filteredMovies.slice(listMovies, listMovies + 2)
    } else if (width < 1280) {
      moviesToAdd = filteredMovies.slice(listMovies, listMovies + 3)
    } else {
      moviesToAdd = filteredMovies.slice(listMovies, listMovies + 4)
    }

    setMoviesToRender((prevMovies) => [...prevMovies, ...moviesToAdd])
    localStorage.setItem(
      'addMovies',
      JSON.stringify([...moviesToRender, ...moviesToAdd])
    )
  }
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm
          onSearch={searchMovies}
          onSubmit={loadMovies}
          // shortFilmFilter={shortFilmFilter}
          // setShortFilmFilter={setShortFilmFilter}
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
                          <MoviesCardList movies={moviesToRender} />
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
