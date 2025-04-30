import React from 'react';

const ProjectCard = ({
  id,
  title,
  description,
  github,
  isActive,
  onClick
}) => {
  return (
    <div 
      className={`w-full h-[300px] rounded-xl flex flex-col bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-900/10 relative overflow-hidden transition-all duration-500 cursor-pointer ${
        isActive ? "scale-105 shadow-2xl" : "shadow-lg hover:shadow-xl hover:translate-y-[-6px]"
      }`}
      onClick={onClick}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-500 rounded-full -translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500 rounded-full translate-x-10 translate-y-10"></div>
      </div>
      
      {/* Glowing effect */}
      <div className={`absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-indigo-500/20 to-blue-500/20 opacity-0 transition-opacity duration-500 ${isActive ? "opacity-100" : ""}`}></div>
      
      {/* Header */}
      <div className="h-[70px] bg-gradient-to-r from-indigo-900 to-purple-900 px-6 py-4 text-lg font-bold text-white flex items-center">
        <h3 className="truncate">{title}</h3>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between gap-4 p-6">
        <p className="text-gray-700 font-medium line-clamp-3 overflow-hidden">
          {description}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          <div className={`w-2 h-2 rounded-full bg-green-500 mr-2 ${isActive ? "animate-pulse" : ""}`}></div>
          
          <span className="text-sm text-gray-500 font-medium">
            点击查看详情
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;