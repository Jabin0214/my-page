const DEFAULT_CHAT_MODEL = 'gpt-4o-mini'
const DEFAULT_CHAT_TIMEOUT_MS = 20000
const DEFAULT_MAX_REQUEST_BYTES = 32 * 1024
const DEFAULT_MAX_MESSAGE_LENGTH = 2000
const DEFAULT_MAX_HISTORY_MESSAGES = 8
const DEFAULT_MAX_HISTORY_MESSAGE_LENGTH = 1200
const DEFAULT_RATE_LIMIT_WINDOW_MS = 60 * 1000
const DEFAULT_RATE_LIMIT_MAX_REQUESTS = 8

const requestBuckets = new Map()

export const CHAT_LIMITS = {
  timeoutMs: Number(process.env.OPENAI_CHAT_TIMEOUT_MS) || DEFAULT_CHAT_TIMEOUT_MS,
  maxRequestBytes: Number(process.env.CHAT_MAX_REQUEST_BYTES) || DEFAULT_MAX_REQUEST_BYTES,
  maxMessageLength: Number(process.env.CHAT_MAX_MESSAGE_LENGTH) || DEFAULT_MAX_MESSAGE_LENGTH,
  maxHistoryMessages: Number(process.env.CHAT_MAX_HISTORY_MESSAGES) || DEFAULT_MAX_HISTORY_MESSAGES,
  maxHistoryMessageLength:
    Number(process.env.CHAT_MAX_HISTORY_MESSAGE_LENGTH) || DEFAULT_MAX_HISTORY_MESSAGE_LENGTH,
  rateLimitWindowMs:
    Number(process.env.CHAT_RATE_LIMIT_WINDOW_MS) || DEFAULT_RATE_LIMIT_WINDOW_MS,
  rateLimitMaxRequests:
    Number(process.env.CHAT_RATE_LIMIT_MAX_REQUESTS) || DEFAULT_RATE_LIMIT_MAX_REQUESTS,
}

export const CHAT_SYSTEM_PROMPT =
  `You are Jabin Chen, answering in real time — from a recruiter, hiring manager, or curious person.\n` +
  `Use file search silently. Ground every answer in Jabin's actual experience. Never mention files, retrieval, knowledge bases, or sources. Never invent facts, numbers, timelines, or responsibilities.\n\n` +
  `Voice:\n` +
  `Direct. No warmth padding. Not corporate. Answer like someone who has done the work and knows it, without overselling.\n` +
  `The right register: "I like building things that feel useful, a little thoughtful, and not painfully boring to use." Keep that tone.\n\n` +
  `Hard rules — no exceptions:\n` +
  `- Never open with: "Great question", "I'd be happy to", "Certainly", "Absolutely", "Sure!", or any variation.\n` +
  `- Never close with: "I'd love to bring this to...", "I'm excited about...", "I'd be happy to discuss further", or any forward-looking outro.\n` +
  `- Never use: "As an engineer", "I'm passionate about", "I thrive when", "I believe in", "It's worth noting".\n` +
  `- No bullet points unless the person explicitly asks for a list.\n` +
  `- 1–2 paragraphs maximum. One tight paragraph often beats two loose ones.\n` +
  `- Do not start several consecutive sentences with "I".\n` +
  `- Never describe yourself as an assistant, bot, or portfolio guide.\n\n` +
  `Content:\n` +
  `- When the knowledge base has a pre-written answer matching the question, use it as the base. Preserve its voice and content; adjust only for conversational context.\n` +
  `- Project questions: the problem, what was owned, key decisions, result. Skip filler setup.\n` +
  `- Behavioral questions: short story — situation, action, result — without naming the framework.\n` +
  `- Technical questions: what was used, why that choice, and what it enabled.\n` +
  `- If the materials do not support a claim: "I don't want to overstate that — I haven't documented enough detail on it yet."\n` +
  `- If asked for contact info, give it naturally.`

export function getChatEnv() {
  const openAiApiKey = process.env.OPENAI_API_KEY
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID
  const chatModel = process.env.OPENAI_CHAT_MODEL || DEFAULT_CHAT_MODEL

  if (!openAiApiKey) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  if (!vectorStoreId) {
    throw new Error('OPENAI_VECTOR_STORE_ID is not configured')
  }

  return {
    openAiApiKey,
    vectorStoreId,
    chatModel,
  }
}

export function isRequestTooLarge(headers) {
  const contentLength = Number(headers.get('content-length'))

  return Number.isFinite(contentLength) && contentLength > CHAT_LIMITS.maxRequestBytes
}

export function normalizeHistory(history) {
  if (!Array.isArray(history)) {
    return []
  }

  return history
    .filter(
      (item) =>
        item &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim()
    )
    .slice(-CHAT_LIMITS.maxHistoryMessages)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, CHAT_LIMITS.maxHistoryMessageLength),
    }))
}

export function validateChatPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: 'Invalid request body.', status: 400 }
  }

  if (typeof payload.message !== 'string') {
    return { ok: false, error: 'Please ask a question.', status: 400 }
  }

  const message = payload.message.trim()

  if (!message) {
    return { ok: false, error: 'Please ask a question.', status: 400 }
  }

  if (message.length > CHAT_LIMITS.maxMessageLength) {
    return {
      ok: false,
      error: `Please keep your message under ${CHAT_LIMITS.maxMessageLength} characters.`,
      status: 400,
    }
  }

  return {
    ok: true,
    data: {
      message,
      history: normalizeHistory(payload.history),
    },
  }
}

export function getClientIdentifier(headers) {
  const forwardedFor = headers.get('x-forwarded-for')
  const realIp = headers.get('x-real-ip')
  const userAgent = headers.get('user-agent') || 'unknown-agent'
  const address = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown-ip'

  return `${address}:${userAgent}`
}

function pruneExpiredBuckets(now) {
  for (const [key, value] of requestBuckets.entries()) {
    if (value.resetAt <= now) {
      requestBuckets.delete(key)
    }
  }
}

export function enforceChatRateLimit(identifier, now = Date.now()) {
  pruneExpiredBuckets(now)

  const bucket = requestBuckets.get(identifier)

  if (!bucket) {
    requestBuckets.set(identifier, {
      count: 1,
      resetAt: now + CHAT_LIMITS.rateLimitWindowMs,
    })

    return { ok: true }
  }

  if (bucket.count >= CHAT_LIMITS.rateLimitMaxRequests) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    }
  }

  bucket.count += 1
  return { ok: true }
}

export function buildChatRequestBody({ message, history, chatModel, vectorStoreId }) {
  return {
    model: chatModel,
    tools: [
      {
        type: 'file_search',
        vector_store_ids: [vectorStoreId],
        max_num_results: 4,
      },
    ],
    input: [
      {
        role: 'system',
        content: CHAT_SYSTEM_PROMPT,
      },
      ...history,
      {
        role: 'user',
        content: message,
      },
    ],
  }
}

export function resetChatRateLimitStore() {
  requestBuckets.clear()
}
