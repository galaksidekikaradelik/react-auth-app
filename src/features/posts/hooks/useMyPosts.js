import { useQuery } from '@tanstack/react-query'
import { postsApi } from '../../../api/posts.api'

export const MY_POSTS_QUERY_KEY = ['my-posts']

export function useMyPosts() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: MY_POSTS_QUERY_KEY,
    queryFn: async () => {
      const res = await postsApi.getMyPosts()
      return res.data
    },
    staleTime: 1000 * 60 * 2,
  })

  const posts = Array.isArray(data) ? data : data?.posts || []
  return { posts, isLoading, isError, error }
}

export function useMyPostDetail(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['my-posts', id],
    queryFn: async () => {
      const res = await postsApi.getMyPostById(id)
      return res.data
    },
    enabled: !!id,
  })

  const { posts } = useMyPosts()
  const currentIndex = posts.findIndex((p) => String(p.id) === String(id))
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null

  const post = data?.post || data
  const paragraphs = (post?.body || '').split(/\n+/).filter(Boolean)

  return { post, paragraphs, prevPost, nextPost, isLoading, isError, error }
}