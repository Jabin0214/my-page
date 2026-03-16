import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThreeJSGallery from '../components/functionalComponents/ThreeJSGallery';
import ProjectSpotlight from '../features/projects/components/ProjectSpotlight';

const Projects = () => {
  const { t } = useTranslation();
  const projects = t('Projects.list', { returnObjects: true });
  const sectionTitle = t('Projects.sectionTitle');
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? null);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId, projects]
  );

  const handleSelectProject = (projectId) => {
    setActiveProjectId(projectId ?? projects[0]?.id ?? null);
  };

  return (
    <section className="relative min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-8">
          <ThreeJSGallery
            sectionTitle={sectionTitle}
            projects={projects}
            onSelectProject={handleSelectProject}
          />
        </div>

        <ProjectSpotlight project={activeProject} />
      </div>
    </section>
  );
};

export default Projects;
