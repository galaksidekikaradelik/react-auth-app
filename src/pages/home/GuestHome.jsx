import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: '🔐', title: 'Auth Guards',    desc: 'Public, Guest-only & Protected routes out of the box',         delay: '0.1s' },
  { icon: '✅', title: 'Zod Validation', desc: 'Schema-based validation on every form field',                   delay: '0.2s' },
  { icon: '⚡', title: 'TanStack Query', desc: 'Smart server state, caching & background refetch',              delay: '0.3s' },
  { icon: '🎨', title: 'Rose Palette',   desc: 'Consistent design system with CSS variables',                   delay: '0.4s' },
]

export function GuestHome() {
  return (
    <div className="fade-in">
      <div className="hero">
        <div className="hero-eyebrow">
          <span className="hero-dot" aria-hidden="true" />
          React Auth App
        </div>
        <h1 className="hero-title">
          <span className="hero-word">Build with</span>
          <br />
          <em>confidence</em>
        </h1>
        <p className="hero-subtitle">
          A fully-featured authentication system with protected routes,
          TanStack Query, React Hook Form, and Zod validation — all wired and ready to go.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary" style={{ width: 'auto' }}>
            Get Started →
          </Link>
          <Link to="/login" className="btn btn-secondary">Sign In</Link>
        </div>
      </div>

      <div className="guest-features-grid" role="list">
        {FEATURES.map(({ icon, title, desc, delay }) => (
          <div
            key={title}
            className="guest-feature-card"
            style={{ animationDelay: delay }}
            role="listitem"
          >
            <div className="guest-feature-icon" aria-hidden="true">{icon}</div>
            <div className="guest-feature-title">{title}</div>
            <div className="guest-feature-desc">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}