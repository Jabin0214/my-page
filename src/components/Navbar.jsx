import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language); // 当前语言
  const location = useLocation();
  const currentPath = location.pathname;


  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  return (
    <div className="fixed top-8 left-0 right-0 flex justify-center z-50">
      <nav className="fixed w-11/12 md:w-2/3 lg:w-1/2 bg-black backdrop-blur-lg z-50 rounded-full px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-neutral-200">
            Jabin's Portfolio
          </Link>

          <div className="flex items-center space-x-4">
          {t("navLinks", { returnObjects: true }).map((link) => (
  <Link
    key={link.path}
    to={link.path}
    className={`hover:text-black transition-colors hover:bg-white px-4 py-2 rounded-full ${
      currentPath === link.path ? "bg-white text-black" : "bg-transparent text-white"
    }`}
  >
    {link.label}
  </Link>
))}

            {/* Language Switch Button */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm rounded-full border border-white text-white hover:bg-white hover:text-black transition-all"
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;