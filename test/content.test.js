import test from 'node:test'
import assert from 'node:assert/strict'
import { getPortfolioContent, resolveContentLocale } from '../src/content/portfolio-content.js'
import { normalizeLanguage } from '../src/lib/language.js'

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
})
