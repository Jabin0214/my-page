# Jabin Portfolio

A production-oriented portfolio built with Next.js App Router, designed to feel personal while still being deployable, searchable, bilingual, and maintainable.

## Why this project is strong

- It is more than a static portfolio. The site includes a grounded AI chat experience powered by OpenAI `file_search` and a hosted vector store.
- The content system is standardized around a single bilingual source of truth, which reduces drift and makes future updates safer.
- SEO is treated as a first-class concern: localized metadata, canonical URLs, alternate language URLs, Open Graph, Twitter cards, `robots.txt`, and `sitemap.xml` are all configured.
- The chat path is hardened with request validation, request-size limits, best-effort rate limiting, timeout control, and abortable client requests.
- The site ships with baseline browser-facing security headers configured in Next.js.
- The UI keeps a distinctive personal tone while still following practical engineering standards such as reusable content/config layers and build-time checks.
- Image loading now uses Next.js image optimization, project covers are switched to lighter JPEG assets, and social/manifest assets are separated from oversized source images.
- The repo includes baseline automated tests for core helpers so regressions in language resolution and chat validation are easier to catch.
- Language is now route-native: English and Chinese pages live under `/en` and `/zh`, with cookie-backed redirects so SEO and sharing stay clean.

## Core capabilities

- Home, Projects, Contact, and AI Chat pages built on the App Router
- Route-level bilingual URLs for English and Chinese with cookie-backed preference redirects
- OpenAI Responses API integration with vector-store-backed retrieval
- Static SEO routes for `robots.txt`, `sitemap.xml`, and `manifest.webmanifest`
- Resume download, project showcase cards, and portfolio-specific structured data

## Engineering standards in this repo

- Single-source localized content in [`src/content/portfolio-content.js`](./src/content/portfolio-content.js)
- Shared site metadata in [`src/config/site.js`](./src/config/site.js)
- URL-based language routing and helpers in [`src/lib/language.js`](./src/lib/language.js) plus [`proxy.js`](./proxy.js)
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
app/[lang]/              Localized pages, layout, and per-page metadata
app/                     Route handlers and metadata routes
src/components/          Shared UI and page components
src/content/             Bilingual portfolio content
src/config/              Site-level configuration
src/lib/                 Chat validation, metadata, and language helpers
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

# Optional — distributed rate limit on Vercel / multi-instance deployments.
# Without these, the chat route uses an in-memory bucket that does not
# survive across serverless instances.
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

## AI knowledge base workflow

The chat assistant inlines the Markdown files in `knowledge/` directly into the system prompt at request time. To update what the assistant knows, edit those files and redeploy — no upload step required. The corpus is small enough that OpenAI's automatic prompt caching keeps repeated requests cheap.

## Rate limiting

The chat API rate-limits per client IP (sliding window, defaults to 8 requests / minute).

- **With `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` set:** uses Upstash Redis. Required for Vercel / any multi-instance deployment so limits stay consistent across functions.
- **Without them:** falls back to an in-memory bucket. Fine for local development or a single long-running Node process, but ineffective on serverless.

To enable Upstash: create a free Redis database at [console.upstash.com](https://console.upstash.com), copy the REST URL and token from the database page, and add both as environment variables in Vercel.

## Observability

Each chat request logs a JSON line to stdout:

```
[chat] {"ts":"…","ip":"…","q":"…","chars":1234,"ms":2100,"ok":true}
```

On Vercel these show up under the project's Logs / Observability tab. For long-term querying, attach a Log Drain or write the same record to Upstash / a database from `app/api/chat/route.js`.

## Deployment

### Vercel

1. Import this repository into Vercel.
2. Keep the framework preset as `Next.js`.
3. Set `NEXT_PUBLIC_SITE_URL` to the final production domain.
4. Add `OPENAI_API_KEY` and (optionally) `OPENAI_CHAT_MODEL`.
5. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to enable distributed rate limiting (recommended).
6. Attach the custom domain in Vercel.

## Notes

- Core pages are prerendered as static content.
- The chat API route is intentionally dynamic.
- Language preference is persisted via cookie and reinforced by route-based URLs.
- The `.env.local` file is ignored by Git and is intended for local secrets only.
