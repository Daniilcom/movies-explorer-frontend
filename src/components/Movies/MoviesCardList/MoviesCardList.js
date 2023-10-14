import { React, useEffect, useRef } from 'react'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {
  const {
    movies,
    onSave,
    onDelete,
    savedMovies,
    setSavedMovies,
    setWidth,
    onMoviesFiltering,
    searchInputValue,
  } = props

  const resizeTimeoutId = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(resizeTimeoutId.current)

      resizeTimeoutId.current = setTimeout(() => {
        setWidth(window.innerWidth)
        onMoviesFiltering()
      }, 300)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeoutId)
    }
  }, [movies, searchInputValue])

  return (
    <div className="cardlist">
      <ul className="cardlist__items">
        {movies?.map((movie) => (
          <li key={movie.id || movie._id} className="cardlist__item">
            <MoviesCard
              movie={movie}
              onSave={onSave}
              onDelete={onDelete}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MoviesCardList
