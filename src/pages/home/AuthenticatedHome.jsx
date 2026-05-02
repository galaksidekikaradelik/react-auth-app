import { Link } from 'react-router-dom'
import { useUserProfile }  from '../../features/profile/hooks/useUserProfile'
import { useMyPosts }      from '../../features/posts/hooks/useMyPosts'

function Skeleton({ width = '100%', height = 16, radius = 8, style = {} }) {
  return (
    <div
      className="skeleton-line"
      style={{ width, height, borderRadius: radius, ...style }}
    />
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function AuthenticatedHome() {
  const { profile, initials, displayName } = useUserProfile()
  const { posts, isLoading: postsLoading } = useMyPosts()

  const latestPosts = posts.slice(0, 3)
  const greeting    = getGreeting()

  return (
    <div className="fade-in">
      {/* Welcome card */}
      <div className="home-welcome-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="home-avatar" aria-hidden="true">{initials}</div>
          <div>
            <p className="home-greeting">{greeting}</p>
            <h2 className="home-welcome-name">Welcome back, {displayName} 👋</h2>
            <p className="home-welcome-email">{profile?.email}</p>
          </div>
        </div>
        <span className="profile-badge" style={{ flexShrink: 0 }}>
          <span className="badge-dot" aria-hidden="true" />
          Active
        </span>
      </div>

      {/* Stats */}
      <div className="home-stats-row" role="list">
        <div className="home-stat-card stagger-1" role="listitem">
          <div className="home-stat-icon" aria-hidden="true">👤</div>
          <div className="home-stat-num">{displayName.slice(0, 8)}</div>
          <div className="home-stat-label">Your profile</div>
        </div>
        <div className="home-stat-card stagger-2" role="listitem">
          <div className="home-stat-icon" aria-hidden="true">📝</div>
          <div className="home-stat-num">{postsLoading ? '—' : posts.length}</div>
          <div className="home-stat-label">Total posts</div>
        </div>
        <div className="home-stat-card stagger-3" role="listitem">
          <div className="home-stat-icon" aria-hidden="true">⚙️</div>
          <div className="home-stat-num">1</div>
          <div className="home-stat-label">Account active</div>
        </div>
      </div>

      {/* Quick actions */}
      <nav aria-label="Quick actions">
        <p className="home-section-title">Quick Actions</p>
        <div className="home-quick-actions">
          <Link to="/profile" className="home-action-btn primary">👤 View Profile</Link>
          <Link to="/myposts" className="home-action-btn">📝 My Posts</Link>
          <Link to="/setting" className="home-action-btn">⚙️ Settings</Link>
        </div>
      </nav>

      {/* Latest posts */}
      {postsLoading ? (
        <section aria-label="Loading latest posts" aria-busy="true">
          <p className="home-section-title">Latest Posts</p>
          <div className="posts-preview-grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="post-card" style={{ pointerEvents: 'none' }}>
                <Skeleton width={60}   height={10} radius={4} style={{ marginBottom: 10 }} />
                <Skeleton width="85%"  height={14} radius={4} style={{ marginBottom: 8 }}  />
                <Skeleton width="100%" height={10} radius={4} style={{ marginBottom: 6 }}  />
                <Skeleton width="80%"  height={10} radius={4} />
              </div>
            ))}
          </div>
        </section>
      ) : latestPosts.length > 0 ? (
        <section aria-label="Latest posts">
          <p className="home-section-title">Latest Posts</p>
          <div className="posts-preview-grid">
            {latestPosts.map((post, i) => (
              <Link
                key={post.id}
                to={`/myposts/${post.id}`}
                className="post-card fade-in"
                style={{ animationDelay: `${(i + 3) * 0.08}s` }}
              >
                <div className="post-card-id">Post #{post.id}</div>
                <div className="post-card-title">{post.title}</div>
                <div className="post-card-body">{post.body}</div>
              </Link>
            ))}
          </div>
          {posts.length > 3 && (
            <Link to="/myposts" className="posts-view-all">
              View all {posts.length} posts →
            </Link>
          )}
        </section>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: 10 }} aria-hidden="true">📭</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No posts yet.</p>
        </div>
      )}
    </div>
  )
}