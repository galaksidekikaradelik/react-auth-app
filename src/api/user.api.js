import { api } from './axios'

export const userApi = {
  me: () => api.get('/api/user/profile'),
}