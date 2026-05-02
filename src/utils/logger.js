// Centralized error logging
// Production-da Sentry, Datadog və ya digər servislə əvəz et

const isDev = import.meta.env.DEV

export function logError(error, context = {}) {
  if (isDev) {
    console.error('[Error]', error, context)
    return
  }

  // Production: Sentry nümunəsi
  // Sentry.captureException(error, { extra: context })

  // Və ya sadə fetch ilə öz serverinə göndər:
  // fetch('/api/logs/error', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     message: error?.message,
  //     stack: error?.stack,
  //     context,
  //     timestamp: new Date().toISOString(),
  //   }),
  // }).catch(() => {})
}

export function logInfo(message, data = {}) {
  if (isDev) {
    console.info('[Info]', message, data)
  }
}