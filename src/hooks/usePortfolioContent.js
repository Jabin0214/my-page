'use client'

import { getPortfolioContent } from '../content/portfolio-content'
import { useLanguage } from '../providers/language-provider'

export function usePortfolioContent() {
  const { language } = useLanguage()
  return getPortfolioContent(language)
}
