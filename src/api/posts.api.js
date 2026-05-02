import { api } from './axios'

export const postsApi = {
  getMyPosts:    ()    => api.get('/api/posts/my-posts'),
  getMyPostById: (id)  => api.get(`/api/posts/${id}`),
}