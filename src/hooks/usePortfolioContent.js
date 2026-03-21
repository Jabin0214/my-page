'use client'

import { getPortfolioContent } from '../content/portfolio-content'
import { useLanguage } from './useLanguage'

export function usePortfolioContent() {
  const { language } = useLanguage()
  return getPortfolioContent(language)
}
