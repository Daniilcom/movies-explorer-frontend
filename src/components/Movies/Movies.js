import { React, useState } from 'react'
import './Movies.css'
import Header from '../Header/Header'
import SearchForm from './SearchForm/SearchForm'
import Footer from '../Footer/Footer'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import Preloader from '../Preloader/Preloader'
import data from '../../utils/moviesArr'

const Movies = () => {
  const [moviesList, setMoviesList] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  console.log(setMoviesList)
  console.log(setIsLoading)

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        <section className="movies__container">
          {isLoading ? (
            <div className="movies__preloader">
              <Preloader />
            </div>
          ) : (
            <>
              {moviesList ? (
                <>
                  <MoviesCardList list={data} />
                  <button className="movies__button">Ещё</button>
                </>
              ) : (
                <p className="movies__text">Фильмы не найдены</p>
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
