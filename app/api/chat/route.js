import OpenAI from 'openai'
import {
  buildChatRequestBody,
  CHAT_LIMITS,
  checkRateLimit,
  getChatEnv,
  getClientIdentifier,
  isRequestTooLarge,
  validateChatPayload,
} from '../../../src/lib/chat'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream; charset=utf-8',
  'Cache-Control': 'no-store, no-transform',
  Connection: 'keep-alive',
  'X-Accel-Buffering': 'no',
}

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...(init.headers || {}),
    },
  })
}

function sseEvent(event, data) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
}

function logChat(entry) {
  try {
    console.log('[chat]', JSON.stringify(entry))
  } catch {
    // ignore
  }
}

function classifyError(error) {
  if (error?.name === 'AbortError') return { code: 'aborted', status: 499 }
  if (/timeout/i.test(error?.message || '')) {
    return { code: 'timeout', status: 504, message: 'The chat service timed out. Please try again.' }
  }
  if (error?.status === 429) {
    return { code: 'upstream_busy', status: 503, message: 'The chat service is busy right now. Please try again shortly.' }
  }
  return { code: 'internal', status: 500, message: 'The chat service is temporarily unavailable. Please try again later.' }
}

export async function POST(request) {
  const startedAt = Date.now()

  if (isRequestTooLarge(request.headers)) {
    return jsonResponse(
      { error: 'Your request is too large. Please shorten it and try again.' },
      { status: 413 }
    )
  }

  const clientId = getClientIdentifier(request.headers)
  const rateLimit = await checkRateLimit(clientId)

  if (!rateLimit.ok) {
    return jsonResponse(
      { error: 'Too many requests. Please wait a moment and try again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
      }
    )
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const validation = validateChatPayload(payload)
  if (!validation.ok) {
    return jsonResponse({ error: validation.error }, { status: validation.status })
  }

  let openAiApiKey, chatModel, vectorStoreIds, fileSearchMaxResults
  try {
    ({ openAiApiKey, chatModel, vectorStoreIds, fileSearchMaxResults } = getChatEnv())
  } catch (error) {
    console.error('[chat-route] env error:', error.message)
    return jsonResponse({ error: 'Chat service is not configured.' }, { status: 500 })
  }

  const openai = new OpenAI({ apiKey: openAiApiKey })
  const requestBody = buildChatRequestBody({
    message: validation.data.message,
    history: validation.data.history,
    chatModel,
    vectorStoreIds,
    fileSearchMaxResults,
    stream: true,
  })

  const upstreamAbort = new AbortController()
  const clientAbort = request.signal

  const onClientAbort = () => upstreamAbort.abort()
  if (clientAbort) clientAbort.addEventListener('abort', onClientAbort, { once: true })

  let upstream
  try {
    upstream = await openai.responses.create(requestBody, {
      signal: upstreamAbort.signal,
      timeout: CHAT_LIMITS.timeoutMs,
    })
  } catch (error) {
    if (clientAbort) clientAbort.removeEventListener('abort', onClientAbort)
    const info = classifyError(error)
    console.error('[chat-route] upstream open failed:', { code: info.code, message: error?.message })
    if (info.code === 'aborted') return new Response(null, { status: 499 })
    return jsonResponse({ error: info.message }, { status: info.status })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      let fullText = ''
      let closed = false
      const close = () => {
        if (closed) return
        closed = true
        try {
          controller.close()
        } catch {
          // ignore
        }
      }

      try {
        for await (const event of upstream) {
          const type = event?.type || ''

          if (type.endsWith('.output_text.delta') && typeof event.delta === 'string') {
            fullText += event.delta
            controller.enqueue(encoder.encode(sseEvent('delta', { text: event.delta })))
            continue
          }

          if (type === 'response.error' || type === 'error') {
            const message = event?.error?.message || 'upstream error'
            controller.enqueue(encoder.encode(sseEvent('error', { message })))
            console.error('[chat-route] upstream event error:', message)
            close()
            return
          }

          if (type === 'response.completed') break
        }

        controller.enqueue(encoder.encode(sseEvent('done', { length: fullText.length })))
        logChat({
          ts: new Date().toISOString(),
          ip: clientId,
          q: validation.data.message.slice(0, 200),
          chars: fullText.length,
          ms: Date.now() - startedAt,
          ok: true,
        })
      } catch (error) {
        const info = classifyError(error)
        if (info.code !== 'aborted') {
          console.error('[chat-route] stream error:', { code: info.code, message: error?.message })
          try {
            controller.enqueue(
              encoder.encode(sseEvent('error', { message: info.message || 'stream error' }))
            )
          } catch {
            // ignore
          }
        }
        logChat({
          ts: new Date().toISOString(),
          ip: clientId,
          q: validation.data.message.slice(0, 200),
          chars: fullText.length,
          ms: Date.now() - startedAt,
          ok: false,
          err: info.code,
        })
      } finally {
        if (clientAbort) clientAbort.removeEventListener('abort', onClientAbort)
        close()
      }
    },
    cancel() {
      upstreamAbort.abort()
    },
  })

  return new Response(stream, { status: 200, headers: SSE_HEADERS })
}
