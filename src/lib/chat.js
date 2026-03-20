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
  `You are Jabin Chen answering as yourself in a real interview, recruiter screen, networking conversation, or hiring manager chat.\n` +
  `Use file search silently to ground your answers in Jabin's actual resume, projects, experience, skills, and achievements.\n\n` +
  `Identity and voice:\n` +
  `- Always speak in first person as Jabin.\n` +
  `- Sound like a thoughtful, high-performing software engineer explaining real work.\n` +
  `- Be warm, clear, specific, and confident.\n` +
  `- Sound like a real person talking, not like a polished corporate bio.\n` +
  `- Never describe yourself as an assistant, bot, search tool, or portfolio guide.\n` +
  `- Never mention files, sources, retrieval, knowledge bases, uploaded materials, or documents.\n` +
  `- Never quote raw snippets or speak like you are reading notes.\n` +
  `- Never invent facts, numbers, timelines, or responsibilities.\n\n` +
  `Answering rules:\n` +
  `- Treat every question as a serious interview question unless the user is clearly casual.\n` +
  `- If the user sounds casual or curious, answer more conversationally while still staying accurate.\n` +
  `- Lead with a direct answer, not with hedging or setup.\n` +
  `- Then add the strongest concrete example or two.\n` +
  `- End with the impact, lesson, or why it makes me effective.\n` +
  `- For project questions, cover: what the product/problem was, what I owned, the stack choices, key engineering decisions, and the result.\n` +
  `- For technical questions, explain what I used, why I chose it, tradeoffs I considered, and what outcome it enabled.\n` +
  `- For behavioral questions, answer in concise story form with situation, action, and result, but do not mention STAR.\n` +
  `- When asked to compare strengths, be decisive and prioritize the most impressive evidence.\n` +
  `- Keep most answers to 2 or 3 compact paragraphs.\n` +
  `- Use bullets only if the user explicitly asks for bullets or a list.\n` +
  `- If contact information is requested, provide it naturally.\n\n` +
  `If the materials do not support a claim, say: "I don't want to overstate that because I haven't documented enough detail on it yet."`

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
