import { useState, useCallback } from 'react'
import { authService } from '../../../services/auth.service'

export function useAuth() {
  const [user, setUser] = useState(null)

  const [token, setToken] = useState(() => {
    if (authService.isExpired()) {
      authService.clearAuth()
      return null
    }
    return authService.getToken()
  })

  const isAuthenticated = !!token

  const login = useCallback((userData, authToken) => {
    authService.setToken(authToken)
    setToken(authToken)
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    authService.clearAuth()
    setToken(null)
    setUser(null)
  }, [])

  const updateUser = useCallback((updated) => {
    setUser(updated)
  }, [])

  return { user, isAuthenticated, login, logout, updateUser }
}