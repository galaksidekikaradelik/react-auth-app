import { useForm }        from 'react-hook-form'
import { zodResolver }    from '@hookform/resolvers/zod'
import { z }              from 'zod'
import { useMutation }    from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { authApi }        from '../../api/auth.api'
import { useAuthContext } from '../../store/AuthContext'

const loginSchema = z.object({
  email:    z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
})

export function LoginPage() {
  const { login }  = useAuthContext()
  const navigate   = useNavigate()

  const { register, handleSubmit, formState: { errors } } =
    useForm({ resolver: zodResolver(loginSchema) })

  const mutation = useMutation({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (res) => {
      login(res.data.user, res.data.token)
      navigate('/profile', { replace: true })
    },
  })

  return (
    <div className="auth-wrapper">
      <div className="auth-card fade-in" role="main">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle" id="login-desc">Sign in to your account to continue</p>

        {mutation.isError && (
          <div className="alert alert-error" role="alert" aria-live="assertive">
            {mutation.error?.response?.data?.message || 'Invalid email or password'}
          </div>
        )}

        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} noValidate aria-describedby="login-desc">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email" type="email" placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`form-input${errors.email ? ' error' : ''}`}
              {...register('email')}
            />
            {errors.email && <span id="email-error" className="form-error" role="alert">⚠ {errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password" type="password" placeholder="••••••••"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={`form-input${errors.password ? ' error' : ''}`}
              {...register('password')}
            />
            {errors.password && <span id="password-error" className="form-error" role="alert">⚠ {errors.password.message}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={mutation.isPending} aria-busy={mutation.isPending}>
            {mutation.isPending ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p className="auth-footer">Don't have an account? <Link to="/register">Create one</Link></p>
      </div>
    </div>
  )
}