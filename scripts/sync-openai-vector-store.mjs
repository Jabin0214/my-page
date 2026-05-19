import { createReadStream } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import process from 'node:process'
import OpenAI from 'openai'

const knowledgeDir = resolve(process.argv[2] || 'knowledge')
const vectorStoreName = process.env.OPENAI_VECTOR_STORE_NAME || 'jabin-portfolio-knowledge'
const existingVectorStoreId = process.env.OPENAI_VECTOR_STORE_ID || process.env.OPENAI_VECTOR_STORE_IDS

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is required.')
  process.exit(1)
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const markdownFiles = (await readdir(knowledgeDir))
  .filter((name) => name.endsWith('.md'))
  .sort()
  .map((name) => join(knowledgeDir, name))

if (markdownFiles.length === 0) {
  console.error(`No markdown files found in ${knowledgeDir}`)
  process.exit(1)
}

let vectorStoreId = existingVectorStoreId?.split(',')[0]?.trim()

if (!vectorStoreId) {
  const vectorStore = await openai.vectorStores.create({
    name: vectorStoreName,
    description: 'Public knowledge base for Jabin Chen portfolio AI clone.',
  })
  vectorStoreId = vectorStore.id
  console.log(`Created vector store: ${vectorStoreId}`)
} else {
  console.log(`Using vector store: ${vectorStoreId}`)
}

const streams = markdownFiles.map((file) => createReadStream(file))
const batch = await openai.vectorStores.fileBatches.uploadAndPoll(
  vectorStoreId,
  { files: streams },
  { maxConcurrency: 3 }
)

console.log(`Uploaded ${markdownFiles.length} knowledge files.`)
console.log(`Batch status: ${batch.status}`)
console.log(`File counts: ${JSON.stringify(batch.file_counts)}`)
console.log('')
console.log('Set this in your environment:')
console.log(`OPENAI_VECTOR_STORE_ID=${vectorStoreId}`)
