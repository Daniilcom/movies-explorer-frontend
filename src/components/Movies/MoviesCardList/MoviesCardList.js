import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {
  const location = useLocation()
  const allMovies = props.list
  const savedMovies = props.list.filter((mov) => mov.isLiked === true)

  function useMovies() {
    if (location.pathname === '/movies') {
      return allMovies
    }
    return savedMovies
  }

  const movies = useMovies()

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  let cardsToRender

  if (width <= 500) {
    cardsToRender = movies.slice(0, 5)
  } else if (width <= 955) {
    cardsToRender = movies.slice(0, 8)
  } else if (width <= 1280) {
    cardsToRender = movies.slice(0, 15)
  } else {
    cardsToRender = movies
  }

  return (
    <div className="cardlist">
      <ul className="cardlist__items">
        {cardsToRender.map((movie) => (
          <li key={movie.id} className="cardlist__item">
            <MoviesCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MoviesCardList
