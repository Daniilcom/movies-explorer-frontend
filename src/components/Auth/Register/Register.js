import { React, useState } from 'react'
import './Register.css'
import WelcomeAuth from '../WelcomeAuth/WelcomeAuth'
import SubmitAuth from '../SubmitAuth/SubmitAuth'
import InputAuth from '../InputAuth/InputAuth'

const Register = () => {
  const [isActiveError, setIsActiveError] = useState(true)
  console.log(setIsActiveError)

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <section className="register">
      <WelcomeAuth text="Добро пожаловать!" />
      <form className="register__form">
        <InputAuth
          useInput="name"
          typeInput="text"
          label="Имя"
          minLength="2"
          maxLength="40"
        />
        <InputAuth
          useInput="email"
          typeInput="email"
          label="Email"
          minLength="2"
          maxLength="40"
        />
        <InputAuth
          className={`${isActiveError ? 'register__input-error' : ''}`}
          useInput="password"
          typeInput="password"
          label="Пароль"
          minLength="8"
          onActiveError={isActiveError}
        />
        <SubmitAuth
          onSubmit={handleSubmit}
          className="register__submit"
          path="/signin"
          buttonText="Зарегистрироваться"
          authText="Уже зарегистрированы?"
          linkText="Войти"
        />
      </form>
    </section>
  )
}

export default Register
