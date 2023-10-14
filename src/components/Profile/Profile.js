import { React, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import useValidation from '../../hooks/useValidation'
import useLocalStorage from '../../hooks/useLocalStorage'
import './Profile.css'
import mainApi from '../../utils/MainApi'
import Header from '../Header/Header'

const Profile = (props) => {
  const { isLoggedIn, setSavedMovies } = props

  const currentUser = useContext(CurrentUserContext)

  const [updateUser, setUpdateUser] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [isErrorRes, setIsErrorRes] = useState(null)
  const [currentUserContext, setCurrentUserContext] = useLocalStorage(
    'currentUserData',
    {}
  )
  const { values, setValues, isValid, setIsValid, handleChange, errors } =
    useValidation()

  const navigate = useNavigate()

  const handleUpdateUser = async ({ email, name }) => {
    try {
      const data = await mainApi.updateUser({ email, name })
      setUpdateSuccess(true)
      setCurrentUserContext({ ...currentUser, name: name, email: email })
      setUpdateUser(false)
      setIsErrorRes(false)
      localStorage.setItem('currentUserData', JSON.stringify(data))
    } catch (err) {
      console.log(err)
      setIsErrorRes(err)
      setUpdateUser(true)
    }
  }

  const handleLogout = async () => {
    try {
      await mainApi.logout()
      localStorage.clear()
      navigate('/')
      setCurrentUserContext({})
      isLoggedIn(false)
      setIsErrorRes(false)
      setSavedMovies([])
    } catch (err) {
      console.log(err)
      setIsErrorRes(err)
    }
  }

  const onChangeInput = (e) => {
    handleChange(e)
    setIsErrorRes(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdateUser(values)
    setUpdateSuccess(false)
    setIsValid(false)
    setUpdateUser(false)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setUpdateUser(true)
    setUpdateSuccess(false)
  }

  useEffect(() => {
    if (currentUserContext) {
      setValues(currentUserContext)
      setIsValid(true)
    }
  }, [setIsValid, setValues, currentUserContext])

  return (
    <div>
      <Header />
      <main className="profile">
        <section className="profile__section">
          <h1 className="profile__title">Привет, {currentUserContext.name}!</h1>
          <span
            className={`profile__success ${
              updateSuccess && 'profile__success-visible'
            }`}
          >
            Данные обновлены
          </span>
          <form
            className="profile__form"
            onSubmit={handleSubmit}
            name="profile"
          >
            <fieldset className="profile__fieldset">
              <label className="profile__label" htmlFor="name">
                Имя
              </label>
              <input
                className={`profile__input ${
                  errors.name ? 'profile__user_error' : ''
                }`}
                name="name"
                id="name"
                type="text"
                minLength="2"
                maxLength="40"
                required
                placeholder="Введите ваше имя"
                onChange={onChangeInput}
                value={values.name || ''}
                disabled={!updateUser}
              />
            </fieldset>
            <fieldset className="profile__fieldset profile__fieldset_form">
              <label className="profile__label" htmlFor="email">
                E-mail
              </label>
              <input
                className={`profile__input ${
                  errors.name ? 'profile__user_error' : ''
                }`}
                name="email"
                id="email"
                type="email"
                minLength="6"
                maxLength="40"
                required
                placeholder="Введите e-mail в формате pochta@yandex.ru"
                onChange={onChangeInput}
                value={values.email || ''}
                disabled={!updateUser}
              />
            </fieldset>
            {isErrorRes && (
              <span className="profile__error">
                {`Что-то пошло не так... ${isErrorRes}`}
              </span>
            )}
            {updateUser ? (
              <button
                className="profile__save"
                type="submit"
                disabled={
                  !isValid ||
                  (values.name === currentUserContext.name &&
                    values.email === currentUserContext.email)
                }
              >
                Сохранить
              </button>
            ) : (
              <>
                <button
                  className="profile__edit"
                  type="button"
                  onClick={handleEdit}
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  className="profile__exit"
                  onClick={handleLogout}
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
          </form>
        </section>
      </main>
    </div>
  )
}

export default Profile
