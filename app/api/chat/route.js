import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { Pinecone } from '@pinecone-database/pinecone'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
})

const indexName = process.env.PINECONE_INDEX_NAME
const chatModel = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini'

function getIndex() {
  if (!indexName) {
    throw new Error('PINECONE_INDEX_NAME is not configured')
  }

  return pinecone.Index(indexName)
}

export async function POST(request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ reply: 'Please ask a question.' }, { status: 400 })
    }

    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: message,
    })

    const embedding = embeddingResponse.data[0]?.embedding

    if (!embedding) {
      throw new Error('Failed to generate embedding')
    }

    const queryResult = await getIndex().query({
      vector: embedding,
      topK: 6,
      includeMetadata: true,
    })

    const context = (queryResult.matches || [])
      .map((match) => match.metadata?.text)
      .filter(Boolean)
      .join('\n---\n')

    const response = await openai.responses.create({
      model: chatModel,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text:
                `You are Jabin Chen's portfolio assistant. Answer questions about Jabin Chen using the provided context whenever possible. ` +
                `Be concise, accurate, and professional. If the context is insufficient, say so clearly and avoid inventing facts.\n\n` +
                `Context:\n${context || 'No supporting context was found in the knowledge base.'}`,
            },
          ],
        },
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

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('[chat-route]', error)
    return NextResponse.json(
      { reply: 'The chat service is temporarily unavailable. Please try again later.' },
      { status: 500 }
    )
  }
}
