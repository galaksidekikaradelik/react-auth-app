import { useForm }        from 'react-hook-form'
import { zodResolver }    from '@hookform/resolvers/zod'
import { z }              from 'zod'
import { useMutation }    from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { authApi }        from '../../api/auth.api'
import { useAuthContext } from '../../store/AuthContext'

const registerSchema = z.object({
  name:            z.string().min(1, 'Name is required').min(3, 'Min 3 characters').max(30, 'Max 30 characters'),
  email:           z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password:        z.string().min(1, 'Password is required').min(6, 'Min 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export function RegisterPage() {
  const { login }  = useAuthContext()
  const navigate   = useNavigate()

  const { register, handleSubmit, formState: { errors } } =
    useForm({ resolver: zodResolver(registerSchema) })

  const mutation = useMutation({
    mutationFn: ({ name, email, password }) => authApi.register({ name, email, password }),
    onSuccess: (res) => {
      login(res.data.user, res.data.token)
      navigate('/profile', { replace: true })
    },
  })

  return (
    <div className="auth-wrapper">
      <div className="auth-card fade-in" role="main">
        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle" id="register-desc">Join today — it's free</p>

        {mutation.isError && (
          <div className="alert alert-error" role="alert" aria-live="assertive">
            {mutation.error?.response?.data?.message || 'Registration failed. Please try again.'}
          </div>
        )}

        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} noValidate aria-describedby="register-desc">
          {[
            { id: 'name',            label: 'Name',             type: 'text',     placeholder: 'John Doe',          autoComplete: 'name' },
            { id: 'email',           label: 'Email',            type: 'email',    placeholder: 'you@example.com',   autoComplete: 'email' },
            { id: 'password',        label: 'Password',         type: 'password', placeholder: 'Min 6 characters',  autoComplete: 'new-password' },
            { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Repeat password',   autoComplete: 'new-password' },
          ].map(({ id, label, type, placeholder, autoComplete }) => (
            <div className="form-group" key={id}>
              <label className="form-label" htmlFor={id}>{label}</label>
              <input
                id={id} type={type} placeholder={placeholder} autoComplete={autoComplete}
                aria-invalid={!!errors[id]}
                aria-describedby={errors[id] ? `${id}-error` : undefined}
                className={`form-input${errors[id] ? ' error' : ''}`}
                {...register(id)}
              />
              {errors[id] && <span id={`${id}-error`} className="form-error" role="alert">⚠ {errors[id].message}</span>}
            </div>
          ))}

          <button type="submit" className="btn btn-primary" disabled={mutation.isPending} aria-busy={mutation.isPending}>
            {mutation.isPending ? 'Creating account…' : 'Create Account →'}
          </button>
        </form>

        <p className="auth-footer">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  )
}