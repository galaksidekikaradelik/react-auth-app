import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../store/AuthContext'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext()
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}

export function GuestOnlyRoute() {
  const { isAuthenticated } = useAuthContext()
  const location = useLocation()
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/profile'
    return <Navigate to={from} replace />
  }
  return <Outlet />
}