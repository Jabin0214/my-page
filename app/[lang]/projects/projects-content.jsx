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

const imageReveal = {
  hidden: { opacity: 0, scale: 0.97, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  },
}

const Projects = () => {
  const { projects: projectsContent } = usePortfolioContent()
  const showcaseProjects = buildProjectShowcase(
    projectsContent.list,
    projectsContent.featuredLabel
  )

  return (
    <main className="page-shell pb-24 pt-14 md:pt-20">
      <div className="projects-showcase space-y-14 md:space-y-20">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={revealUp}
          className="projects-hero"
        >
          <div className="editorial-divider" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:items-end">
            <div className="max-w-4xl">
              <p className="eyebrow">{projectsContent.eyebrow}</p>
              <h1 className="projects-showcase-display mt-7">{projectsContent.title}</h1>
              <p className="editorial-lead mt-6 max-w-3xl">{projectsContent.description}</p>
            </div>

            <aside className="projects-showcase-aside">
              <div className="projects-showcase-note">
                <p className="editorial-kicker">{projectsContent.showcaseIntroLabel}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {projectsContent.showcaseNote}
                </p>
              </div>
              <p className="projects-showcase-closing">{projectsContent.showcaseClosing}</p>
            </aside>
          </div>
        </motion.section>

        <section className="space-y-16 md:space-y-24">
          {showcaseProjects.map((project, index) => {
            const isMediaLeft = project.mediaSide === 'left'

            return (
              <motion.article
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={revealUp}
                className="projects-showcase-row"
              >
                <div
                  className={`projects-showcase-grid ${
                    isMediaLeft ? 'lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]' : 'lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]'
                  }`}
                >
                  <motion.div
                    variants={imageReveal}
                    className={isMediaLeft ? 'order-1' : 'order-1 lg:order-2'}
                  >
                    <div className="projects-showcase-media">
                      <Image
                        src={`/${project.cover}`}
                        alt={project.title}
                        width={1024}
                        height={1024}
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="projects-showcase-image"
                      />
                    </div>
                  </motion.div>

                  <div
                    className={`projects-showcase-copy ${
                      isMediaLeft ? 'order-2' : 'order-2 lg:order-1'
                    }`}
                  >
                    <div className="projects-showcase-meta">
                      <p className="editorial-kicker">{project.sequenceLabel}</p>
                      <h2 className="projects-showcase-title mt-3">{project.title}</h2>
                      <p className="editorial-body mt-5">{project.description}</p>
                    </div>

                    <div className="projects-showcase-stack">
                      <p className="editorial-kicker">{projectsContent.stackLabel}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
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
                </div>
              </motion.article>
            )
          })}
        </section>
      </div>
    </main>
  )
}

export default Projects
