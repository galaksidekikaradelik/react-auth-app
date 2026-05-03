const isDev = import.meta.env.DEV

export function logError(error, context = {}) {
  if (isDev) {
    console.error('[Error]', error, context)
    return
  }

}

export function logInfo(message, data = {}) {
  if (isDev) {
    console.info('[Info]', message, data)
  }
}
