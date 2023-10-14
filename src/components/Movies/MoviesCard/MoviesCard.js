import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { saveItem } from '../../../utils/halpers'
import './MoviesCard.css'
import remove from '../../../images/icons/remove.svg'

function MoviesCard({ movie, onSave, onDelete, setSavedMovies, savedMovies }) {
  const [isSaved, setIsSaved] = useState(false)

  const location = useLocation()
  const handlePath = (path) => location.pathname === path

  useEffect(() => {
    const isMovieInSaved = savedMovies.some(
      (savedMovie) => savedMovie.nameRU === movie.nameRU
    )
    setIsSaved(isMovieInSaved)
  }, [savedMovies, movie.nameRU])

  const handleSave = () => {
    const movieItem = saveItem(movie)
    if (isSaved) {
      handleDelete()
    } else {
      onSave(movieItem)
      setSavedMovies([...savedMovies, movieItem])
    }
  }

  const handleDelete = () => {
    const id = savedMovies
      .filter((savedMovie) => savedMovie.nameRU === movie.nameRU)
      .map((savedMovie) => savedMovie._id)[0]
    onDelete(id)
    setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== id))
  }

  return (
    <div className="card">
      <a target="blank" href={movie.trailerLink}>
        <img
          className="card__img"
          alt={movie.nameRU}
          src={
            handlePath('/movies')
              ? 'https://api.nomoreparties.co/' + movie.image.url
              : movie.image
          }
        />
      </a>
      <div className="card__description">
        <h2 title={movie.nameRU} className="card__title">
          {movie.nameRU}
        </h2>
        {handlePath('/movies') ? (
          <button
            onClick={handleSave}
            type="button"
            className={`card__like-button ${
              isSaved ? 'card__like-button_active' : ''
            }`}
          ></button>
        ) : (
          <button className="card__remove-button" onClick={handleDelete}>
            <img src={remove} alt="Удалить" />
          </button>
        )}
        <p className="card__duration">
          {movie.duration > 60
            ? `${Math.floor(movie.duration / 60)}ч${movie.duration % 60}м`
            : `${movie.duration}м`}
        </p>
      </div>
    </div>
  )
}
export default MoviesCard
