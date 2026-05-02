import { Link, useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="error-page fade-in">
      <div className="error-code">404</div>
      <h2 className="error-message">Page not found</h2>
      <p className="error-desc">
        Belə bir route mövcud deyilsə bu səhifəni görürsünüz.
      </p>
      <Link to="/" className="btn btn-primary" style={{ width: 'auto' }}>
        ← Back to Home
      </Link>
    </div>
  )
}

export function UnauthorizedErrorPage() {
  const navigate = useNavigate()
  return (
    <div className="error-page fade-in">
      <div className="error-code" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>401</div>
      <h2 className="error-message">Access Denied</h2>
      <p className="error-desc">
        İstifadəçi login olunmayıb və login tələb edən səhifəyə daxil olmaq istəyirsə
        bu error səhifəsinə yönləndirilir.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">Go Back</button>
        <Link to="/login" className="btn btn-primary" style={{ width: 'auto' }}>Sign In →</Link>
      </div>
    </div>
  )
}