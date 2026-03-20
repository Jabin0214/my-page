import fs from 'node:fs'
import path from 'node:path'
import OpenAI from 'openai'

function normalizeEnvValue(value) {
  const trimmedValue = value.trim()

  if (
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))
  ) {
    return trimmedValue.slice(1, -1)
  }

  return trimmedValue
}

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
    const value = normalizeEnvValue(trimmedLine.slice(separatorIndex + 1))

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
  const rawArgs = process.argv.slice(2)
  const forceNewStore = rawArgs.includes('--new-store')
  const inputPaths = rawArgs.filter((arg) => arg !== '--new-store')

  if (inputPaths.length === 0) {
    throw new Error('Pass one or more file paths. Example: node scripts/upload-to-vector-store.mjs ./knowledge/resume.pdf')
  }

  const client = getClient()
  let vectorStoreId = forceNewStore ? '' : process.env.OPENAI_VECTOR_STORE_ID

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

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File not found: ${inputPath}`)
    }

    return fs.createReadStream(absolutePath)
  })

  const batch = await client.vectorStores.fileBatches.uploadAndPoll(vectorStoreId, {
    files,
  })

  console.log(`Upload finished for vector store: ${vectorStoreId}`)
  console.log(`OPENAI_VECTOR_STORE_ID=${vectorStoreId}`)
  console.log(JSON.stringify(batch.file_counts, null, 2))
}

main().catch((error) => {
  console.error('[upload-to-vector-store]', error)
  process.exit(1)
})
