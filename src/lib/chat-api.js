export class ChatRequestError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ChatRequestError'
    this.status = status
  }
}

function parseSseChunk(buffer) {
  // Returns { events: [{event, data}], rest: string }
  const events = []
  let rest = buffer
  let boundary

  while ((boundary = rest.indexOf('\n\n')) !== -1) {
    const block = rest.slice(0, boundary)
    rest = rest.slice(boundary + 2)

    let event = 'message'
    const dataLines = []
    for (const line of block.split('\n')) {
      if (line.startsWith('event:')) event = line.slice(6).trim()
      else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim())
    }
    if (dataLines.length === 0) continue

    let data
    try {
      data = JSON.parse(dataLines.join('\n'))
    } catch {
      continue
    }
    events.push({ event, data })
  }

  return { events, rest }
}

/**
 * Streams a chat reply token-by-token.
 *
 * @param {string} message
 * @param {Array<{role:'user'|'assistant', content:string}>} history
 * @param {{ signal?: AbortSignal, onDelta?: (text: string) => void }} options
 * @returns {Promise<{ reply: string }>}
 */
export async function streamChatMessage(message, history = [], options = {}) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    signal: options.signal,
    body: JSON.stringify({ message, history }),
  })

  if (!response.ok) {
    let errMessage = 'Chat request failed'
    try {
      const body = await response.json()
      if (body?.error) errMessage = body.error
    } catch {
      // ignore
    }
    throw new ChatRequestError(errMessage, response.status)
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('text/event-stream') || !response.body) {
    // Fallback for non-streaming responses
    const body = await response.json().catch(() => null)
    const reply = body?.reply || ''
    options.onDelta?.(reply)
    return { reply }
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let full = ''
  let streamError = null

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      const { events, rest } = parseSseChunk(buffer)
      buffer = rest

      for (const { event, data } of events) {
        if (event === 'delta' && typeof data?.text === 'string') {
          full += data.text
          options.onDelta?.(data.text)
        } else if (event === 'error') {
          streamError = new ChatRequestError(data?.message || 'stream error', 500)
        } else if (event === 'done') {
          // streaming finished cleanly
        }
      }

      if (streamError) break
    }
  } finally {
    try {
      reader.releaseLock()
    } catch {
      // ignore
    }
  }

  if (streamError) throw streamError
  return { reply: full }
}

// Backwards-compatible non-streaming helper
export async function sendChatMessage(message, history = [], options = {}) {
  return streamChatMessage(message, history, options)
}
