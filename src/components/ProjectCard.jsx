import React from 'react';
import Button from './Button';

const ProjectCard = ({
  title ,
  description ,
  github
}) => {
  return (
    <div className="w-full max-w-[300px] h-[270px] sm:h-[250px] flex flex-col -translate-x-[6px] -translate-y-[6px] bg-white border-[3px] border-black shadow-[8px_8px_0_#000] transition-all duration-300 hover:translate-x-0 hover:translate-y-[-6px]">
      
      {/* Header */}
      <div className="h-[60px] bg-white border-b-[3px] border-black px-4 py-2 text-sm sm:text-[14px] font-extrabold text-black leading-tight break-words">
        {title}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between gap-3 p-4 text-sm sm:text-[14px] font-semibold text-black overflow-hidden">
        <p className="overflow-hidden break-words line-clamp-5 leading-relaxed">
          {description}
        </p>
        <div className="mt-auto">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <Button text="GitHub" href={github} />
          </a>
        </div>
          
      </div>
    </div>
  );
};

export default ProjectCard;