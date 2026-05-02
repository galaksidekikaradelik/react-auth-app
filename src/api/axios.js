import axios from 'axios'

const BASE_URL = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_URL || 'https://front-task-y34u.onrender.com')

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
})

let _queryClient = null
export function setQueryClient(qc) {
  _queryClient = qc
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('expiresAt')
      if (_queryClient) _queryClient.clear()
      window.location.href = '/login'
    }
    if (err.response?.status === 429) {
      console.warn('Rate limited — slow down requests')
    }
    return Promise.reject(err)
  }
)