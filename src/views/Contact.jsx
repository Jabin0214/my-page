'use client';

import { Github, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { usePortfolioContent } from '../hooks/usePortfolioContent';

const Contact = () => {
  const { contact } = usePortfolioContent();
  return (
    <main className="page-shell pb-20 pt-16">
      <section className="surface-card-strong grid gap-6 px-6 py-8 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-10">
        <div className="flex flex-col justify-center">
          <span className="eyebrow">{contact.sectionTitle}</span>
          <h1 className="mt-5 text-4xl font-semibold md:text-5xl">Let&apos;s make it easy to reach me.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#526072]">
            {contact.description}
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="surface-subtle flex items-center gap-3 px-4 py-4 text-base text-[#526072] hover:border-[rgba(15,118,110,0.24)] hover:text-[#101828]"
            >
              <Mail className="h-7 w-7" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">{contact.emailLabel}</p>
                <p className="mt-1">{SITE_CONFIG.contact.email}</p>
              </div>
            </a>
            <a
              href={SITE_CONFIG.contact.github}
              className="surface-subtle flex items-center gap-3 px-4 py-4 text-base text-[#526072] hover:border-[rgba(15,118,110,0.24)] hover:text-[#101828]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-7 w-7" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">{contact.githubLabel}</p>
                <p className="mt-1">{SITE_CONFIG.contact.github}</p>
              </div>
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="surface-subtle px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">{contact.noteLabel}</p>
            <p className="mt-3 text-base leading-8 text-[#526072]">{contact.noteBody}</p>
          </div>
          <div className="surface-subtle px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">Context</p>
            <p className="mt-3 text-base leading-8 text-[#526072]">{contact.noteFooter}</p>
          </div>
          <div className="surface-subtle px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">Based in</p>
            <p className="mt-3 text-base leading-8 text-[#526072]">{SITE_CONFIG.location}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
