import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

function getEnv() {
  const openAiApiKey = process.env.OPENAI_API_KEY
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID
  const chatModel = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini'

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

function getClients() {
  const { openAiApiKey, vectorStoreId, chatModel } = getEnv()
  const openai = new OpenAI({ apiKey: openAiApiKey })

  return {
    openai,
    vectorStoreId,
    chatModel,
  }
}

function normalizeHistory(history) {
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
    .slice(-8)
    .map((item) => ({
      role: item.role,
      content: [
        {
          type: 'input_text',
          text: item.content.trim(),
        },
      ],
    }))
}

function extractSources(response) {
  const fileSearchCalls = Array.isArray(response.output)
    ? response.output.filter((item) => item?.type === 'file_search_call')
    : []

  const uniqueSources = new Map()

  for (const call of fileSearchCalls) {
    for (const result of call.results || []) {
      const key = `${result.file_id || result.filename || result.text}`

      if (!key || uniqueSources.has(key)) {
        continue
      }

      uniqueSources.set(key, {
        filename: result.filename || 'Knowledge base file',
        score: typeof result.score === 'number' ? result.score : null,
        snippet: result.text ? result.text.slice(0, 220) : '',
      })
    }
  }

  return Array.from(uniqueSources.values()).slice(0, 3)
}

export async function POST(request) {
  try {
    const { openai, vectorStoreId, chatModel } = getClients()
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ reply: 'Please ask a question.' }, { status: 400 })
    }

    const response = await openai.responses.create({
      model: chatModel,
      tools: [
        {
          type: 'file_search',
          vector_store_ids: [vectorStoreId],
          max_num_results: 4,
        },
      ],
      include: ['file_search_call.results'],
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text:
                `You are Jabin Chen's portfolio assistant. Use file search to answer questions about Jabin Chen's resume, projects, experience, skills, certifications, and technical background.\n` +
                `Follow these rules:\n` +
                `- Represent Jabin professionally and naturally, as if you are his digital profile assistant.\n` +
                `- Prefer a first-person voice when the user asks about Jabin directly, for example "I worked on..." or "I have experience with...".\n` +
                `- Be specific. Mention project names, technologies, outcomes, and dates when the knowledge base supports them.\n` +
                `- Keep answers concise and useful. Use short paragraphs or short bullet points when appropriate.\n` +
                `- If the knowledge base does not contain enough information, say clearly: "I don't have enough information in Jabin's knowledge base to answer that yet."\n` +
                `- Do not invent facts, employers, dates, or skills that are not supported by the knowledge base.\n` +
                `- If asked for contact details, share the portfolio-safe contact details contained in the knowledge base.`,
            },
          ],
        },
        ...normalizeHistory(history),
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: message,
            },
          ],
        },
      ],
    })

    const reply = response.output_text?.trim() || 'Sorry, I could not generate a response.'
    const sources = extractSources(response)

    return NextResponse.json({ reply, sources })
  } catch (error) {
    console.error('[chat-route]', error)
    return NextResponse.json(
      { reply: 'The chat service is temporarily unavailable. Please try again later.' },
      { status: 500 }
    )
  }
}
