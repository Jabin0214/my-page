'use client'

import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '../../../src/config/site'
import { usePortfolioContent } from '../../../src/hooks/usePortfolioContent'

const Contact = () => {
  const { contact } = usePortfolioContent()
  const links = [
    {
      label: contact.emailLabel,
      value: SITE_CONFIG.contact.email,
      href: `mailto:${SITE_CONFIG.contact.email}`,
      icon: Mail,
    },
    {
      label: contact.githubLabel,
      value: 'github.com/Jabin0214',
      href: SITE_CONFIG.contact.github,
      icon: Github,
    },
    {
      label: contact.linkedinLabel,
      value: 'linkedin.com/in/jabinchen',
      href: SITE_CONFIG.contact.linkedin,
      icon: Linkedin,
    },
  ]

  return (
    <main className="minimal-content-page minimal-contact-page">
      <section className="minimal-page-hero minimal-contact-hero">
        <p className="minimal-kicker">{contact.sectionTitle}</p>
        <h1>{contact.title}</h1>
      </section>

      <section className="minimal-contact-grid">
        <div className="minimal-contact-links">
          {links.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="minimal-contact-link"
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
              <strong>{value}</strong>
            </a>
          ))}
        </div>

        <div className="minimal-contact-note">
          <p>{contact.noteBody}</p>
          <div>
            <MapPin className="h-4 w-4" />
            <span>{SITE_CONFIG.location}</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
