'use client';

import { useMemo, useState } from 'react';
import ThreeJSGallery from '../components/functionalComponents/ThreeJSGallery';
import ProjectSpotlight from '../features/projects/components/ProjectSpotlight';
import { usePortfolioContent } from '../hooks/usePortfolioContent';

const Projects = () => {
  const { projects: projectsContent } = usePortfolioContent();
  const projects = projectsContent.list;
  const sectionTitle = projectsContent.sectionTitle;
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

        <ProjectSpotlight
          project={activeProject}
          featuredLabel={projectsContent.featuredLabel}
          viewSourceLabel={projectsContent.viewSourceLabel}
        />
      </div>
    </section>
  );
};

export default Projects;
