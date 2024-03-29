import { React, useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import logo from '../../images/icons/logo.svg'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import Navigation from '../Navigation/Navigation'

const Header = () => {
  const currentUser = useContext(CurrentUserContext)

  const location = useLocation()
  const handlePath = (path) => location.pathname === path

  return (
    <>
      {/* {currentUser.isLoggedIn === null ? (
        <></>
      ) : ( */}
      <header className={handlePath('/') ? 'header' : 'header header_white'}>
        <div className="header__container">
          <Link className="header__logo-link" to="/">
            <img src={logo} alt="Логотип проекта" className="header__logo" />
          </Link>
          <div className="header__auth">
            {currentUser.isLoggedIn ? (
              <>
                <Navigation />
              </>
            ) : (
              <>
                <Link to="/signup" className="header__signup">
                  Регистрация
                </Link>
                <Link to="/signin" className="header__signin">
                  Войти
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      {/* )} */}
    </>
  )
}

export default Header
