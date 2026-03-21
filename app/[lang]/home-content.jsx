'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { SITE_CONFIG } from '../../src/config/site'
import { useLanguage } from '../../src/hooks/useLanguage'
import { usePortfolioContent } from '../../src/hooks/usePortfolioContent'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function AnimatedSectionCard({ children, className = '' }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      className={`surface-card p-8 text-[#101828] ${className}`}
    >
      {children}
    </motion.section>
  )
}

const Home = () => {
  const content = usePortfolioContent()
  const { localizePath } = useLanguage()
  const hero = content.home.hero
  const about = content.home.about
  const homeUi = content.home.ui
  const chatLink = content.navigation.links.find(
    (link) => link.path === SITE_CONFIG.contact.chat
  )
  const resumeUrl = `/${SITE_CONFIG.contact.resumeFileName}`
  const chatPath = localizePath(SITE_CONFIG.contact.chat)
  const heroFacts = [
    { label: hero.factLabels.base, value: SITE_CONFIG.location },
    { label: hero.factLabels.focus, value: hero.factValues.focus },
    { label: hero.factLabels.style, value: hero.factValues.style },
  ]
  const featuredProjects = content.projects.list.slice(0, 3)
  const experienceItems = about.experience.items

  return (
    <main className="page-shell pb-24 pt-16">
      <div className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="surface-card-strong px-6 py-8 md:px-10 md:py-10">
            <span className="eyebrow">{hero.badge}</span>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.92] text-[#101828] md:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#526072] md:text-xl">
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
                <Download className="w-5 h-5" />
                <span>{hero.resumeLabel}</span>
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroFacts.map((fact) => (
                <div key={fact.label} className="surface-subtle px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">{fact.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#526072]">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card flex flex-col gap-6 px-6 py-8 md:px-8 md:py-10">
            <div className="flex items-center justify-between gap-3">
              <span className="eyebrow">{hero.quickReadLabel}</span>
              <Link href={chatPath} className="text-sm font-semibold text-[#0f766e] hover:text-[#115e59]">
                {chatLink?.label || 'Chat'}
              </Link>
            </div>

            <div className="surface-subtle px-5 py-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0f766e]">{hero.oneSentenceLabel}</p>
              <p className="mt-3 text-base leading-7 text-[#526072]">{hero.chatBubbleText}</p>
              <Link href={chatPath} className="mt-5 inline-flex items-center text-sm font-semibold text-[#0f766e] hover:text-[#115e59]">
                {hero.askDirectlyLabel}
              </Link>
            </div>

            <div className="grid gap-3">
              {hero.notes.map((note) => (
                <div key={note.label} className="surface-subtle px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">{note.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#526072]">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <AnimatedSectionCard>
            <span className="eyebrow">{about.whoAmI.title}</span>
            <h2 className="mt-5 text-3xl font-semibold md:text-4xl">{homeUi.workStyleTitle}</h2>
            <div className="mt-5 space-y-4 text-[1.02rem] leading-8 text-[#526072]">
              {about.whoAmI.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSectionCard>

          <AnimatedSectionCard>
            <span className="eyebrow">{homeUi.signalsTitle}</span>
            <div className="mt-5 grid gap-3">
              {homeUi.signals.map((signal) => (
                <div key={signal} className="surface-subtle px-4 py-4">
                  <p className="text-sm leading-7 text-[#526072]">{signal}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">{about.skills.title || homeUi.skillSectionTitle}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {about.skills.list.map((skill) => (
                  <span key={skill} className="tag-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSectionCard>
        </motion.section>

        <AnimatedSectionCard>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">{homeUi.featuredWorkLabel}</span>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{homeUi.featuredWorkTitle}</h2>
            </div>
            <Link href={localizePath('/projects')} className="button-secondary">
              {homeUi.featuredWorkLink}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <article key={project.id} className="surface-subtle overflow-hidden p-4">
                <div className="overflow-hidden rounded-[1rem] border border-[var(--line)] bg-[var(--bg-soft)]">
                  <Image
                    src={`/${project.cover}`}
                    alt={project.title}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="h-48 w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                  {homeUi.projectLabelPrefix} {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#526072]">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </AnimatedSectionCard>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <AnimatedSectionCard>
            <span className="eyebrow">{about.experience.title}</span>
            <div className="mt-6 space-y-4">
              {experienceItems.map((item, index) => (
                <article key={`${item.company}-${index}`} className="surface-subtle px-5 py-5">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{item.company}</h3>
                      <p className="mt-1 text-sm font-medium text-[#0f766e]">{item.duration}</p>
                    </div>
                    <p className="max-w-xl text-sm leading-7 text-[#526072]">{item.description}</p>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-[#526072]">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0f766e]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </AnimatedSectionCard>

          <div className="space-y-6">
            <AnimatedSectionCard>
              <span className="eyebrow">{about.education.title}</span>
              <div className="mt-5 space-y-3">
                {about.education.degrees.map((degree) => (
                  <div key={degree} className="surface-subtle px-4 py-4 text-sm leading-7 text-[#526072]">
                    {degree}
                  </div>
                ))}
              </div>
            </AnimatedSectionCard>

            <AnimatedSectionCard>
              <span className="eyebrow">{about.languages.title}</span>
              <p className="mt-5 text-base leading-7 text-[#526072]">{about.languages.list}</p>
              <div className="mt-6 border-t border-[var(--line)] pt-6">
                <span className="eyebrow">{about.hobbies.title}</span>
                <p className="mt-4 text-base leading-7 text-[#526072]">{about.hobbies.list}</p>
              </div>
            </AnimatedSectionCard>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
