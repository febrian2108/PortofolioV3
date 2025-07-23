import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/SupabaseContext'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useAuth()
  const location = useLocation()

  useEffect(() => {
    // Redirect admin yang sudah login ke dashboard jika mengakses halaman home
    if (isSignedIn && location.pathname === '/') {
      return <Navigate to="/dashboard" replace />
    }
  }, [isSignedIn, location.pathname])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute


