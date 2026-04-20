# Personal SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve `https://jabinchen.com` so search engines can identify it as Jabin Chen's official personal developer site.

**Architecture:** Keep identity facts in `src/config/site.js`, keep URL and JSON-LD helpers in `src/lib/metadata.js`, and consume those helpers from App Router pages. Validate metadata behavior with Node tests and sitemap generation tests.

**Tech Stack:** Next.js App Router, JavaScript modules, Node test runner, schema.org JSON-LD.

---

## File Structure

- Modify `src/config/site.js`: official owner identity, alternate names, profile links, and localized SEO copy.
- Modify `src/lib/metadata.js`: canonical, alternate, and JSON-LD helper functions.
- Modify `app/page.jsx`: root language selector metadata and JSON-LD.
- Modify `app/[lang]/page.jsx`: localized JSON-LD via reusable helpers.
- Modify `app/sitemap.js`: valid root and localized sitemap entries.
- Modify `test/content.test.js`: metadata and structured data regression tests.
- Create `test/sitemap.test.js`: sitemap URL regression tests.

### Task 1: Metadata Helper Tests

- [ ] **Step 1: Write the failing test**

Add tests to `test/content.test.js`:

```js
import {
  buildAlternateLanguageLinks,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
} from '../src/lib/metadata.js'

test('person structured data identifies Jabin Chen official profiles', () => {
  const person = buildPersonJsonLd({ language: 'en', path: '/' })

  assert.equal(person['@type'], 'Person')
  assert.equal(person.name, 'Jabin Chen')
  assert.ok(person.alternateName.includes('JabinChen'))
  assert.equal(person.url, 'https://jabinchen.com/en')
  assert.ok(person.sameAs.includes('https://jabinchen.com'))
  assert.ok(person.sameAs.includes('https://github.com/Jabin0214'))
})

test('website structured data exposes Jabin Chen search identity', () => {
  const website = buildWebsiteJsonLd({ language: 'zh', path: '/' })

  assert.equal(website['@type'], 'WebSite')
  assert.equal(website.url, 'https://jabinchen.com/zh')
  assert.equal(website.publisher.name, 'Jabin Chen')
  assert.ok(website.about.alternateName.includes('JabinChen'))
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- test/content.test.js`
Expected: FAIL because `buildPersonJsonLd` and `buildWebsiteJsonLd` are not exported.

- [ ] **Step 3: Write minimal implementation**

Add JSON-LD helper exports in `src/lib/metadata.js` and add missing identity fields to `src/config/site.js`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- test/content.test.js`
Expected: PASS.

### Task 2: Sitemap Tests

- [ ] **Step 1: Write the failing test**

Create `test/sitemap.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import sitemap from '../app/sitemap.js'

test('sitemap contains only valid jabinchen.com URLs', () => {
  const entries = sitemap()
  const urls = entries.map((entry) => entry.url)

  assert.ok(urls.includes('https://jabinchen.com'))
  assert.ok(urls.includes('https://jabinchen.com/en'))
  assert.ok(urls.includes('https://jabinchen.com/zh'))
  assert.ok(urls.includes('https://jabinchen.com/en/projects'))
  assert.ok(urls.includes('https://jabinchen.com/zh/contact'))

  for (const url of urls) {
    assert.equal(new URL(url).hostname, 'jabinchen.com')
    assert.equal(url.includes('[object Object]'), false)
  }
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- test/sitemap.test.js`
Expected: FAIL because the current sitemap maps a root entry object as if it were a path.

- [ ] **Step 3: Write minimal implementation**

Rewrite `app/sitemap.js` so it returns one root entry plus localized entries for `/`, `/chat`, `/projects`, and `/contact`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- test/sitemap.test.js`
Expected: PASS.

### Task 3: Page Integration

- [ ] **Step 1: Replace inline localized JSON-LD**

Use `buildPersonJsonLd` and `buildWebsiteJsonLd` in `app/[lang]/page.jsx`.

- [ ] **Step 2: Add root JSON-LD**

Add root `Person` and `WebSite` JSON-LD scripts to `app/page.jsx`.

- [ ] **Step 3: Verify full project**

Run: `npm run check`
Expected: lint, tests, and build all exit with code 0.
