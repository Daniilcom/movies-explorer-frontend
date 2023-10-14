import { React, useEffect } from 'react'
import './Login.css'
import WelcomeAuth from '../WelcomeAuth/WelcomeAuth'
import SubmitAuth from '../SubmitAuth/SubmitAuth'
import InputAuth from '../InputAuth/InputAuth'

const Login = (props) => {
  const {
    activeField,
    values,
    setValues,
    errors,
    setErrors,
    isValid,
    setIsValid,
    handleChange,
    onLogin,
    handleFocus,
    handleBlur,
    isErrorRes,
    setIsErrorRes,
    errorColor,
    setErrorColor,
  } = props

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    if (isValid) {
      onLogin(values)
    }
  }

  useEffect(() => {
    return () => {
      setIsValid(false)
      setValues({})
      setErrors({})
      setIsErrorRes(null)
      setErrorColor(null)
    }
  }, [])

  return (
    <section className="login">
      <WelcomeAuth text="Рады видеть!" />
      <form className="login__form" onSubmit={handleSubmitLogin}>
        <div className="login__input">
          <InputAuth
            useInput="email"
            typeInput="email"
            label="Email"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
            value={values.email}
            onActiveField={activeField}
            error={errors}
            errorColor={errorColor}
          />
        </div>
        <div className="login__input">
          <InputAuth
            useInput="password"
            typeInput="password"
            label="Пароль"
            minLength="8"
            onChange={handleChange}
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            value={values.password}
            onActiveField={activeField}
            error={errors}
            errorColor={errorColor}
          />
        </div>
        <SubmitAuth
          className="login__submit"
          path="/signup"
          buttonText="Войти"
          authText="Ещё не зарегистрированы?"
          linkText="Регистрация"
          isValid={isValid}
        />
      </form>
      {isErrorRes && (
        <span className="login__error">
          {`Что-то пошло не так... ${isErrorRes}`}
        </span>
      )}
    </section>
  )
}

export default Login
