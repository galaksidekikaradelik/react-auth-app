import { createBrowserRouter } from 'react-router-dom'
import { PublicLayout }    from '../components/layout/PublicLayout'
import { AuthLayout }      from '../components/layout/AuthLayout'
import { ProtectedLayout } from '../components/layout/ProtectedLayout'
import { ProtectedRoute, GuestOnlyRoute } from './guards'

import { HomePage }         from '../pages/home/HomePage'
import { AboutPage, ContactPage } from '../features/static/StaticPages'
import { LoginPage }        from '../features/auth/LoginPage'
import { RegisterPage }     from '../features/auth/RegisterPage'
import { ProfilePage }      from '../features/profile/ProfilePage'
import { SettingPage }      from '../features/auth/SettingPage'
import { MyPostsPage, MyPostDetailPage } from '../features/posts/MyPostsPage'
import { NotFoundPage, UnauthorizedErrorPage } from '../pages/ErrorPages'

export const router = createBrowserRouter([
  // 1. PUBLIC
  {
    element: <PublicLayout />,
    children: [
      { path: '/',        element: <HomePage /> },
      { path: '/about',   element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },

  // 2. GUEST ONLY
  {
    element: <GuestOnlyRoute />,
    children: [{
      element: <AuthLayout />,
      children: [
        { path: '/login',    element: <LoginPage /> },
        { path: '/register', element: <RegisterPage /> },
      ],
    }],
  },

  // 3. PROTECTED
  {
    element: <ProtectedRoute />,
    children: [{
      element: <ProtectedLayout />,
      children: [
        { path: '/profile',       element: <ProfilePage /> },
        { path: '/setting',       element: <SettingPage /> },
        { path: '/myposts',       element: <MyPostsPage /> },
        { path: '/myposts/:id',   element: <MyPostDetailPage /> },
      ],
    }],
  },

  // 4. ERRORS
  { path: '/unauthorized', element: <UnauthorizedErrorPage /> },
  { path: '*',             element: <NotFoundPage /> },
])