import React from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Medimate - AI-powered Medication Assistance",
      description: "Developed an innovative application that automates medication purchases by extracting data from product images using AI-driven image recognition.",
      tags: ["React", "Swift", "ASP.NET", "Docker", "OpenAI API", "AWS"]
    },
    {
      id: 2,
      title: "MusicChat - AI-Enhanced Social Music Platform",
      description: "Built a full-stack web application integrating Spotify and OpenAI APIs, allowing users to review, chat, and discover music interactively.",
      tags: ["MERN Stack", "React", "Node.js", "MongoDB", "Express", "OpenAI API"]
    },
    {
      id: 3,
      title: "COVID-19 Impact Analysis with Machine Learning",
      description: "Conducted data mining on COVID-19's effect on education in Venezuela using CRISP-DM methodology, building ML models to predict school dropout rates.",
      tags: ["Python", "Pandas", "NumPy", "Scikit-Learn", "R", "IBM SPSS"]
    }
  ];

  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto text-center mt-20">
        {/* Page Title */}
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r text-neutral-900 bg-clip-text text-transparent">
          My Projects
        </h2>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="relative bg-gray-100 shadow-md rounded-xl p-6 text-left hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Project Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>

              {/* Description */}
              <p className="text-gray-700 mb-4">{project.description}</p>

              {/* Tags */}
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