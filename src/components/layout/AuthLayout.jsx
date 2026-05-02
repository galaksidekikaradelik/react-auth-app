import { Outlet, Link } from 'react-router-dom'

export function AuthLayout() {
  return (
    <>
      <header className="header" role="banner">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="header-logo" aria-label="auth.app home">
              auth<span aria-hidden="true">.</span>app
            </Link>
          </div>
        </div>
      </header>
      <main className="main-content" aria-label="Authentication">
        <Outlet />
      </main>
    </>
  )
}