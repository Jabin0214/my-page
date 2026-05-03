'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { SITE_CONFIG } from '../../src/config/site'
import { useLanguage } from '../../src/hooks/useLanguage'
import { usePortfolioContent } from '../../src/hooks/usePortfolioContent'
import {
  buildHeroFacts,
  getExperienceHighlights,
  getFeaturedProjects,
} from '../../src/lib/homepage'

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

function RevealSection({ children, className = '' }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function SectionHeading({ label, title, description, action }) {
  return (
    <div className="editorial-section-heading">
      <div className="max-w-3xl">
        <span className="eyebrow">{label}</span>
        <h2 className="editorial-heading mt-5">{title}</h2>
        {description ? <p className="editorial-body mt-4 max-w-2xl">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
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
  const heroFacts = buildHeroFacts(hero, SITE_CONFIG.location)
  const featuredProjects = getFeaturedProjects(content.projects.list)
  const experienceItems = getExperienceHighlights(about.experience.items)

  return (
    <main className="page-shell homepage-editorial pb-24 pt-14 md:pt-20">
      <div className="space-y-16 md:space-y-24">
        <RevealSection className="homepage-hero">
          <div className="editorial-divider" />
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)] lg:items-start">
            <div>
              <span className="eyebrow">{hero.badge}</span>
              <h1 className="editorial-display mt-8 max-w-5xl">{hero.title}</h1>
              <p className="editorial-lead mt-6 max-w-3xl">
                {hero.description}. {hero.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={localizePath(hero.primaryLink.path)} className="button-primary">
                  {hero.primaryLink.label}
                </Link>
                <Link href={localizePath(hero.secondaryLink.path)} className="button-secondary">
                  {hero.secondaryLink.label}
                </Link>
                <a
                  href={resumeUrl}
                  download={SITE_CONFIG.contact.resumeFileName}
                  aria-label={hero.resumeLabel}
                  className="button-secondary"
                >
                  <Download className="h-5 w-5" />
                  <span>{hero.resumeLabel}</span>
                </a>
              </div>
            </div>

            <aside className="editorial-sidepanel">
              <div className="editorial-sidepanel-block">
                <p className="editorial-kicker">{hero.quickReadLabel}</p>
                <p className="editorial-side-copy mt-3">{hero.chatBubbleText}</p>
                <Link
                  href={localizePath(SITE_CONFIG.contact.chat)}
                  className="editorial-inline-link mt-5"
                >
                  {hero.askDirectlyLabel}
                </Link>
              </div>

              <div className="grid gap-3">
                {heroFacts.map((fact) => (
                  <div key={fact.label} className="editorial-stat">
                    <p className="editorial-kicker">{fact.label}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{fact.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3">
                {hero.notes.map((note) => (
                  <div key={note.label} className="editorial-note">
                    <p className="editorial-kicker">{note.label}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{note.text}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </RevealSection>

        <RevealSection className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <div>
            <span className="eyebrow">{homeUi.introLabel}</span>
            <h2 className="editorial-heading mt-5 max-w-3xl">{homeUi.introTitle}</h2>
            <p className="editorial-lead mt-5 max-w-3xl text-[1.15rem]">{homeUi.introAccent}</p>
            <div className="mt-7 space-y-5">
              {about.whoAmI.paragraphs.map((paragraph) => (
                <p key={paragraph} className="editorial-body max-w-3xl">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="editorial-sidepanel gap-5">
            <div className="editorial-sidepanel-block">
              <p className="editorial-kicker">{hero.oneSentenceLabel}</p>
              <p className="editorial-side-copy mt-3">{hero.chatBubbleText}</p>
            </div>
            <div className="editorial-quote">
              <p>{homeUi.workStyleIntro}</p>
            </div>
          </div>
        </RevealSection>

        <RevealSection>
          <SectionHeading
            label={homeUi.featuredWorkLabel}
            title={homeUi.featuredWorkTitle}
            description={homeUi.selectedWorkIntro}
            action={
              <Link href={localizePath('/projects')} className="button-secondary">
                {homeUi.featuredWorkLink}
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <article key={project.id} className="editorial-project-card">
                <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--bg-soft)]">
                  <Image
                    src={`/${project.cover}`}
                    alt={project.title}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="h-56 w-full object-cover"
                  />
                </div>
                <p className="editorial-kicker mt-5">
                  {homeUi.projectLabelPrefix} {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold tracking-[-0.03em] text-[var(--text)]">
                  {project.title}
                </h3>
                <p className="editorial-body mt-4">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
          <div>
            <SectionHeading
              label={homeUi.signalsTitle}
              title={homeUi.workStyleTitle}
              description={homeUi.workStyleIntro}
            />

            <div className="mt-8 grid gap-4">
              {homeUi.signals.map((signal) => (
                <div key={signal} className="editorial-line-card">
                  <p className="editorial-body">{signal}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="editorial-sidepanel gap-6">
            <div className="editorial-sidepanel-block">
              <p className="editorial-kicker">{about.skills.title || homeUi.skillSectionTitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.skills.list.map((skill) => (
                  <span key={skill} className="tag-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="editorial-sidepanel-block">
              <p className="editorial-kicker">{homeUi.detailLabel}</p>
              <p className="editorial-side-copy mt-3">
                {about.languages.list}
              </p>
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{about.hobbies.list}</p>
            </div>
          </aside>
        </RevealSection>

        <RevealSection className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <div>
            <SectionHeading
              label={homeUi.experienceSnapshotLabel}
              title={homeUi.experienceSnapshotTitle}
              description={homeUi.experienceSnapshotDescription}
            />

            <div className="mt-8 space-y-6">
              {experienceItems.map((item, index) => (
                <article key={`${item.company}-${index}`} className="editorial-timeline-item">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-xl">
                      <p className="editorial-kicker">{item.duration}</p>
                      <h3 className="mt-2 font-serif text-2xl font-semibold tracking-[-0.03em] text-[var(--text)]">
                        {item.company}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-[var(--muted)]">{item.description}</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {item.points.slice(0, 2).map((point) => (
                      <li key={point} className="editorial-list-item">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        <span className="text-sm leading-7 text-[var(--muted)]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <aside className="editorial-sidepanel gap-6">
            <div className="editorial-sidepanel-block">
              <p className="editorial-kicker">{homeUi.educationLabel}</p>
              <div className="mt-4 space-y-3">
                {about.education.degrees.map((degree) => (
                  <div key={degree} className="editorial-detail-row">
                    {degree}
                  </div>
                ))}
              </div>
            </div>

            <div className="editorial-sidepanel-block">
              <p className="editorial-kicker">{hero.quickReadLabel}</p>
              <Link
                href={localizePath(SITE_CONFIG.contact.chat)}
                className="editorial-inline-link mt-3"
              >
                {hero.askDirectlyLabel}
              </Link>
              <Link
                href={localizePath(hero.secondaryLink.path)}
                className="editorial-inline-link mt-3"
              >
                {hero.secondaryLink.label}
              </Link>
            </div>
          </aside>
        </RevealSection>
      </div>
    </main>
  )
}

export default Home
