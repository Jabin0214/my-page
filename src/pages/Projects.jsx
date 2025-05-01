import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BackgroundVisual from '../components/BackgroundVisual';
import ThreeJSGallery from '../components/ThreeJSGallery';

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("Projects.list", { returnObjects: true });
  const sectionTitle = t("Projects.sectionTitle");
  
  // 处理选择项目事件
  const handleSelectProject = (projectId) => {
    setActiveProject(projectId);
  };

  return (
    <section className="min-h-screen bg-white px-6 py-20 relative">
      <BackgroundVisual />    
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* 虚拟画廊 */}
          <ThreeJSGallery 
              sectionTitle={sectionTitle}
              projects={projects} 
              onSelectProject={handleSelectProject} 
            />
          </div>
      </div>
    </section>
  );
};

export default Projects;