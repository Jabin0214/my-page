import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const {t} = useTranslation();
  
  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-br from-neutral-100 to-white flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white border-4 border-black shadow-[8px_8px_0_#000] rounded-xl p-8 space-y-10 mt-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Jabin Chen</h1>
          <p className="text-md text-gray-600">Software Engineer - Auckland City, NZ</p>
          <div className="mt-2 flex justify-center gap-4 text-sm text-blue-600 underline">
            <a href="mailto:jabinchen0214@gmail">jabinchen0214@gmail</a>
            <a href="https://github.com/Jabin0214" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-2">Who Am I</h2>
          <p className="text-gray-800 leading-relaxed">
          Hi, I’m Jabin Chen — a Master’s graduate from
the University of Auckland and a passion-
ate developer who enjoys building impactful
tech solutions. With hands-on experience in
JavaScript, C#, and Python, I’ve developed full-
stack applications using frameworks such as
React, ASP.NET Core, and Node.js.
Driven by creativity and curiosity, I’m espe-
cially interested in how emerging technologies
— particularly AI and cloud computing — can
enhance user experiences and address real-
world challenges. I’m always open to meaning-
ful conversations about innovation and the fu-
ture of technology.
          </p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {t('About.skill', { returnObjects: true }).map(skill => (
              <span key={skill} className="bg-black text-white px-3 py-1 rounded-full border border-white">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">Experience</h2>
          <ul className="space-y-3 text-gray-800 text-sm leading-relaxed">

  <li>
    <strong>FRW Healthcare Limited & ICT Graduate School</strong> (07/2024–12/2024) – AI-powered medication purchasing platform.
    <ul className="list-disc list-inside ml-4">
      <li>Developed cross-platform UI with Swift (iOS) and React.js (Web); scalable RESTful APIs using Spring Boot.</li>
      <li>Containerized applications with Docker, deployed on AWS with Nginx, and implemented CI/CD pipelines.</li>
      <li>Enhanced pharmacy workflow efficiency by 40% through AI-driven automation and system performance tuning.</li>
    </ul>
  </li>

  <li>
    <strong>The University of Auckland</strong> (02/2023–12/2024) – Teaching Assistant for Computer Science courses.
    <ul className="list-disc list-inside ml-4">
      <li>Evaluated and graded assignments for Principles of Programming, Software Fundamentals, and Computer Organisation.</li>
      <li>Provided feedback and additional learning support to students, improving academic performance and understanding.</li>
    </ul>
  </li>

  <li>
    <strong>Musichat</strong> (07/2023–11/2023) – Full Stack Developer for AI-integrated music web application.
    <ul className="list-disc list-inside ml-4">
      <li>Built full-stack app using MERN stack, integrating Spotify API for music playback and OpenAI API for conversational AI.</li>
      <li>Implemented real-time chat with Socket.IO; optimized MongoDB for high concurrency in an Agile environment.</li>
    </ul>
  </li>

  <li>
    <strong>AI Financial Platform (Personal Project)</strong> (01/2025–Present) – Stock portfolio and AI news podcast system.
    <ul className="list-disc list-inside ml-4">
      <li>Developed responsive frontend with React and Tailwind; secure routing via context-based authentication.</li>
      <li>Designed layered RESTful APIs with ASP.NET Core and EF Core; integrated DeepSeek and NewsAPI for financial summaries.</li>
      <li>Converted summaries into podcasts using Azure TTS; deployed services via Docker and Azure App Service with CI/CD.</li>
    </ul>
  </li>

  <li>
    <strong>Danone Nutricia (Virtual Internship)</strong> (06/2023) – Display-only productivity web app.
    <ul className="list-disc list-inside ml-4">
      <li>Built a responsive frontend using React.js and designed user flows in Figma.</li>
      <li>Developed RESTful APIs with Python Flask to retrieve and serve production order documents.</li>
    </ul>
  </li>

</ul>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-2">Education</h2>
          <p className="text-gray-800">Master of Information Technology – University of Auckland</p>
          <p className="text-gray-800">Bachelor of Science in Computer Science – University of Auckland</p>
        </div>

        {/* Languages & Hobbies */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h3 className="font-bold text-black">Languages</h3>
            <p>English, Mandarin-Chinese</p>
          </div>
          <div>
            <h3 className="font-bold text-black">Hobbies</h3>
            <p>Exploring • Hiking • GitHub mini-projects</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;