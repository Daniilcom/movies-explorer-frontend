import { React, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useValidation from '../../hooks/useValidation'
import './Auth.css'
import Register from '../Auth/Register/Register'
import Login from '../Auth/Login/Login'
import mainApi from '../../utils/MainApi'

const Auth = (props) => {
  const { setIsLoading, isLoggedIn, currentUser } = props
  const [activeField, setActiveField] = useState(null)
  const [isErrorRes, setIsErrorRes] = useState(null)
  const [errorColor, setErrorColor] = useState(null)
  const {
    values,
    setValues,
    errors,
    setErrors,
    isValid,
    setIsValid,
    handleChange,
  } = useValidation()

  const location = useLocation()
  const navigate = useNavigate()
  const handlePath = (path) => location.pathname === path

  const handleRegistration = async ({ email, password, name }) => {
    try {
      setIsLoading(true)
      const data = await mainApi.createUser({ email, password, name })
      isLoggedIn(true)
      currentUser(data)
      await handleLogin({ email, password })
    } catch (err) {
      console.error(err)
      setIsErrorRes(err)
      setErrorColor(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async ({ email, password }) => {
    try {
      setIsLoading(true)
      const data = await mainApi.login({ email, password })
      currentUser(data)
      isLoggedIn(true)
      localStorage.setItem('currentUserData', JSON.stringify(data))
      navigate('/movies')
    } catch (err) {
      console.error(err)
      setIsErrorRes(err)
      setErrorColor(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitRegistration = (e) => {
    e.preventDefault()
    if (isValid) {
      handleRegistration(values)
    }
  }

  const handleFocus = (field) => {
    setActiveField(field)
    setIsErrorRes(false)
    setErrorColor(false)
  }

  const handleBlur = () => {
    setActiveField(null)
  }

  return (
    <main className="auth">
      <div className="auth__container">
        {handlePath('/signup') ? (
          <Register
            activeField={activeField}
            setActiveField={setActiveField}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
            isValid={isValid}
            setIsValid={setIsValid}
            handleChange={handleChange}
            handleSubmit={handleSubmitRegistration}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isErrorRes={isErrorRes}
            setIsErrorRes={setIsErrorRes}
            errorColor={errorColor}
            setErrorColor={setErrorColor}
          />
        ) : (
          <Login
            activeField={activeField}
            setActiveField={setActiveField}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
            isValid={isValid}
            setIsValid={setIsValid}
            handleChange={handleChange}
            onLogin={handleLogin}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isErrorRes={isErrorRes}
            setIsErrorRes={setIsErrorRes}
            errorColor={errorColor}
            setErrorColor={setErrorColor}
          />
        )}
      </div>
    </main>
  )
}

export default Auth
