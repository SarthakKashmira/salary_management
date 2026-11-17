const setToLocalStorage = (payload) => {
  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      localStorage.removeItem(key)

      return
    }

    localStorage.setItem(key, JSON.stringify(value))
  })
}

const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  if (value === null) return null

  try {
    return JSON.parse(value)
  } catch {
    // Values written before this helper existed may not be JSON encoded.
    return value
  }
}

const clearLocalStorage = () => localStorage.clear()

export { setToLocalStorage, getFromLocalStorage, clearLocalStorage }
