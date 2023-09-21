import { React } from 'react'
import { useLocation } from 'react-router-dom'
import './Auth.css'
import Register from '../Auth/Register/Register'
import Login from '../Auth/Login/Login'

const Auth = (props) => {
  const location = useLocation()

  return (
    <div className="auth">
      <div className="auth__container">
        {location.pathname === '/signup' ? (
          <Register />
        ) : (
          <Login isLoggedIn={props.isLoggedIn} />
        )}
      </div>
    </div>
  )
}

export default Auth
