const TOKEN_KEY   = 'token'
const EXPIRES_KEY = 'expiresAt'
const TOKEN_TTL   = 1000 * 60 * 60 * 24 // 24 hours

export const authService = {
  setToken(token) {
    const expiresAt = Date.now() + TOKEN_TTL
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(EXPIRES_KEY, String(expiresAt))
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  isExpired() {
    const expiresAt = localStorage.getItem(EXPIRES_KEY)
    if (!expiresAt) return true
    return Date.now() > Number(expiresAt)
  },

  clearAuth() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(EXPIRES_KEY)
  },
}