import React from 'react';
import { useTranslation } from 'react-i18next';
import DownloadButton from '../components/DownloadButton';
import BackgroundVisual from '../components/BackgroundVisual';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-br from-neutral-100 to-white flex justify-center items-start">
      <BackgroundVisual />

      <div className="w-full max-w-4xl bg-white border-4 border-black shadow-[8px_8px_0_#000] rounded-xl p-8 space-y-10 mt-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">{t('About.title')}</h1>
          <p className="text-md text-gray-600">{t('About.subtitle')}</p>
          <div className="mt-2 flex justify-center gap-4 text-sm text-blue-600 underline">
            <a href={`mailto:${t('About.contact.email')}`}>{t('About.contact.email')}</a>
            <a href={t('About.contact.github')} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-2">{t('About.whoAmI.title')}</h2>
          <p className="text-gray-800 leading-relaxed">
            {t('About.whoAmI.paragraph1')}
          </p>
          <p className="text-gray-800 leading-relaxed">
            {t('About.whoAmI.paragraph2')}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">{t('About.skills.title')}</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {t('About.skills.list', { returnObjects: true }).map(skill => (
              <span key={skill} className="bg-black text-white px-3 py-1 rounded-full border border-white">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">{t('About.experience.title')}</h2>
          <ul className="space-y-3 text-gray-800 text-sm leading-relaxed">

            <li>
              <strong>{t('About.experience.item1.company')}</strong> ({t('About.experience.item1.duration')}) – {t('About.experience.item1.description')}
              <ul className="list-disc list-inside ml-4">
                <li>{t('About.experience.item1.point1')}</li>
                <li>{t('About.experience.item1.point2')}</li>
                <li>{t('About.experience.item1.point3')}</li>
              </ul>
            </li>

            <li>
              <strong>{t('About.experience.item2.company')}</strong> ({t('About.experience.item2.duration')}) – {t('About.experience.item2.description')}
              <ul className="list-disc list-inside ml-4">
                <li>{t('About.experience.item2.point1')}</li>
                <li>{t('About.experience.item2.point2')}</li>
              </ul>
            </li>

            <li>
              <strong>{t('About.experience.item3.company')}</strong> ({t('About.experience.item3.duration')}) – {t('About.experience.item3.description')}
              <ul className="list-disc list-inside ml-4">
                <li>{t('About.experience.item3.point1')}</li>
                <li>{t('About.experience.item3.point2')}</li>
              </ul>
            </li>

            <li>
              <strong>{t('About.experience.item4.company')}</strong> ({t('About.experience.item4.duration')}) – {t('About.experience.item4.description')}
              <ul className="list-disc list-inside ml-4">
                <li>{t('About.experience.item4.point1')}</li>
                <li>{t('About.experience.item4.point2')}</li>
                <li>{t('About.experience.item4.point3')}</li>
              </ul>
            </li>

            <li>
              <strong>{t('About.experience.item5.company')}</strong> ({t('About.experience.item5.duration')}) – {t('About.experience.item5.description')}
              <ul className="list-disc list-inside ml-4">
                <li>{t('About.experience.item5.point1')}</li>
                <li>{t('About.experience.item5.point2')}</li>
              </ul>
            </li>

          </ul>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-2">{t('About.education.title')}</h2>
          <p className="text-gray-800">{t('About.education.degree1')}</p>
          <p className="text-gray-800">{t('About.education.degree2')}</p>
        </div>

        {/* Languages & Hobbies */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h3 className="font-bold text-black">{t('About.languages.title')}</h3>
            <p>{t('About.languages.list')}</p>
          </div>
          <div>
            <h3 className="font-bold text-black">{t('About.hobbies.title')}</h3>
            <p>{t('About.hobbies.list')}</p>
          </div>
        </div>
      </div>
      <div className='fixed right-10 bottom-20'>
        <DownloadButton />
      </div>
    </section>
  );
};

export default About;