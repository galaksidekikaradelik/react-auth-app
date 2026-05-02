import { authApi } from '../api/auth.api'

export async function updateSettingsRequest(data) {
  const payload = { name: data.name, email: data.email }
  if (data.newPassword) payload.password = data.newPassword
  const res = await authApi.updateSettings(payload)
  return res.data?.user || res.data
}