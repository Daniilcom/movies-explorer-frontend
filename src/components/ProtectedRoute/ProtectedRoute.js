import * as React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ isLoggedIn, element }) => {
  return isLoggedIn ? element : <Navigate to="/signup" replace />
}

export default ProtectedRoute
