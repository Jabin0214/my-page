'use client'

import { startTransition } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import {
  DEFAULT_LANGUAGE,
  getLanguageFromPath,
  getPathWithoutLanguage,
  localizePath,
  normalizeLanguage,
  persistLanguage,
  resolveLanguageParam,
} from '../lib/language'

export function useLanguage() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const language =
    resolveLanguageParam(params?.lang) ||
    getLanguageFromPath(pathname) ||
    DEFAULT_LANGUAGE

  function switchLanguage(nextLanguage) {
    const targetLanguage = normalizeLanguage(
      nextLanguage || (language === 'en' ? 'zh' : 'en')
    )
    const targetPath = localizePath(pathname, targetLanguage)

    persistLanguage(targetLanguage)

    if (targetPath === pathname) {
      return
    }

    startTransition(() => {
      router.push(targetPath)
    })
  }

  return {
    language,
    pathname,
    pathWithoutLanguage: getPathWithoutLanguage(pathname),
    localizePath: (targetPath) => localizePath(targetPath, language),
    switchLanguage,
  }
}
