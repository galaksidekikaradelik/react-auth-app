import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../store/AuthContext'

export function Header() {
  const { isAuthenticated, logout } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinkClass  = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`
  const ariaCurrent   = ({ isActive }) => (isActive ? 'page' : undefined)

  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="header-logo" aria-label="auth.app — go to home">
            auth<span aria-hidden="true">.</span>app
          </Link>

          <nav className="header-nav" aria-label="Main navigation">
            <NavLink to="/"       end className={navLinkClass} aria-current={ariaCurrent}>Home</NavLink>
            <NavLink to="/about"      className={navLinkClass} aria-current={ariaCurrent}>About</NavLink>
            <NavLink to="/contact"    className={navLinkClass} aria-current={ariaCurrent}>Contact</NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to="/profile"  className={navLinkClass} aria-current={ariaCurrent}>Profile</NavLink>
                <NavLink to="/setting"  className={navLinkClass} aria-current={ariaCurrent}>Settings</NavLink>
                <NavLink to="/myposts"  className={navLinkClass} aria-current={ariaCurrent}>My Posts</NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="nav-btn outline"
                  aria-label="Log out of your account"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"    className="nav-btn outline">Login</Link>
                <Link to="/register" className="nav-btn">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}