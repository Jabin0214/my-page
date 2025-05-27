import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const navLinks = t("navLinks", { returnObjects: true });

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2">
      <nav className="flex items-center justify-between px-5 py-3 rounded-xl 
                      bg-white/10 backdrop-blur-md shadow-lg border border-white/10 text-white">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-lg sm:text-xl font-bold tracking-tight"
          onClick={() => setIsMenuOpen(false)}
        >
          Jabin<span className="opacity-60">'s Portfolio</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                currentPath === link.path
                  ? 'bg-white text-black shadow'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-sm rounded-full border border-white text-white hover:bg-white hover:text-black transition-all"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="sm:hidden p-2 text-white"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Nav Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut", delayChildren: 0.15, staggerChildren: 0.05 }}
          className="sm:hidden origin-top mt-2 bg-white/10 backdrop-blur-md shadow-lg border border-white/10 rounded-xl px-5 py-3 space-y-2"
        >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  currentPath === link.path
                    ? 'bg-white text-black shadow'
                    : 'text-white hover:bg-white/20'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm rounded-full border border-white text-white hover:bg-white hover:text-black transition-all"
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;