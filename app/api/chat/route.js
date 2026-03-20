import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import {
  buildChatRequestBody,
  CHAT_LIMITS,
  enforceChatRateLimit,
  getChatEnv,
  getClientIdentifier,
  isRequestTooLarge,
  validateChatPayload,
} from '../../../src/lib/chat'

export const dynamic = 'force-dynamic'

function jsonResponse(body, init = {}) {
  const headers = new Headers(init.headers)
  headers.set('Cache-Control', 'no-store')

  return NextResponse.json(body, {
    ...init,
    headers,
  })
}

function logChatError(error) {
  console.error('[chat-route]', {
    name: error?.name,
    status: error?.status,
    message: error?.message,
  })
}

function buildFailureResponse(error) {
  if (error?.name === 'AbortError' || /timeout/i.test(error?.message || '')) {
    return {
      reply: 'The chat service timed out. Please try again.',
      status: 503,
    }
  }

  if (error?.status === 429) {
    return {
      reply: 'The chat service is busy right now. Please try again shortly.',
      status: 503,
    }
  }

  return {
    reply: 'The chat service is temporarily unavailable. Please try again later.',
    status: 500,
  }
}

export async function POST(request) {
  if (isRequestTooLarge(request.headers)) {
    return jsonResponse(
      { reply: 'Your request is too large. Please shorten it and try again.' },
      { status: 413 }
    )
  }

  const rateLimit = enforceChatRateLimit(getClientIdentifier(request.headers))

  if (!rateLimit.ok) {
    return jsonResponse(
      { reply: 'Too many requests. Please wait a moment and try again.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfterSeconds),
        },
      }
    )
  }

  let payload

  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ reply: 'Invalid JSON body.' }, { status: 400 })
  }

  const validation = validateChatPayload(payload)

  if (!validation.ok) {
    return jsonResponse({ reply: validation.error }, { status: validation.status })
  }

  try {
    const { openAiApiKey, vectorStoreId, chatModel } = getChatEnv()
    const openai = new OpenAI({ apiKey: openAiApiKey })
    const response = await openai.responses.create(
      buildChatRequestBody({
        message: validation.data.message,
        history: validation.data.history,
        chatModel,
        vectorStoreId,
      }),
      {
        timeout: CHAT_LIMITS.timeoutMs,
      }
    )

    const reply = response.output_text?.trim() || 'Sorry, I could not generate a response.'
    return jsonResponse({ reply })
  } catch (error) {
    logChatError(error)
    const failure = buildFailureResponse(error)
    return jsonResponse({ reply: failure.reply }, { status: failure.status })
  }
}
