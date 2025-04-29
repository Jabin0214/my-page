import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const navLinks = t("navLinks", { returnObjects: true });

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <nav className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 px-6 py-2 
                      bg-gray-500 backdrop-blur-md border border-white/10 
                      shadow-md rounded-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-lg sm:text-xl font-semibold text-white tracking-tight">
          Jabin<span className="opacity-60">'s Portfolio</span>
        </Link>

        {/* Links + Language */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${
                  currentPath === link.path
                    ? "bg-white text-black shadow"
                    : "text-white hover:bg-white/20"
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
      </nav>
    </div>
  );
};

export default Navbar;