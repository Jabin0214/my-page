import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildChatRequestBody,
  CHAT_LIMITS,
  enforceChatRateLimit,
  getClientIdentifier,
  isRequestTooLarge,
  normalizeHistory,
  resetChatRateLimitStore,
  validateChatPayload,
} from '../src/lib/chat.js'

test('validateChatPayload rejects blank messages', () => {
  const result = validateChatPayload({ message: '   ' })

  assert.equal(result.ok, false)
  assert.equal(result.status, 400)
})

test('normalizeHistory filters unsupported roles and truncates content', () => {
  const history = normalizeHistory([
    { role: 'system', content: 'ignore me' },
    { role: 'user', content: `  ${'a'.repeat(CHAT_LIMITS.maxHistoryMessageLength + 25)}  ` },
    { role: 'assistant', content: '  grounded reply  ' },
  ])

  assert.equal(history.length, 2)
  assert.equal(history[0].content.length, CHAT_LIMITS.maxHistoryMessageLength)
  assert.equal(history[1].content, 'grounded reply')
})

test('validateChatPayload rejects messages beyond the allowed limit', () => {
  const result = validateChatPayload({ message: 'a'.repeat(CHAT_LIMITS.maxMessageLength + 1) })

  assert.equal(result.ok, false)
  assert.equal(result.status, 400)
})

test('enforceChatRateLimit blocks once the request budget is exhausted', () => {
  resetChatRateLimitStore()

  for (let attempt = 0; attempt < CHAT_LIMITS.rateLimitMaxRequests; attempt += 1) {
    assert.equal(enforceChatRateLimit('127.0.0.1:test-agent').ok, true)
  }

  const blocked = enforceChatRateLimit('127.0.0.1:test-agent')
  assert.equal(blocked.ok, false)
  assert.ok(blocked.retryAfterSeconds >= 1)
})

test('request helpers derive client identity and size limits from headers', () => {
  const headers = new Headers({
    'content-length': String(CHAT_LIMITS.maxRequestBytes + 1),
    'x-forwarded-for': '203.0.113.10, 10.0.0.1',
    'user-agent': 'Playwright',
  })

  assert.equal(isRequestTooLarge(headers), true)
  assert.equal(getClientIdentifier(headers), '203.0.113.10:Playwright')
})

test('buildChatRequestBody keeps the system prompt and user payload intact', () => {
  const body = buildChatRequestBody({
    message: 'Tell me about Medimate.',
    history: [{ role: 'assistant', content: 'Previous answer.' }],
    chatModel: 'gpt-4o-mini',
    vectorStoreId: 'vs_test',
  })

  assert.equal(body.model, 'gpt-4o-mini')
  assert.equal(body.tools[0].vector_store_ids[0], 'vs_test')
  assert.equal(body.input.at(-1).content, 'Tell me about Medimate.')
  assert.equal(body.input[1].content, 'Previous answer.')
})
