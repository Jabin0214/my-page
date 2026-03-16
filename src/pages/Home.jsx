import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import AvatarHeader from '../components/pageComponents/AvatarHeader';
import DownloadButton from '../components/functionalComponents/DownloadButton';
import SectionCard from '../components/shared/SectionCard';
import { useScrollThreshold } from '../hooks/useScrollThreshold';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const showScrollTop = useScrollThreshold(500);

  const skills = t('About.skills.list', { returnObjects: true });
  const experienceItems = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((index) => ({
        key: index,
        company: t(`About.experience.item${index}.company`),
        duration: t(`About.experience.item${index}.duration`),
        description: t(`About.experience.item${index}.description`),
        points: [1, 2, 3]
          .map((point) => t(`About.experience.item${index}.point${point}`))
          .filter((point) => point && !point.includes(`item${index}.point`)),
      })),
    [t]
  );

  return (
    <div className="flex w-full flex-col items-center pt-16">
      <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4">
        <div ref={containerRef} className="w-full max-w-4xl">
          <AvatarHeader containerRef={containerRef} />
        </div>
      </div>

      <div className="w-full max-w-5xl space-y-10 px-4 pb-24">
        <SectionCard>
          <h2 className="mb-6 text-center text-2xl font-bold">
            {t('About.whoAmI.title')}
          </h2>
          <div className="space-y-4 text-white/80">
            <p className="leading-relaxed">{t('About.whoAmI.paragraph1')}</p>
            <p className="leading-relaxed">{t('About.whoAmI.paragraph2')}</p>
          </div>
        </SectionCard>

        <SectionCard>
          <h2 className="mb-6 text-center text-2xl font-bold">
            {t('About.skills.title')}
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-50 transition-all hover:-translate-y-0.5 hover:bg-cyan-300/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <h2 className="mb-6 text-center text-2xl font-bold">
            {t('About.experience.title')}
          </h2>

          <div className="relative space-y-8">
            <div className="absolute bottom-0 left-3.5 top-0 hidden w-0.5 bg-white/10 md:block"></div>

            {experienceItems.map((item) => (
              <div key={item.key} className="relative md:ml-12">
                <div className="absolute left-[-40px] top-1.5 hidden h-4 w-4 rounded-full border-4 border-slate-900 bg-cyan-300 md:block"></div>

                <div className="rounded-2xl border border-white/8 bg-black/20 p-5 backdrop-blur-sm">
                  <h3 className="text-lg font-bold">{item.company}</h3>
                  <p className="mb-2 text-sm italic text-cyan-100/70">{item.duration}</p>
                  <p className="mb-3 text-white/80">{item.description}</p>
                  <ul className="space-y-2 text-sm text-white/70">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start">
                        <span className="mt-1.5 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="rounded-3xl border border-white/10 bg-white/8 p-8 text-white shadow-2xl backdrop-blur-xl">
            <h2 className="mb-4 text-center text-2xl font-bold">
              {t('About.education.title')}
            </h2>
            <div className="space-y-4">
              <div className="rounded-2xl bg-black/20 p-4 backdrop-blur-sm">
                <p className="text-white/80">{t('About.education.degree1')}</p>
              </div>
              <div className="rounded-2xl bg-black/20 p-4 backdrop-blur-sm">
                <p className="text-white/80">{t('About.education.degree2')}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/8 p-8 text-white shadow-2xl backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="mb-4 text-center text-2xl font-bold">
                {t('About.languages.title')}
              </h2>
              <div className="rounded-2xl bg-black/20 p-4 backdrop-blur-sm">
                <p className="text-white/80">{t('About.languages.list')}</p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-center text-2xl font-bold">
                {t('About.hobbies.title')}
              </h2>
              <div className="rounded-2xl bg-black/20 p-4 backdrop-blur-sm">
                <p className="text-white/80">{t('About.hobbies.list')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-16 right-8 z-10">
        <DownloadButton />
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-8 left-8 rounded-full border border-white/10 bg-white p-3 text-gray-800 shadow-lg transition-colors hover:bg-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Home;
