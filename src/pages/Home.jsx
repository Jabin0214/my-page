import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import Button from '../components/Button'


const Home = () => {
  const {t} = useTranslation();
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center animate-in fade-in slide-in-from-bottom duration-1000">
        <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-neutral-200 via-neutral-500 to-neutral-900 bg-clip-text text-transparent animate-text-gradient "
                    style={{ backgroundSize: "300% 300%" }}>
          {t('Home.title')}
        </h1>
        <p className="text-xl text-neutral-400 mb-8">{t('Home.description')}</p>
        <div className="flex justify-center gap-4 overflow-visible mt-10">        
            <Link to={"/projects"}>
              <Button text={t('Home.link.0')} />
          </Link>
          <Link to={"/contact"}>
              <Button text={t('Home.link.1')} />
            </Link>
        </div>
      </div>
    </section>
  )
}

export default Home