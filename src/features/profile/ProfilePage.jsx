import { Link } from 'react-router-dom'
import { useUserProfile } from './hooks/useUserProfile'

export function ProfilePage() {
  const { profile, initials, isLoading, isError, error } = useUserProfile()

  if (isLoading) {
    return (
      <div className="spinner-wrap" aria-busy="true" aria-label="Loading profile">
        <div className="spinner" role="status" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="alert alert-error" role="alert" style={{ marginTop: 40 }}>
        Failed to load profile:{' '}
        {error?.response?.data?.message || 'Something went wrong'}
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <span className="page-tag">Protected Route</span>
        <h1 className="page-title">Your Profile</h1>
      </div>

      <div className="profile-card" role="region" aria-label="Profile summary">
        <div className="profile-avatar" aria-hidden="true">{initials}</div>
        <div className="profile-info">
          <h2>{profile?.username || 'Unknown User'}</h2>
          <p>{profile?.email}</p>
          <span className="profile-badge">
            <span className="badge-dot" aria-hidden="true" />
            Authenticated
          </span>
        </div>
      </div>

      <div className="profile-details-grid">
        <div className="card" role="region" aria-label="Account details">
          <div className="page-tag" style={{ marginBottom: 12 }}>Account</div>
          <dl className="detail-list">
            {profile?.id && (
              <div className="detail-item">
                <dt className="detail-label">User ID</dt>
                <dd className="detail-value detail-value--mono">{profile.id}</dd>
              </div>
            )}
            {profile?.username && (
              <div className="detail-item">
                <dt className="detail-label">Username</dt>
                <dd className="detail-value">{profile.username}</dd>
              </div>
            )}
            <div className="detail-item">
              <dt className="detail-label">Email</dt>
              <dd className="detail-value">{profile?.email}</dd>
            </div>
          </dl>
        </div>

        <nav className="card" aria-label="Quick links">
          <div className="page-tag" style={{ marginBottom: 12 }}>Quick Links</div>
          <div className="quick-links">
            <Link to="/myposts" className="btn btn-secondary quick-link-btn">→ View My Posts</Link>
            <Link to="/setting" className="btn btn-secondary quick-link-btn">→ Update Settings</Link>
          </div>
        </nav>
      </div>
    </div>
  )
}