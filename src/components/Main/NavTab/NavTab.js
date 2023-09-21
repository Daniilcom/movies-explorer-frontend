import React from 'react'
import { Link } from 'react-scroll'
import './NavTab.css'

const NavTab = () => {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__links">
        <li className="nav-tab__list-item">
          <Link
            className="nav-tab__link"
            to="about-project"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            О проекте
          </Link>
        </li>
        <li className="nav-tab__list-item">
          <Link
            className="nav-tab__link"
            to="techs"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            Технологии
          </Link>
        </li>
        <li className="nav-tab__list-item">
          <Link
            className="nav-tab__link"
            to="about-me"
            spy={true}
            smooth={true}
            offset={-40}
            duration={500}
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavTab
