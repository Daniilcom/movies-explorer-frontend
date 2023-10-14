import { React, useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import useLocalStorage from '../../hooks/useLocalStorage'
import './App.css'
import mainApi from '../../utils/MainApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Auth from '../Auth/Auth'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import NotFound from '../NotFound/NotFound'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useLocalStorage('savedMovies', [])
  const [isError, setIsError] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname

  const handleSavedMovies = async (data) => {
    try {
      const result = await mainApi.saveMovie(data)
      const newMovies = [...savedMovies, result]
      setSavedMovies(newMovies)
      localStorage.setItem('savedMovies', JSON.stringify(newMovies))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletedMovies = async (id) => {
    try {
      await mainApi.deleteMovie(id)
      const index = savedMovies.findIndex((movie) => movie._id === id)
      if (index !== -1) {
        const updatedSavedMovies = [...savedMovies]
        updatedSavedMovies.splice(index, 1)
        setSavedMovies(updatedSavedMovies)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await mainApi.checkToken()
        setIsLoggedIn(true)
        setCurrentUser(data)
        navigate(currentPath)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const userData = await mainApi.getUser()
          setCurrentUser(userData)
        } catch (err) {
          console.error(err)
        }
      }

      fetchData()

      const fetchSavedMovies = async () => {
        try {
          const savedMovieData = await mainApi.getSavedMovies()
          setSavedMovies(savedMovieData)
        } catch (err) {
          console.log(err)
        }
      }

      fetchSavedMovies()
    }
  }, [isLoggedIn])

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                isLoggedIn={setIsLoggedIn}
                setSavedMovies={setSavedMovies}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Auth
                isLoggedIn={setIsLoggedIn}
                currentUser={setCurrentUser}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Auth
                isLoggedIn={setIsLoggedIn}
                currentUser={setCurrentUser}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={
                  <Movies
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    onSave={handleSavedMovies}
                    onDelete={handleDeletedMovies}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
                }
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={
                  <SavedMovies
                    onSave={handleSavedMovies}
                    onDelete={handleDeletedMovies}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    isError={isError}
                    setIsError={setIsError}
                  />
                }
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
