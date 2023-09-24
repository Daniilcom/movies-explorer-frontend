import { React, useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navigation.css'
import burgerMenuWhite from '../../images/icons/burger-menu__white.svg'
import burgerMenuBlack from '../../images/icons/burger-menu__black.svg'
import close from '../../images/icons/burger-menu__close.svg'

const Navigation = () => {
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const [hideFirstItem, setHideFirstItem] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setHideFirstItem(true)
      } else {
        setHideFirstItem(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleMenuShow() {
    setShowMenu(!showMenu)
  }

  function handleLinkColor() {
    if (location.pathname === '/') {
      return 'navigation__link'
    }
    return 'navigation__link navigation__link_black'
  }

  const linkActive = handleLinkColor() + ' navigation__link-active'
  const link = handleLinkColor()

  function handleMenuColor() {
    if (location.pathname === '/') {
      return burgerMenuWhite
    }
    return burgerMenuBlack
  }

  const burgerMenu = handleMenuColor()

  return (
    <nav className="navigation">
      <div className={showMenu ? 'overlay' : 'overlay hidden'}>
        <ul
          className={
            showMenu
              ? 'navigation__list navigation__list-active'
              : 'navigation__list'
          }
        >
          {!hideFirstItem && (
            <li
              className={
                showMenu
                  ? 'navigation__item'
                  : 'navigation__item navigation__item_hidden'
              }
            >
              <NavLink
                className={({ isActive }) => (isActive ? linkActive : link)}
                to="/"
              >
                Главная
              </NavLink>
            </li>
          )}
          <li className="navigation__item">
            <NavLink
              className={({ isActive }) => (isActive ? linkActive : link)}
              to="/movies"
            >
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              className={({ isActive }) => (isActive ? linkActive : link)}
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <div className="navigation__account">
            <NavLink className="navigation__link-account" to="/profile">
              Аккаунт
            </NavLink>
          </div>
        </ul>
      </div>
      <div className="navigation__burger" onClick={handleMenuShow}>
        {showMenu ? (
          <img
            className="navigation__close-icon navigation__icon-activ"
            src={close}
            alt="Закрыть"
          />
        ) : (
          <img
            className="navigation__burger-icon navigation__icon-activ"
            src={burgerMenu}
            alt="Меню"
          />
        )}
      </div>
    </nav>
  )
}

export default Navigation
