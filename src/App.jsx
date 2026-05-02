import { Component }           from 'react'
import { RouterProvider }      from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools }  from '@tanstack/react-query-devtools'
import { AuthProvider }        from './store/AuthContext'
import { router }              from './router'
import { setQueryClient }      from './api/axios'
import { logError }            from './utils/logger'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error, info)    { logError(error, info) }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page" role="alert" aria-live="assertive">
          <div className="error-code" style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}>Oops</div>
          <h2 className="error-message">Something went wrong</h2>
          <p className="error-desc">An unexpected error occurred. Please refresh the page.</p>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: 'auto' }}
            onClick={() => {
              this.setState({ hasError: false })
              window.location.href = '/'
            }}
          >
            ← Back to Home
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error?.response?.status === 404) return false
        if (error?.response?.status === 401) return false
        return failureCount < 2
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
    mutations: {
      onError: (error) => logError(error),
    },
  },
})

setQueryClient(queryClient)

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  )
}