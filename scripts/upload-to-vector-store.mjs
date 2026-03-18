import fs from 'node:fs'
import path from 'node:path'
import OpenAI from 'openai'

function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local')

  if (!fs.existsSync(envPath)) {
    return
  }

  const content = fs.readFileSync(envPath, 'utf8')

  for (const line of content.split('\n')) {
    const trimmedLine = line.trim()

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmedLine.indexOf('=')
    if (separatorIndex === -1) {
      continue
    }

    const key = trimmedLine.slice(0, separatorIndex).trim()
    const value = trimmedLine.slice(separatorIndex + 1).trim()

    if (key && !process.env[key]) {
      process.env[key] = value
    }
  }
}

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required')
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

async function main() {
  loadLocalEnv()
  const inputPaths = process.argv.slice(2)

  if (inputPaths.length === 0) {
    throw new Error('Pass one or more file paths. Example: node scripts/upload-to-vector-store.mjs ./knowledge/resume.pdf')
  }

  const client = getClient()
  let vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID

  if (!vectorStoreId) {
    const vectorStore = await client.vectorStores.create({
      name: 'Jabin Portfolio Knowledge Base',
    })
    vectorStoreId = vectorStore.id
    console.log(`Created vector store: ${vectorStoreId}`)
    console.log('Save this as OPENAI_VECTOR_STORE_ID in .env.local and Vercel.')
  }

  const files = inputPaths.map((inputPath) => {
    const absolutePath = path.resolve(process.cwd(), inputPath)
    return fs.createReadStream(absolutePath)
  })

  const batch = await client.vectorStores.fileBatches.uploadAndPoll(vectorStoreId, {
    files,
  })

  console.log(`Upload finished for vector store: ${vectorStoreId}`)
  console.log(JSON.stringify(batch.file_counts, null, 2))
}

main().catch((error) => {
  console.error('[upload-to-vector-store]', error)
  process.exit(1)
})
