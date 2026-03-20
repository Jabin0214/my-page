export const DEFAULT_LANGUAGE = 'en'
export const LANGUAGE_STORAGE_KEY = 'lang'

export function normalizeLanguage(language) {
  return typeof language === 'string' && language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function getStoredLanguage() {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }

  return normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY))
}

export function persistLanguage(language) {
  if (typeof window === 'undefined') {
    return
  }

  const normalizedLanguage = normalizeLanguage(language)
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage)
}
