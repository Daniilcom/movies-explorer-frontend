import { React, useState } from 'react'
import './SavedMovies.css'
import data from '../../utils/moviesArr'

import Header from '../Header/Header'
import SearchForm from '../Movies/SearchForm/SearchForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

const SavedMovies = () => {
  const [hasMovies, setHasMovies] = useState(true)
  console.log(setHasMovies)

  return (
    <div className="saved-movies">
      <Header />
      <SearchForm />
      <div className="saved-movies__container">
        {hasMovies ? (
          <MoviesCardList list={data} />
        ) : (
          <p className="saved-movies__text">Ваш список фильмов пуст</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default SavedMovies
