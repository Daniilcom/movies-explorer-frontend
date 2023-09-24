import { React, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import './App.css'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Auth from '../Auth/Auth'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import NotFound from '../NotFound/NotFound'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  console.log(isLoggedIn)
  return (
    <CurrentUserContext.Provider value={isLoggedIn}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={<Profile isLoggedIn={setIsLoggedIn} />}
          ></Route>
          <Route path="/signup" element={<Auth />} />
          <Route path="/signin" element={<Auth isLoggedIn={setIsLoggedIn} />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
