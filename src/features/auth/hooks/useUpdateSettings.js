import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '../../../store/AuthContext'
import { updateSettingsRequest } from '../../../services/settings.service'

export function useUpdateSettings({ onSuccess } = {}) {
  const { updateUser } = useAuthContext()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSettingsRequest,
    onSuccess: (updated) => {
      if (updated) {
        updateUser(updated)
        queryClient.setQueryData(['profile'], (old) => ({ ...old, user: updated }))
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      onSuccess?.(updated)
    },
  })
}