import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';

const Home = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden">

      <div className="relative z-10 max-w-3xl w-full text-center
                      bg-white/10 backdrop-blur-lg border border-white/20
                      rounded-2xl shadow-2xl px-8 py-16 sm:px-12 sm:py-20">
        <h1
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-6
                     bg-gradient-to-r from-neutral-100 to-gray-500
                     bg-clip-text text-transparent animate-text-gradient"
                     style={{ backgroundSize: '300% 300%' }}
        >
          {t('Home.title')}
        </h1>

        <p className="text-lg sm:text-xl text-neutral-100 drop-shadow-sm mb-10">
          {t('Home.description')}
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <Link to="/projects">
            <Button text={t('Home.link.0')} />
          </Link>
          <Link to="/contact">
            <Button text={t('Home.link.1')} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;