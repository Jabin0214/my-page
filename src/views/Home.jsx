'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AvatarHeader from '../components/pageComponents/AvatarHeader';
import SectionCard from '../components/shared/SectionCard';
import { usePortfolioContent } from '../hooks/usePortfolioContent';
import { getAssetPath } from '../lib/assets';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  const content = usePortfolioContent();
  const about = content.home.about;
  const homeUi = content.home.ui;
  const featuredProjects = useMemo(() => content.projects.list.slice(0, 3), [content.projects.list]);

  const experienceItems = useMemo(
    () => about.experience.items.map((item, index) => ({ ...item, key: index + 1 })),
    [about.experience.items]
  );

  return (
    <main className="page-shell pb-24 pt-16">
      <div className="space-y-8">
        <AvatarHeader />

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <SectionCard>
            <span className="eyebrow">{about.whoAmI.title}</span>
            <h2 className="mt-5 text-3xl font-semibold md:text-4xl">A clear picture of how I work</h2>
            <div className="mt-5 space-y-4 text-[1.02rem] leading-8 text-[#526072]">
              {about.whoAmI.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
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
          </SectionCard>
        </motion.section>

        <SectionCard>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">{homeUi.featuredWorkLabel}</span>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{homeUi.featuredWorkTitle}</h2>
            </div>
            <Link href="/projects" className="button-secondary">
              {homeUi.featuredWorkLink}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <article key={project.id} className="surface-subtle overflow-hidden p-4">
                <div className="overflow-hidden rounded-[1rem] border border-[var(--line)] bg-[var(--bg-soft)]">
                  <img
                    src={getAssetPath(project.cover)}
                    alt={project.title}
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
        </SectionCard>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <SectionCard>
            <span className="eyebrow">{about.experience.title}</span>
            <div className="mt-6 space-y-4">
              {experienceItems.map((item) => (
                <article key={item.key} className="surface-subtle px-5 py-5">
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
          </SectionCard>

          <div className="space-y-6">
            <SectionCard>
              <span className="eyebrow">{about.education.title}</span>
              <div className="mt-5 space-y-3">
                {about.education.degrees.map((degree) => (
                  <div key={degree} className="surface-subtle px-4 py-4 text-sm leading-7 text-[#526072]">
                    {degree}
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <span className="eyebrow">{about.languages.title}</span>
              <p className="mt-5 text-base leading-7 text-[#526072]">{about.languages.list}</p>
              <div className="mt-6 border-t border-[var(--line)] pt-6">
                <span className="eyebrow">{about.hobbies.title}</span>
                <p className="mt-4 text-base leading-7 text-[#526072]">{about.hobbies.list}</p>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
