'use client'

import { LanguageProvider } from '../src/providers/language-provider'

export default function Providers({ children, initialLanguage }) {
  return <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
}
