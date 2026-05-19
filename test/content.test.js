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
import { SITE_CONFIG } from '../src/config/site.js'
import {
  getExperienceHighlights,
  getFeaturedProjects,
} from '../src/lib/homepage.js'
import { buildProjectShowcase } from '../src/lib/projects.js'
import { buildSystemPrompt } from '../src/lib/chat.js'

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
  assert.equal(english.chat.copyLabel, 'Copy message')
  assert.equal(english.chat.copiedLabel, 'Copied')
  assert.equal(english.chat.techExplainerTitle, 'How this clone actually works')
  assert.ok(english.chat.techExplainerSteps.some((step) => /Vector store/.test(step.title)))
  assert.equal(chinese.chat.copyLabel, '复制消息')
  assert.equal(chinese.chat.copiedLabel, '已复制')
  assert.equal(chinese.chat.techExplainerTitle, '这个复制人背后怎么工作的')
  assert.ok(chinese.chat.techExplainerSteps.some((step) => /向量库/.test(step.title)))
  assert.equal(
    english.home.hero.title,
    'When code is no longer scarce, what is left for developers?'
  )
  assert.equal(chinese.home.ui.experienceSnapshotTitle, '最能代表我现在工作方式的几段经历')
  assert.equal(
    english.projects.list[0].title,
    'The Oneness Association — Production Non-Profit Platform'
  )
  assert.equal(
    english.contact.title,
    'A straightforward way to reach me for roles, projects, or useful conversations.'
  )
  assert.equal(english.contact.linkedinLabel, 'LinkedIn')
})

test('site config exposes the updated public identity links', () => {
  assert.equal(SITE_CONFIG.contact.email, 'jabinchen0214@gmail.com')
  assert.equal(
    SITE_CONFIG.social.linkedin,
    'https://linkedin.com/in/jabinchen-590929276'
  )
  assert.ok(
    SITE_CONFIG.profileUrls.includes('https://linkedin.com/in/jabinchen-590929276')
  )
})

test('chat system prompt embeds persona rules and knowledge ground truth', () => {
  const prompt = buildSystemPrompt()
  assert.match(prompt, /Jabin Chen/)
  assert.match(prompt, /陈茁彬/)
  assert.match(prompt, /Knowledge/)
  assert.match(prompt, /friends-chat style/)
  assert.match(prompt, /FinanceBro/)
  assert.doesNotMatch(prompt, /陈嘉彬/)
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

test('homepage helpers curate featured projects and experience highlights', () => {
  const english = getPortfolioContent('en')
  const featuredProjects = getFeaturedProjects(english.projects.list)
  const experienceHighlights = getExperienceHighlights(english.home.about.experience.items)

  assert.equal(featuredProjects.length, 3)
  assert.equal(
    featuredProjects[0].title,
    'The Oneness Association — Production Non-Profit Platform'
  )
  assert.equal(experienceHighlights.length, 3)
  assert.equal(experienceHighlights[0].company, 'ST International Ltd')
})

test('projects helper adds sequence labels and alternating media rhythm', () => {
  const english = getPortfolioContent('en')
  const showcase = buildProjectShowcase(english.projects.list, 'Project')

  assert.equal(showcase.length, 5)
  assert.equal(showcase[0].sequenceLabel, 'Project 01')
  assert.equal(showcase[0].mediaSide, 'left')
  assert.equal(showcase[1].sequenceLabel, 'Project 02')
  assert.equal(showcase[1].mediaSide, 'right')
  assert.equal(showcase[2].title, 'FinanceBro — AI Investment Assistant for Telegram')
})
