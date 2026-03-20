export class ChatRequestError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ChatRequestError'
    this.status = status
  }
}

export async function sendChatMessage(message, history = [], options = {}) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    signal: options.signal,
    body: JSON.stringify({ message, history }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ChatRequestError(data?.reply || 'Chat request failed', response.status)
  }

  return data
}
