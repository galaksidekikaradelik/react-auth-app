import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { Header } from './Header'

export function PublicLayout() {
  const location = useLocation()
  const mainRef  = useRef(null)

  useEffect(() => {
    mainRef.current?.focus()
  }, [location.pathname])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="main-content"
        aria-label="Main content"
        style={{ outline: 'none' }}
      >
        <div className="container"><Outlet /></div>
      </main>
    </>
  )
}