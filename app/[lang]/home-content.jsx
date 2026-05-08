'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { SITE_CONFIG } from '../../src/config/site'
import { useLanguage } from '../../src/hooks/useLanguage'
import { usePortfolioContent } from '../../src/hooks/usePortfolioContent'
import {
  getExperienceHighlights,
  getFeaturedProjects,
} from '../../src/lib/homepage'

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

function RevealSection({ children, className = '' }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function MinimalSectionHeading({ label, title, action }) {
  return (
    <div className="minimal-section-heading">
      <div>
        <p className="minimal-kicker">{label}</p>
        <h2>{title}</h2>
      </div>
      {action ? <div className="minimal-heading-action">{action}</div> : null}
    </div>
  )
}

const Home = () => {
  const content = usePortfolioContent()
  const { localizePath } = useLanguage()
  const hero = content.home.hero
  const about = content.home.about
  const homeUi = content.home.ui
  const resumeUrl = `/${SITE_CONFIG.contact.resumeFileName}`
  const featuredProjects = getFeaturedProjects(content.projects.list)
  const experienceItems = getExperienceHighlights(about.experience.items)
  const signals = [
    'Production-minded',
    'Workflow first',
    'AI as leverage',
  ]

  return (
    <main className="homepage-minimal">
      <section className="minimal-hero" aria-label="Homepage introduction">
        <div className="minimal-hero-center">
          <p className="minimal-hero-label">{hero.badge}</p>
          <h1>{hero.title}</h1>
        </div>

        <div className="minimal-hero-signals" aria-label="Work signals">
          {signals.map((signal) => (
            <article key={signal} className="minimal-signal">
              <strong>{signal}</strong>
            </article>
          ))}
        </div>
      </section>

      <div className="minimal-page-shell">
        <RevealSection className="minimal-intro-grid">
          <div>
            <p className="minimal-kicker">{homeUi.introLabel}</p>
            <h2 className="minimal-large-heading">{homeUi.introTitle}</h2>
          </div>
          <div className="minimal-copy-stack">
            {about.whoAmI.paragraphs.slice(0, 1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="minimal-action-row">
              <Link href={localizePath(hero.primaryLink.path)} className="minimal-button minimal-button-primary">
                {hero.primaryLink.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localizePath(hero.secondaryLink.path)} className="minimal-button">
                {hero.secondaryLink.label}
              </Link>
              <a
                href={resumeUrl}
                download={SITE_CONFIG.contact.resumeFileName}
                className="minimal-icon-button"
                aria-label={hero.resumeLabel}
              >
                <Download className="h-5 w-5" />
              </a>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="minimal-section">
          <MinimalSectionHeading
            label={homeUi.featuredWorkLabel}
            title={homeUi.featuredWorkTitle}
            action={
              <Link href={localizePath('/projects')} className="minimal-inline-link">
                {homeUi.featuredWorkLink}
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          <div className="minimal-project-list">
            {featuredProjects.map((project, index) => (
              <article key={project.id} className="minimal-project-row">
                <div className="minimal-project-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="minimal-project-media">
                  <Image
                    src={`/${project.cover}`}
                    alt={project.title}
                    width={960}
                    height={720}
                    sizes="(max-width: 900px) 100vw, 52vw"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="minimal-project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="minimal-tag-row">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="minimal-section minimal-split-section">
          <MinimalSectionHeading
            label={homeUi.signalsTitle}
            title={homeUi.workStyleTitle}
          />
          <div className="minimal-line-list">
            {homeUi.signals.map((signal) => (
              <p key={signal}>{signal}</p>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="minimal-section">
          <MinimalSectionHeading
            label={homeUi.experienceSnapshotLabel}
            title={homeUi.experienceSnapshotTitle}
          />
          <div className="minimal-experience-grid">
            {experienceItems.map((item) => (
              <article key={item.company} className="minimal-experience-card">
                <p className="minimal-kicker">{item.duration}</p>
                <h3>{item.company}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="minimal-section minimal-skills-section">
          <div>
            <p className="minimal-kicker">{about.skills.title || homeUi.skillSectionTitle}</p>
            <h2>{homeUi.detailLabel}</h2>
            <p>{about.languages.list}</p>
            <p>{about.hobbies.list}</p>
          </div>
          <div className="minimal-skill-cloud">
            {about.skills.list.slice(0, 8).map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </RevealSection>
      </div>
    </main>
  )
}

export default Home
