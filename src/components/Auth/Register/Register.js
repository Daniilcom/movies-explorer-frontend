import { React, useEffect } from 'react'
import './Register.css'
import WelcomeAuth from '../WelcomeAuth/WelcomeAuth'
import SubmitAuth from '../SubmitAuth/SubmitAuth'
import InputAuth from '../InputAuth/InputAuth'

const Register = (props) => {
  const {
    activeField,
    values,
    errors,
    setErrors,
    isValid,
    setValues,
    setIsValid,
    handleChange,
    handleSubmit,
    handleFocus,
    handleBlur,
    isErrorRes,
    setIsErrorRes,
    errorColor,
    setErrorColor,
  } = props

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
    <section className="register">
      <WelcomeAuth text="Добро пожаловать!" />
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__input">
          <InputAuth
            useInput="name"
            typeInput="text"
            label="Имя"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
            value={values.name}
            onActiveField={activeField}
            error={errors}
          />
        </div>
        <div className="register__input">
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
        <div className="register__input">
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
          className="register__submit"
          path="/signin"
          buttonText="Зарегистрироваться"
          authText="Уже зарегистрированы?"
          linkText="Войти"
          isValid={isValid}
        />
      </form>
      {isErrorRes && (
        <span className="register__error">
          {`Что-то пошло не так... ${isErrorRes}`}
        </span>
      )}
    </section>
  )
}

export default Register
