import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildChatRequestBody,
  buildSystemPrompt,
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
    assert.equal(enforceChatRateLimit('203.0.113.1').ok, true)
  }

  const blocked = enforceChatRateLimit('203.0.113.1')
  assert.equal(blocked.ok, false)
  assert.ok(blocked.retryAfterSeconds >= 1)
})

test('getClientIdentifier returns IP only and ignores user-agent', () => {
  const headers = new Headers({
    'content-length': String(CHAT_LIMITS.maxRequestBytes + 1),
    'x-forwarded-for': '203.0.113.10, 10.0.0.1',
    'user-agent': 'Playwright',
  })

  assert.equal(isRequestTooLarge(headers), true)
  assert.equal(getClientIdentifier(headers), '203.0.113.10')
})

test('buildChatRequestBody includes inlined system prompt and user payload', () => {
  const body = buildChatRequestBody({
    message: 'Tell me about Medimate.',
    history: [{ role: 'assistant', content: 'Previous answer.' }],
    chatModel: 'gpt-4o-mini',
    systemPrompt: 'You are Jabin.',
  })

  assert.equal(body.model, 'gpt-4o-mini')
  assert.equal(body.input[0].role, 'system')
  assert.equal(body.input[0].content, 'You are Jabin.')
  assert.equal(body.input[1].content, 'Previous answer.')
  assert.equal(body.input.at(-1).content, 'Tell me about Medimate.')
  assert.equal(body.tools, undefined)
  assert.equal(body.stream, undefined)
})

test('buildChatRequestBody enables stream flag when requested', () => {
  const body = buildChatRequestBody({
    message: 'Hi',
    history: [],
    chatModel: 'gpt-4o-mini',
    systemPrompt: 'sys',
    stream: true,
  })

  assert.equal(body.stream, true)
})

test('buildSystemPrompt embeds knowledge content', () => {
  const prompt = buildSystemPrompt()
  assert.ok(prompt.includes('Jabin Chen'))
  assert.ok(prompt.includes('Knowledge'))
  // At least one knowledge file got pulled in
  assert.ok(prompt.includes('Schedora') || prompt.includes('Medimate'))
})
