export function readingTime(text = '') {
  const words = text.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

export function postNumber(id) {
  return String(id).padStart(2, '0')
}

export function getInitials(profile) {
  return profile?.username
    ? profile.username.slice(0, 2).toUpperCase()
    : profile?.email?.slice(0, 2).toUpperCase() || '??'
}

export function getDisplayName(profile) {
  return (
    profile?.username ||
    profile?.name ||
    profile?.email?.split('@')[0] ||
    'User'
  )
}