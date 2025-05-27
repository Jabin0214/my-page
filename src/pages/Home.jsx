import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import AvatarHeader from '../components/pageComponents/AvatarHeader';
import DownloadButton from '../components/functionalComponents/DownloadButton';

const Home = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(null);

  // 各部分的引用
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);

  // 处理滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // 检查哪个部分在视口中
      const sections = [
        { ref: aboutRef, id: 'about' },
        { ref: skillsRef, id: 'skills' },
        { ref: experienceRef, id: 'experience' },
        { ref: educationRef, id: 'education' }
      ];

      for (const section of sections) {
        if (isInViewport(section.ref.current)) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 检查元素是否在视口中
  const isInViewport = (element) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.7
    );
  };

  // 跳转到指定部分
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 基本动画配置
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full pt-16 flex flex-col items-center">
      {/* 头部内容 - 占满屏幕高度 */}
      <div className="w-full min-h-[calc(100vh-4rem)] px-4 flex items-center justify-center">
        <div ref={containerRef} className="w-full max-w-4xl">
          <AvatarHeader containerRef={containerRef} />
        </div>
      </div>

      <div ref={contentRef} className="w-full max-w-4xl space-y-20 px-4 pb-24">
      </div>

      {/* 主要内容 */}
      <div className="w-full max-w-4xl space-y-20 px-4 pb-24">
        {/* 关于我 */}
        <motion.div
          ref={aboutRef}
          initial="hidden"
          animate={isInViewport(aboutRef.current) ? "visible" : "hidden"}
          variants={fadeInUp}
          className="bg-gray-800/60 text-white rounded-xl shadow-lg p-8 border border-gray-700/50 backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t('About.whoAmI.title')}
          </h2>
          <div className="space-y-4">
            <p className="leading-relaxed">{t('About.whoAmI.paragraph1')}</p>
            <p className="leading-relaxed">{t('About.whoAmI.paragraph2')}</p>
          </div>
        </motion.div>

        {/* 技能 */}
        <motion.div
          ref={skillsRef}
          initial="hidden"
          animate={isInViewport(skillsRef.current) ? "visible" : "hidden"}
          variants={fadeInUp}
          className="bg-gray-800/60 text-white rounded-xl shadow-lg p-8 border border-gray-700/50 backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t('About.skills.title')}
          </h2>

          <div className="flex flex-wrap gap-3 justify-center">
            {t('About.skills.list', { returnObjects: true }).map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md text-sm font-medium transition-all hover:bg-gray-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 经验 */}
        <motion.div
          ref={experienceRef}
          initial="hidden"
          animate={isInViewport(experienceRef.current) ? "visible" : "hidden"}
          variants={fadeInUp}
          className="bg-gray-800/60 text-white rounded-xl shadow-lg p-8 border border-gray-700/50 backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t('About.experience.title')}
          </h2>

          <div className="space-y-8 relative">
            {/* 时间线 */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-600 ml-3.5 hidden md:block"></div>

            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="md:ml-12 relative">
                {/* 时间点 */}
                <div className="absolute left-[-40px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-gray-800 hidden md:block"></div>

                <div className="bg-gray-700/80 p-5 rounded-lg backdrop-blur-sm">
                  <h3 className="text-lg font-bold">
                    {t(`About.experience.item${index}.company`)}
                  </h3>
                  <p className="text-sm text-gray-300 mb-2 italic">
                    {t(`About.experience.item${index}.duration`)}
                  </p>
                  <p className="text-gray-200 mb-3">
                    {t(`About.experience.item${index}.description`)}
                  </p>
                  <ul className="list-none text-sm text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mt-1.5 mr-2"></span>
                      <span>{t(`About.experience.item${index}.point1`)}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mt-1.5 mr-2"></span>
                      <span>{t(`About.experience.item${index}.point2`)}</span>
                    </li>
                    {index !== 2 && index !== 5 && (
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mt-1.5 mr-2"></span>
                        <span>{t(`About.experience.item${index}.point3`)}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 教育和兴趣 */}
        <motion.div
          ref={educationRef}
          initial="hidden"
          animate={isInViewport(educationRef.current) ? "visible" : "hidden"}
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gray-800/60 text-white rounded-xl shadow-lg p-8 border border-gray-700/50 backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {t('About.education.title')}
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/80 rounded-lg backdrop-blur-sm">
                <p className="text-gray-200">{t('About.education.degree1')}</p>
              </div>
              <div className="p-4 bg-gray-700/80 rounded-lg backdrop-blur-sm">
                <p className="text-gray-200">{t('About.education.degree2')}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/60 text-white rounded-xl shadow-lg p-8 border border-gray-700/50 backdrop-blur-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {t('About.languages.title')}
              </h2>
              <div className="p-4 bg-gray-700/80 rounded-lg backdrop-blur-sm">
                <p className="text-gray-200">{t('About.languages.list')}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-center">
                {t('About.hobbies.title')}
              </h2>
              <div className="p-4 bg-gray-700/80 rounded-lg backdrop-blur-sm">
                <p className="text-gray-200">{t('About.hobbies.list')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 下载简历按钮 */}
      <div className="fixed right-8 bottom-16 z-10">
        <DownloadButton />
      </div>

      {/* 返回顶部按钮 */}
      {scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 left-8 p-3 rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-200 transition-colors"
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