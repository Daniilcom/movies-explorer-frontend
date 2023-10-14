import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../images/icons/logo.svg'
import './WelcomeAuth.css'

const WelcomeAuth = (props) => {
  const { text } = props
  return (
    <div className="welcome">
      <div className="welcome__container">
        <Link to="/">
          <img className="welcome__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="welcome__header">{text}</h1>
      </div>
    </div>
  )
}

export default WelcomeAuth
