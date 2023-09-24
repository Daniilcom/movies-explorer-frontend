import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import './Profile.css'

import Header from '../Header/Header'

const Profile = (props) => {
  const navigate = useNavigate()
  const { values, valid, handleChange, error } = useForm()
  const [edit, setEdit] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    props.isLoggedIn(false)
    navigate('/')
  }

  function handleEdit() {
    setEdit(!edit)
  }
  return (
    <div>
      <Header />
      <main className="profile">
        <section className="profile__section">
          <h1 className="profile__title">Привет, Даниил!</h1>
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
                  error.name ? 'profile__user_error' : ''
                }`}
                name="name"
                id="name"
                type="text"
                minLength="2"
                maxLength="40"
                required
                placeholder="Даниил"
                onChange={handleChange}
                value={values.name || ''}
                disabled={edit ? false : true}
              />
            </fieldset>
            <fieldset className="profile__fieldset profile__fieldset_form">
              <label className="profile__label" htmlFor="email">
                E-mail
              </label>
              <input
                className={`profile__input ${
                  error.name ? 'profile__user_error' : ''
                }`}
                name="email"
                id="email"
                type="email"
                minLength="6"
                maxLength="40"
                required
                placeholder="pochta@yandex.ru"
                onChange={handleChange}
                value={values.email || ''}
                disabled={edit ? false : true}
              />
            </fieldset>
            {edit && (
              <button
                className="profile__save"
                type="submit"
                disabled={valid ? false : true}
              >
                Сохранить
              </button>
            )}
            {edit ? (
              ''
            ) : (
              <>
                <button
                  className="profile__edit"
                  type="button"
                  onClick={handleEdit}
                >
                  Редактировать
                </button>
                <button type="submit" className="profile__exit">
                  Выйти из аккаунта
                </button>
              </>
            )}
            {/* {!valid ? (
              <>
                {edit ? (
                  <span id="name-error" className="profile__error">
                    При обновлении профиля произошла ошибка.
                  </span>
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )} */}
          </form>
        </section>
      </main>
    </div>
  )
}

export default Profile
