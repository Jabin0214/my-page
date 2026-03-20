# Jabin Portfolio

A production-oriented portfolio built with Next.js App Router, designed to feel personal while still being deployable, searchable, bilingual, and maintainable.

## Why this project is strong

- It is more than a static portfolio. The site includes a grounded AI chat experience powered by OpenAI `file_search` and a hosted vector store.
- The content system is standardized around a single bilingual source of truth, which reduces drift and makes future updates safer.
- SEO is treated as a first-class concern: metadata, canonical URLs, Open Graph, Twitter cards, `robots.txt`, and `sitemap.xml` are all configured.
- The chat path is hardened with request validation, request-size limits, best-effort rate limiting, timeout control, and abortable client requests.
- The UI keeps a distinctive personal tone while still following practical engineering standards such as reusable content/config layers and build-time checks.
- Image loading now uses Next.js image optimization, and social/manifest assets are separated from oversized source images.
- The repo includes baseline automated tests for core helpers so regressions in language resolution and chat validation are easier to catch.

## Core capabilities

- Home, Projects, Contact, and AI Chat pages built on the App Router
- Cookie and localStorage backed language persistence for English and Chinese
- OpenAI Responses API integration with vector-store-backed retrieval
- Static SEO routes for `robots.txt`, `sitemap.xml`, and `manifest.webmanifest`
- Resume download, project showcase cards, and portfolio-specific structured data

## Engineering standards in this repo

- Single-source localized content in [`src/content/portfolio-content.js`](./src/content/portfolio-content.js)
- Shared site metadata in [`src/config/site.js`](./src/config/site.js)
- Centralized chat validation and rate-limit logic in [`src/lib/chat.js`](./src/lib/chat.js)
- Basic regression tests via Node's built-in test runner
- Lint, test, and production build checks wired into `npm run check`

## Stack

- Next.js 16
- React 19
- Tailwind CSS
- Framer Motion
- OpenAI JavaScript SDK

## Project structure

```text
app/                     App Router pages, route handlers, metadata routes
src/components/          Shared UI and page components
src/content/             Bilingual portfolio content
src/config/              Site-level configuration
src/lib/                 Chat validation, metadata, asset, and language helpers
knowledge/               Files uploaded to the OpenAI vector store
scripts/                 Local tooling such as vector store uploads
test/                    Node-based regression tests
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

Or run everything in one pass:

```bash
npm run check
```

## Environment variables

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
OPENAI_API_KEY=...
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_VECTOR_STORE_ID=vs_...
```

## AI knowledge base workflow

The chat assistant uses OpenAI `file_search` with a hosted vector store.

Upload one or more files:

```bash
npm run upload:knowledge -- ./path/to/resume.pdf ./path/to/projects.md
```

Upload the curated profile set in this repo:

```bash
npm run upload:profile
```

Create a brand new vector store and upload the curated profile set:

```bash
npm run upload:profile:new
```

If `OPENAI_VECTOR_STORE_ID` is missing, the upload script creates a new vector store and prints the ID you should store in `.env.local` and your deployment platform.

## Deployment

### Vercel

1. Import this repository into Vercel.
2. Keep the framework preset as `Next.js`.
3. Set `NEXT_PUBLIC_SITE_URL` to the final production domain.
4. Add `OPENAI_API_KEY`, `OPENAI_CHAT_MODEL`, and `OPENAI_VECTOR_STORE_ID`.
5. Attach the custom domain in Vercel.

## Notes

- Core pages are prerendered as static content.
- The chat API route is intentionally dynamic.
- Language preference is persisted across sessions.
- The `.env.local` file is ignored by Git and is intended for local secrets only.
