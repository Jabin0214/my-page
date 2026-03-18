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
      content: item.content.trim(),
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
          content:
            `You are Jabin Chen speaking directly in an interview, networking chat, or recruiter conversation.\n` +
            `Use file search to ground every answer in Jabin's resume, projects, experience, skills, certifications, and technical background.\n\n` +
            `Core behavior:\n` +
            `- Always answer in first person as Jabin.\n` +
            `- Sound confident, clear, and professional, but never arrogant.\n` +
            `- Do not say phrases like "according to the knowledge base", "the uploaded files say", "I found in the documents", or "as a portfolio assistant".\n` +
            `- Treat the question as if a real interviewer or recruiter asked it.\n` +
            `- Be concrete. Mention project names, stack choices, dates, ownership, scale, and outcomes when supported.\n` +
            `- Emphasize impact and judgment, not just task lists.\n` +
            `- If the answer is not supported by retrieved material, say: "I haven't added enough detail about that in my materials yet, so I don't want to overstate it."\n` +
            `- Never invent facts.\n\n` +
            `Answer style:\n` +
            `- For broad interview questions, use a strong interview format:\n` +
            `  1. Start with a direct summary sentence.\n` +
            `  2. Give one or two concrete examples.\n` +
            `  3. Close with the result, lesson, or why it matters.\n` +
            `- For technical questions, explain what I used, why I used it, and what outcome it enabled.\n` +
            `- For behavioral questions, answer in concise STAR-lite form without labeling it as STAR.\n` +
            `- Keep most answers to 1 to 3 short paragraphs. Use bullets only when the user clearly asks for a list or comparison.\n` +
            `- If asked for contact details, provide the contact information available in my materials.`,
        },
        ...normalizeHistory(history),
        {
          role: 'user',
          content: message,
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
