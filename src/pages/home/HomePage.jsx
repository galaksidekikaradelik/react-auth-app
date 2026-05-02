import { useQuery }        from '@tanstack/react-query'
import { useAuthContext }  from '../../store/AuthContext'
import { userApi }         from '../../api/user.api'
import { AuthenticatedHome } from './AuthenticatedHome'
import { GuestHome }         from './GuestHome'
import { DashboardSkeleton } from './DashboardSkeleton'

export function HomePage() {
  const { isAuthenticated, user } = useAuthContext()

  const { isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await userApi.me()
      return res.data
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  })

  if (isAuthenticated && profileLoading && !user) {
    return <DashboardSkeleton />
  }

  return isAuthenticated ? <AuthenticatedHome /> : <GuestHome />
}