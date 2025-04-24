import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard'; // 路径根据实际位置调整

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("Projects.list", { returnObjects: true });

  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto text-center mt-20">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r text-neutral-900 bg-clip-text">
          {t("Projects.sectionTitle")}
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {projects.map((project) => (
            <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            github={project.github}
          />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;