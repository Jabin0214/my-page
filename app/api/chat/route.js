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
            `If the materials do not support a claim, say: "I don't want to overstate that because I haven't documented enough detail on it yet."`,
        },
        ...normalizeHistory(history),
        {
          role: 'user',
          content: message,
        },
      ],
    })

    const reply = response.output_text?.trim() || 'Sorry, I could not generate a response.'
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('[chat-route]', error)
    return NextResponse.json(
      { reply: 'The chat service is temporarily unavailable. Please try again later.' },
      { status: 500 }
    )
  }
}
