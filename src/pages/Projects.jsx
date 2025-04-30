import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BackgroundVisual from '../components/BackgroundVisual';
import ThreeJSGallery from '../components/ThreeJSGallery';

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("Projects.list", { returnObjects: true });
  const [activeProject, setActiveProject] = useState(null);
  
  // 处理选择项目事件
  const handleSelectProject = (projectId) => {
    setActiveProject(projectId);
  };

  // 获取当前选中的项目数据
  const selectedProject = activeProject 
    ? projects.find(p => p.id === activeProject) 
    : null;

  return (
    <section className="min-h-screen bg-white px-6 py-20 relative">
      <BackgroundVisual />
      
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          {t("Projects.sectionTitle")}
        </h2>
        
        <div className="relative">
          {/* 虚拟画廊 */}
            <ThreeJSGallery 
              projects={projects} 
              onSelectProject={handleSelectProject} 
            />
          </div>
      </div>
    </section>
  );
};

export default Projects;