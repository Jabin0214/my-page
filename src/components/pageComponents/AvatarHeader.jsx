'use client';

import Link from 'next/link';
import DownloadButton from '../functionalComponents/DownloadButton';
import { SITE_CONFIG } from '../../config/site';
import { usePortfolioContent } from '../../hooks/usePortfolioContent';

const AvatarHeader = () => {
  const { home, navigation } = usePortfolioContent();
  const hero = home.hero;
  const chatLink = navigation.links.find((link) => link.path === SITE_CONFIG.contact.chat);
  const heroFacts = [
    { label: 'Base', value: SITE_CONFIG.location },
    { label: 'Focus', value: 'Full-stack + AI product work' },
    { label: 'Style', value: 'Curious, pragmatic, ship-minded' },
  ];

  return (
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
          <Link href={hero.primaryLink.path} className="button-primary">
            {hero.primaryLink.label}
          </Link>
          <Link href={hero.secondaryLink.path} className="button-secondary">
            {hero.secondaryLink.label}
          </Link>
          <DownloadButton label="Resume" />
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
          <span className="eyebrow">Quick read</span>
          <Link href={SITE_CONFIG.contact.chat} className="text-sm font-semibold text-[#0f766e] hover:text-[#115e59]">
            {chatLink?.label || 'Chat'}
          </Link>
        </div>

        <div className="surface-subtle px-5 py-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0f766e]">In one sentence</p>
          <p className="mt-3 text-base leading-7 text-[#526072]">{hero.chatBubbleText}</p>
          <Link href={SITE_CONFIG.contact.chat} className="mt-5 inline-flex items-center text-sm font-semibold text-[#0f766e] hover:text-[#115e59]">
            Ask me directly
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
  );
};

export default AvatarHeader;
