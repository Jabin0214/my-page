'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { usePortfolioContent } from '../../../src/hooks/usePortfolioContent'
import { buildProjectShowcase } from '../../../src/lib/projects'

const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const Projects = () => {
  const { projects: projectsContent } = usePortfolioContent()
  const showcaseProjects = buildProjectShowcase(
    projectsContent.list,
    projectsContent.featuredLabel
  )

  return (
    <main className="minimal-content-page minimal-projects-page">
      <section className="minimal-page-hero">
        <p className="minimal-kicker">{projectsContent.eyebrow}</p>
        <h1>{projectsContent.title}</h1>
      </section>

      <section className="minimal-gallery">
        {showcaseProjects.map((project, index) => (
          <motion.article
            key={project.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={revealUp}
            className="minimal-gallery-item"
          >
            <div className="minimal-gallery-meta">
              <p className="minimal-project-index">{String(index + 1).padStart(2, '0')}</p>
              <h2>{project.title}</h2>
              <div className="minimal-tag-row">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="minimal-inline-link"
              >
                {projectsContent.viewSourceLabel}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="minimal-gallery-media">
              <Image
                src={`/${project.cover}`}
                alt={project.title}
                width={1280}
                height={900}
                priority={index === 0}
                sizes="(max-width: 900px) 100vw, 68vw"
                className="h-full w-full object-contain"
              />
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  )
}

export default Projects
