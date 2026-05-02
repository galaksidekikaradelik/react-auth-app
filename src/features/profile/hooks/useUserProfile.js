import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthContext } from '../../../store/AuthContext'
import { userApi } from '../../../api/user.api'

export const PROFILE_QUERY_KEY = ['profile']

export function useUserProfile() {
  const { user, updateUser } = useAuthContext()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const res = await userApi.me()
      return res.data
    },
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (data?.user) updateUser(data.user)
  }, [data, updateUser])

  const profile = data?.user || user

  const initials = profile?.username
    ? profile.username.slice(0, 2).toUpperCase()
    : profile?.email?.slice(0, 2).toUpperCase() || '??'

  const displayName =
    profile?.username ||
    profile?.name ||
    profile?.email?.split('@')[0] ||
    'User'

  return { profile, initials, displayName, isLoading, isError, error }
}