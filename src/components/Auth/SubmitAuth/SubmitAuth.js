import React from 'react'
import { Link } from 'react-router-dom'
import './SubmitAuth.css'

const SubmitAuth = (props) => {
  const { className, isValid, buttonText, authText, path, linkText } = props
  return (
    <div className={`submit ${className}`}>
      <button type="submit" className="submit__button" disabled={!isValid}>
        {buttonText}
      </button>
      <div className="submit__text-container">
        <p className="submit__text">{authText}</p>
        <Link to={path} className="submit__login-link">
          &nbsp;{linkText}
        </Link>
      </div>
    </div>
  )
}

export default SubmitAuth
