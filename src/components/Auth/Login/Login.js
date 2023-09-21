import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import WelcomeAuth from '../WelcomeAuth/WelcomeAuth'
import SubmitAuth from '../SubmitAuth/SubmitAuth'
import InputAuth from '../InputAuth/InputAuth'

const Login = (props) => {
  const [isActiveError, setIsActiveError] = useState(false)
  console.log(setIsActiveError)

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    props.isLoggedIn(true)
    navigate('/')
  }
  return (
    <div className="login">
      <WelcomeAuth text="Рады видеть!" />
      <form className="login__form" onSubmit={handleSubmit}>
        <InputAuth
          useInput="email"
          typeInput="email"
          label="Email"
          minLength="2"
          maxLength="40"
        />
        <InputAuth
          className={`${isActiveError ? 'login__input-error' : ''}`}
          useInput="password"
          typeInput="password"
          label="Пароль"
          minLength="8"
          onActiveError={isActiveError}
        />
        <SubmitAuth
          className="login__submit"
          path="/signup"
          buttonText="Войти"
          authText="Ещё не зарегистрированы?"
          linkText="Регистрация"
        />
      </form>
    </div>
  )
}

export default Login
