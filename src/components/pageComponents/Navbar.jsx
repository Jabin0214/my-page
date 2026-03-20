'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react'; 
import { SITE_CONFIG } from '../../config/site';
import { usePortfolioContent } from '../../hooks/usePortfolioContent';
import { useLanguage } from '../../hooks/useLanguage';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = usePathname();
  const content = usePortfolioContent();
  const { toggleLanguage: switchLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    switchLanguage();
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="page-shell surface-card flex items-center justify-between px-5 py-3 text-[#101828]">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight sm:text-xl"
          onClick={() => setIsMenuOpen(false)}
        >
          {SITE_CONFIG.owner}
          <span className="ml-2 text-sm font-medium text-[#526072]">{content.navigation.brandSuffix}</span>
        </Link>

        <div className="hidden sm:flex items-center space-x-4">
          {content.navigation.links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                currentPath === link.path
                  ? 'bg-[#101828] text-white'
                  : 'text-[#526072] hover:bg-white hover:text-[#101828]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="button-secondary px-3 py-1.5 text-sm"
          >
            {content.navigation.languageToggleLabel}
          </button>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-[#101828] sm:hidden"
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
            className="page-shell surface-card mt-3 space-y-2 px-4 py-4 sm:hidden"
          >
            {content.navigation.links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block rounded-full px-3 py-2 text-sm font-medium transition-all ${
                  currentPath === link.path
                    ? 'bg-[#101828] text-white'
                    : 'text-[#526072] hover:bg-white hover:text-[#101828]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                handleLanguageToggle();
                setIsMenuOpen(false);
              }}
              className="button-secondary w-full justify-start px-3 py-2 text-left text-sm"
            >
              {content.navigation.languageToggleLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
