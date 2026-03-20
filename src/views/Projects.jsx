'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { usePortfolioContent } from '../hooks/usePortfolioContent';
import { getAssetPath } from '../lib/assets';

const Projects = () => {
  const { projects: projectsContent } = usePortfolioContent();
  const projects = projectsContent.list;

  return (
    <main className="page-shell pb-20 pt-16">
      <section className="surface-card-strong px-6 py-8 md:px-10 md:py-10">
        <div className="max-w-3xl">
          <p className="eyebrow">
            {projectsContent.eyebrow}
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.95] md:text-6xl">
            {projectsContent.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#526072]">
            {projectsContent.description}
          </p>
        </div>
      </section>

      <section className="mt-8 space-y-6">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="surface-card grid gap-6 p-6 md:grid-cols-[0.92fr_1.08fr] md:p-8"
            >
              <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--bg-soft)]">
                <Image
                  src={getAssetPath(project.cover)}
                  alt={project.title}
                  width={1024}
                  height={1024}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="h-full min-h-[18rem] w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                    {projectsContent.featuredLabel} {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-[#101828]">{project.title}</h2>
                  <p className="mt-4 text-base leading-8 text-[#526072]">{project.description}</p>
                </div>

                <div className="surface-subtle px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">{projectsContent.stackLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary w-fit"
                >
                  {projectsContent.viewSourceLabel}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
      </section>
    </main>
  );
};

export default Projects;
