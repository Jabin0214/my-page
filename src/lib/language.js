const LANGUAGE_STORAGE_KEY = 'lang'

export const getStoredLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en'
  }

  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en'
}

export const setStoredLanguage = (language) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
}
