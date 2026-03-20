'use client'

import { createContext, startTransition, useContext, useEffect, useState } from 'react'
import { DEFAULT_LANGUAGE, getStoredLanguage, normalizeLanguage, persistLanguage } from '../lib/language'

const LanguageContext = createContext(null)

function syncLanguage(language) {
  persistLanguage(language)
  document.documentElement.lang = normalizeLanguage(language)
}

export function LanguageProvider({ children, initialLanguage = DEFAULT_LANGUAGE }) {
  const [language, setLanguageState] = useState(() => normalizeLanguage(initialLanguage))

  useEffect(() => {
    const storedLanguage = getStoredLanguage()

    if (storedLanguage !== normalizeLanguage(initialLanguage)) {
      startTransition(() => {
        setLanguageState(storedLanguage)
      })
    }
  }, [initialLanguage])

  useEffect(() => {
    syncLanguage(language)
  }, [language])

  const toggleLanguage = () => {
    startTransition(() => {
      setLanguageState((currentLanguage) => (currentLanguage === 'en' ? 'zh' : 'en'))
    })
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const value = useContext(LanguageContext)

  if (!value) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return value
}
