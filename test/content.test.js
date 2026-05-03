import test from 'node:test'
import assert from 'node:assert/strict'
import { getPortfolioContent, resolveContentLocale } from '../src/content/portfolio-content.js'
import {
  detectLanguageFromAcceptLanguage,
  getLanguageFromPath,
  getPathWithoutLanguage,
  localizePath,
  normalizeLanguage,
  resolveLanguageParam,
} from '../src/lib/language.js'
import {
  buildAlternateLanguageLinks,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
} from '../src/lib/metadata.js'
import {
  buildHeroFacts,
  getExperienceHighlights,
  getFeaturedProjects,
} from '../src/lib/homepage.js'
import { buildProjectShowcase } from '../src/lib/projects.js'

test('normalizeLanguage and resolveContentLocale map Chinese variants to zh', () => {
  assert.equal(normalizeLanguage('zh-CN'), 'zh')
  assert.equal(resolveContentLocale('zh-NZ'), 'zh')
  assert.equal(resolveContentLocale('en-US'), 'en')
})

test('portfolio content exposes localized chat prompts and contact headings', () => {
  const english = getPortfolioContent('en')
  const chinese = getPortfolioContent('zh-CN')

  assert.ok(english.chat.suggestedQuestions.length > 0)
  assert.ok(chinese.chat.suggestedQuestions.length > 0)
  assert.equal(english.contact.title, "Let's make it easy to reach me.")
  assert.equal(chinese.contact.basedInLabel, '所在城市')
  assert.equal(english.home.ui.introLabel, 'Editorial introduction')
  assert.equal(english.home.ui.selectedWorkIntro, 'A few projects that best show how I think and build.')
  assert.equal(chinese.home.ui.experienceSnapshotTitle, '一些能说明我做事方式的经历')
  assert.equal(english.projects.showcaseIntroLabel, 'Showcase view')
  assert.equal(english.projects.showcaseClosing, 'A few things I wanted to feel: clear intent, strong interaction, and enough taste to be remembered.')
  assert.equal(chinese.projects.showcaseNote, '这些项目不是为了凑作品数量，而是因为它们各自都让我想认真把它做完整。')
})

test('language route helpers localize and strip prefixed paths', () => {
  assert.equal(resolveLanguageParam('zh'), 'zh')
  assert.equal(getLanguageFromPath('/zh/projects'), 'zh')
  assert.equal(getPathWithoutLanguage('/en/chat'), '/chat')
  assert.equal(localizePath('/projects', 'zh'), '/zh/projects')
  assert.equal(localizePath('/zh/contact', 'en'), '/en/contact')
})

test('accept-language detection respects quality values', () => {
  assert.equal(
    detectLanguageFromAcceptLanguage('en-US;q=0.7, zh-CN;q=0.9'),
    'zh'
  )
})

test('alternate language links use the root URL as x-default', () => {
  const alternates = buildAlternateLanguageLinks('/projects')

  assert.equal(alternates.en, 'https://jabinchen.com/en/projects')
  assert.equal(alternates.zh, 'https://jabinchen.com/zh/projects')
  assert.equal(alternates['x-default'], 'https://jabinchen.com/projects')
})

test('person structured data identifies Jabin Chen official profiles', () => {
  const person = buildPersonJsonLd({ language: 'en', path: '/' })

  assert.equal(person['@type'], 'Person')
  assert.equal(person.name, 'Jabin Chen')
  assert.ok(person.alternateName.includes('JabinChen'))
  assert.equal(person.url, 'https://jabinchen.com/en')
  assert.ok(person.sameAs.includes('https://jabinchen.com'))
  assert.ok(person.sameAs.includes('https://github.com/Jabin0214'))
})

test('website structured data exposes Jabin Chen search identity', () => {
  const website = buildWebsiteJsonLd({ language: 'zh', path: '/' })

  assert.equal(website['@type'], 'WebSite')
  assert.equal(website.url, 'https://jabinchen.com/zh')
  assert.equal(website.publisher.name, 'Jabin Chen')
  assert.ok(website.about.alternateName.includes('JabinChen'))
})

test('homepage helpers curate hero facts, featured projects, and experience highlights', () => {
  const english = getPortfolioContent('en')
  const heroFacts = buildHeroFacts(english.home.hero, 'Auckland, New Zealand')
  const featuredProjects = getFeaturedProjects(english.projects.list)
  const experienceHighlights = getExperienceHighlights(english.home.about.experience.items)

  assert.deepEqual(heroFacts, [
    { label: 'Base', value: 'Auckland, New Zealand' },
    { label: 'Focus', value: 'Full-stack + AI product work' },
    { label: 'Style', value: 'Curious, pragmatic, ship-minded' },
  ])
  assert.equal(featuredProjects.length, 3)
  assert.equal(featuredProjects[0].title, 'Medimate - AI-powered Medication Assistance')
  assert.equal(experienceHighlights.length, 3)
  assert.equal(
    experienceHighlights[0].company,
    'FRW Healthcare Limited & ICT Graduate School'
  )
})

test('projects helper adds sequence labels and alternating media rhythm', () => {
  const english = getPortfolioContent('en')
  const showcase = buildProjectShowcase(english.projects.list, 'Project')

  assert.equal(showcase.length, 4)
  assert.equal(showcase[0].sequenceLabel, 'Project 01')
  assert.equal(showcase[0].mediaSide, 'left')
  assert.equal(showcase[1].sequenceLabel, 'Project 02')
  assert.equal(showcase[1].mediaSide, 'right')
  assert.equal(showcase[3].title, 'COVID-19 Impact Analysis with Machine Learning')
})
