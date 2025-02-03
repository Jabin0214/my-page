import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-12 text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold bg-gradient-to-r text-neutral-900 bg-clip-text text-transparent">
          About Me
        </h2>

        {/* Introduction */}
        <div className="space-y-6">
          <p className="leading-relaxed text-gray-700">
            I'm a Software Engineer with 2 years of full-stack development experience, passionate about scalable web and mobile applications. I specialize in React.js, C#, Node.js, and Swift, with expertise in Docker-based deployments, AWS cloud services, and RESTful API design.
          </p>
          <p className="leading-relaxed text-gray-700">
            I have worked on innovative projects, such as developing a medication automation app using AI-powered image recognition, and contributed to MERN Stack applications integrating Spotify & OpenAI APIs. I thrive in agile environments, ensuring CI/CD optimization, clean code, and performance-driven solutions.
          </p>
        </div>

        {/* Skills Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-medium text-gray-900">
            Technical Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React.js", "Node.js", "C#", "Swift", "Docker",
              "AWS", "ASP.NET", "TypeScript", "Machine Learning",
              "UI/UX Design"
            ].map((skill) => (
              <span key={skill} className="px-4 py-2 bg-blue-600/10 text-blue-800 rounded-full text-sm font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience Highlight */}
        <div className="space-y-6">
          <h3 className="text-2xl font-medium text-gray-900">
            Current Focus
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Currently focusing on building scalable web applications and exploring new technologies in AI and cloud computing. Always eager to learn and contribute to innovative projects that push the boundaries of what's possible.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;