import { useForm }        from 'react-hook-form'
import { zodResolver }    from '@hookform/resolvers/zod'
import { z }              from 'zod'
import { useAuthContext } from '../../store/AuthContext'
import { useUpdateSettings } from './hooks/useUpdateSettings'

const settingsSchema = z.object({
  name:            z.string().min(1, 'Name is required').min(3, 'Min 3 chars').max(30, 'Max 30 chars'),
  email:           z.string().min(1, 'Email is required').email('Please enter a valid email'),
  newPassword:     z.string().min(6, 'Min 6 characters').optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine(
  (d) => !d.newPassword || d.newPassword === d.confirmPassword,
  { message: "Passwords don't match", path: ['confirmPassword'] }
)

export function SettingPage() {
  const { user } = useAuthContext()

  const displayName = user?.username || user?.name || ''

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name:            displayName,
      email:           user?.email || '',
      newPassword:     '',
      confirmPassword: '',
    },
  })

  const mutation = useUpdateSettings({
    onSuccess: (updated) => {
      reset({
        name:            updated?.username || updated?.name || '',
        email:           updated?.email || '',
        newPassword:     '',
        confirmPassword: '',
      })
    },
  })

  return (
    <div className="fade-in">
      <div className="page-header">
        <span className="page-tag">Protected Route</span>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Update your account information below.</p>
      </div>

      {mutation.isError && (
        <div className="alert alert-error" role="alert" aria-live="assertive">
          {mutation.error?.response?.data?.message || 'Failed to update settings'}
        </div>
      )}
      {mutation.isSuccess && (
        <div className="alert alert-success" role="status" aria-live="polite">
          ✓ Settings updated successfully
        </div>
      )}

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))} noValidate aria-label="Account settings">
        <div className="settings-section">
          <div className="settings-section-title">Account Info</div>

          {[
            { id: 'name',  label: 'Name',          type: 'text',  autoComplete: 'name' },
            { id: 'email', label: 'Email Address',  type: 'email', autoComplete: 'email' },
          ].map(({ id, label, type, autoComplete }) => (
            <div className="form-group" key={id}>
              <label className="form-label" htmlFor={id}>{label}</label>
              <input
                id={id} type={type} autoComplete={autoComplete}
                aria-invalid={!!errors[id]}
                aria-describedby={errors[id] ? `${id}-error` : undefined}
                className={`form-input${errors[id] ? ' error' : ''}`}
                {...register(id)}
              />
              {errors[id] && <span id={`${id}-error`} className="form-error" role="alert">⚠ {errors[id].message}</span>}
            </div>
          ))}
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Change Password</div>
          <p className="settings-section-hint">Leave blank to keep your current password.</p>

          {[
            { id: 'newPassword',     label: 'New Password',          placeholder: 'Min 6 characters' },
            { id: 'confirmPassword', label: 'Confirm New Password',  placeholder: 'Repeat new password' },
          ].map(({ id, label, placeholder }) => (
            <div className="form-group" key={id}>
              <label className="form-label" htmlFor={id}>{label}</label>
              <input
                id={id} type="password" placeholder={placeholder}
                autoComplete="new-password"
                aria-invalid={!!errors[id]}
                aria-describedby={errors[id] ? `${id}-error` : undefined}
                className={`form-input${errors[id] ? ' error' : ''}`}
                {...register(id)}
              />
              {errors[id] && <span id={`${id}-error`} className="form-error" role="alert">⚠ {errors[id].message}</span>}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={mutation.isPending}
          aria-busy={mutation.isPending}
          style={{ maxWidth: 240 }}
        >
          {mutation.isPending ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}