import React from 'react'
import { Link } from 'react-router-dom'
import './SubmitAuth.css'

const SubmitAuth = (props) => {
  return (
    <div className={`submit ${props.className}`}>
      <button type="submit" className="submit__button">
        {props.buttonText}
      </button>
      <div className="submit__text-container">
        <p className="submit__text">{props.authText}</p>
        <Link to={props.path} className="submit__login-link">
          &nbsp;{props.linkText}
        </Link>
      </div>
    </div>
  )
}

export default SubmitAuth
