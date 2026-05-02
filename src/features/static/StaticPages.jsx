// src/features/static/StaticPages.jsx
import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: '🔐', category: 'Authentication', title: 'Secure Login & Registration',   desc: 'JWT-based auth with token persistence. Every request is signed via Axios interceptors.' },
  { icon: '🛡️', category: 'Routing',        title: 'Three-tier Route Protection',  desc: 'Public, Guest-only, and Protected routes. No unauthorized access.' },
  { icon: '📝', category: 'Posts',          title: 'Personal Posts Management',     desc: 'Each user has their own post collection with dynamic routing (/myposts/:id).' },
  { icon: '⚙️', category: 'Settings',       title: 'Account Management',           desc: 'Update name, email, or password. Changes sync instantly to local state and server cache.' },
  { icon: '✅', category: 'Validation',     title: 'Schema-based Form Validation', desc: 'Every input validated with Zod schemas. React Hook Form handles field state.' },
  { icon: '⚡', category: 'Data Layer',     title: 'Smart Server State',           desc: 'TanStack Query manages all API calls with caching, background refetching, and stale-time.' },
]

const STACK = [
  { name: 'React 18',          role: 'UI library' },
  { name: 'React Router v6',   role: 'Client-side routing' },
  { name: 'TanStack Query v5', role: 'Server state management' },
  { name: 'React Hook Form',   role: 'Form state' },
  { name: 'Zod',               role: 'Schema validation' },
  { name: 'Axios',             role: 'HTTP client' },
]

const META = [
  { label: 'Type',     value: 'Web Application' },
  { label: 'Audience', value: 'End Users' },
  { label: 'Auth',     value: 'JWT / Bearer' },
  { label: 'API',      value: 'REST' },
]

export function AboutPage() {
  return (
    <div className="fade-in">

      <div className="about-hero">
        <div className="about-eyebrow">
          <span className="badge-dot" style={{ animation: 'pulse 2s infinite' }} aria-hidden="true" />
          Production Ready
        </div>
        <h1 className="about-title">
          A platform built for<br /><em>real users</em>
        </h1>
        <p className="about-lead">
          A full-stack-ready authentication and content platform solving the most common
          pain points — secure access control, reliable data fetching, and clean account management.
        </p>
        <div className="about-meta-row">
          {META.map(({ label, value }) => (
            <div key={label} className="about-meta-item">
              <span className="about-meta-label">{label}</span>
              <span className="about-meta-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="about-features-section" aria-label="Platform features">
        <div className="about-section-label">Platform Features</div>
        <div className="about-features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="about-feature-card"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="about-feature-icon" aria-hidden="true">{f.icon}</div>
              <div className="about-feature-category">{f.category}</div>
              <div className="about-feature-title">{f.title}</div>
              <p className="about-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-stack-section" aria-label="Tech stack">
        <div className="about-section-label">Tech Stack</div>
        <div className="about-stack-grid">
          {STACK.map((s, i) => (
            <div
              key={s.name}
              className="about-stack-item"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="about-stack-name">{s.name}</div>
              <div className="about-stack-role">{s.role}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="about-cta">
        <div className="about-cta-title">Ready to get started?</div>
        <p className="about-cta-desc">
          Create your account and explore the platform in under a minute.
        </p>
        <div className="about-cta-actions">
          <Link to="/register" className="btn btn-primary" style={{ width: 'auto' }}>
            Create Account →
          </Link>
          <Link to="/login" className="btn btn-secondary">Sign In</Link>
        </div>
      </div>

    </div>
  )
}

export function ContactPage() {
  const docsUrl = 'https://front-task-y34u.onrender.com/api-docs/'

  return (
    <div className="fade-in">
      <div className="page-header">
        <span className="page-tag">Contact</span>
        <h1 className="page-title">Get in touch</h1>
        <p className="page-subtitle">
          This is a public page — visible to everyone regardless of auth status.
        </p>
      </div>
      <div className="card">
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          For questions or support, reach out via the API documentation at{' '}
          <a href={docsUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
            front-task-y34u.onrender.com/api-docs/
          </a>
        </p>
      </div>
    </div>
  )
}