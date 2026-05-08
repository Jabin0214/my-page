'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '../../config/site'
import { useLanguage } from '../../hooks/useLanguage'
import { usePortfolioContent } from '../../hooks/usePortfolioContent'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const content = usePortfolioContent()
  const {
    localizePath,
    pathWithoutLanguage,
    switchLanguage,
  } = useLanguage()

  const handleLanguageToggle = () => {
    switchLanguage()
  }

  return (
    <header className="minimal-nav-frame z-50">
      <nav className="minimal-nav-shell flex items-center justify-between">
        <Link
          href={localizePath('/')}
          className="minimal-brand-mark"
          onClick={() => setIsMenuOpen(false)}
        >
          {SITE_CONFIG.owner}
        </Link>

        <div className="minimal-nav-links">
          {content.navigation.links.map((link) => (
            <Link
              key={link.path}
              href={localizePath(link.path)}
              className={`minimal-nav-link ${pathWithoutLanguage === link.path ? 'is-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="minimal-language-button"
          >
            {content.navigation.languageToggleLabel}
          </button>
        </div>

        <button
          type="button"
          className="minimal-menu-button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={content.navigation.mobileMenuLabel}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            id="mobile-navigation"
            className="minimal-mobile-panel"
          >
            {content.navigation.links.map((link) => (
              <Link
                key={link.path}
                href={localizePath(link.path)}
                className={`minimal-mobile-link ${pathWithoutLanguage === link.path ? 'is-active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                handleLanguageToggle()
                setIsMenuOpen(false)
              }}
              className="minimal-mobile-link w-full text-left"
            >
              {content.navigation.languageToggleLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
