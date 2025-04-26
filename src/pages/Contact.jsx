import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <section className="flex items-center justify-center min-h-screen p-6">
      <div className="relative w-[500px] h-[400px] bg-black rounded-3xl overflow-hidden group transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-2xl">

        {/* 背景流动光 */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-slate-600 to-slate-400 bg-[length:400%_400%] animate-gradientBlur opacity-20 rounded-3xl pointer-events-none"></div>

        {/* 内容 */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-10">
          {/* Icon */}
          <div className="text-6xl mb-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
            ✉️
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold mb-6 tracking-widest opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {t('Contact.sectionTitle')}
          </h2>
          <p className="text-lg text-gray-300 mb-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-50">
            {t('Contact.description')}
          </p>

          {/* Links */}
          <div className="flex flex-col gap-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
            <a
              href="mailto:jabinchen0214@outlook.com"
              className="text-gray-300 hover:text-amber-400 transition-colors text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </a>
            <a
              href="https://github.com/Jabin0214"
              className="text-gray-300 hover:text-amber-400 transition-colors text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;