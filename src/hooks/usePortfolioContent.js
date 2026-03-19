'use client'

import { useTranslation } from 'react-i18next'
import { getPortfolioContent } from '../content/portfolio-content'

export function usePortfolioContent() {
  const { i18n } = useTranslation()
  return getPortfolioContent(i18n.resolvedLanguage || i18n.language)
}
