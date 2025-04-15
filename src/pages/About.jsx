import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-12 text-center">
        {/* Section Title */}
        <h2 className="text-4xl mt-10 font-bold text-neutral-900 bg-clip-text">
          {t("About.title")}
        </h2>

        {/* Introduction */}
        <div className="space-y-6">
          <p className="leading-relaxed text-gray-700">
            {t("About.intro1")}
          </p>
          <p className="leading-relaxed text-gray-700">
            {t("About.intro2")}
          </p>
        </div>

        {/* Skills Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-medium text-gray-900">
            {t("About.subtitle1")}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {t("About.skill", { returnObjects: true }).map((skill) => (
              <span key={skill} className="px-4 py-2 bg-blue-600/10 text-blue-800 rounded-full text-sm font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience Highlight */}
        <div className="space-y-6">
          <h3 className="text-2xl font-medium text-gray-900">
            {t("About.subtitle2")}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {t("About.curent")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;