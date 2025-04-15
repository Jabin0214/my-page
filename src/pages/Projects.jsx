import React from 'react';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("Projects.list", { returnObjects: true }); // 获取项目数组

  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto text-center mt-20">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r text-neutral-900 bg-clip-text">
          {t("Projects.sectionTitle")}
        </h2>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative bg-gray-100 shadow-md rounded-xl p-6 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600/10 text-blue-800 rounded-full text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;