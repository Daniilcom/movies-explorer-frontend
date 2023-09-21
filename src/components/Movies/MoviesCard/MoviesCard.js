import { React, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import remove from '../../../images/icons/remove.svg'

function MoviesCard(props) {
  const [isLiked, setIsLiked] = useState(false)
  const location = useLocation()

  function handlerLike() {
    setIsLiked(!isLiked)
  }

  return (
    <div className="card">
      <img
        className="card__img"
        alt="33 слова о дизайне"
        src={props.movie.image}
      />
      <div className="card__description">
        <h2 className="card__title">33 слова о дизайне</h2>
        {location.pathname === '/movies' ? (
          <button
            onClick={handlerLike}
            type="button"
            className={`card__like-button ${
              isLiked ? 'card__like-button_active' : ''
            }`}
          ></button>
        ) : (
          <button className="card__remove-button">
            <img src={remove} alt="Удалить" />
          </button>
        )}
        <p className="card__duration">1ч42м</p>
      </div>
    </div>
  )
}
export default MoviesCard
