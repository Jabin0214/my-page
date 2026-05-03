# Homepage Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the localized homepage into an editorial-style personal brand page with stronger narrative hierarchy while preserving recruiter clarity and existing localization behavior.

**Architecture:** Keep the current localized content source and homepage route, but introduce a small homepage-specific helper for curating display data and refactor the homepage component into clearer editorial sections. Refresh the shared design tokens in global CSS so the new homepage can rely more on typography, spacing, and restrained surfaces instead of repeating the same card treatment everywhere.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS, Framer Motion, Node test runner

---

### Task 1: Plan And Testable Homepage Data Helpers

**Files:**
- Create: `docs/superpowers/plans/2026-05-03-homepage-editorial-redesign.md`
- Create: `src/lib/homepage.js`
- Modify: `test/content.test.js`

- [ ] **Step 1: Write the failing test**

Add homepage-focused tests to `test/content.test.js` for a helper that:
- builds the hero fact list from localized labels plus the site location
- returns only the first 3 featured projects
- returns only the first 3 experience highlights

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/content.test.js`
Expected: FAIL because `src/lib/homepage.js` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/homepage.js` with:
- `buildHeroFacts(hero, location)`
- `getFeaturedProjects(projects, limit = 3)`
- `getExperienceHighlights(items, limit = 3)`

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/content.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add test/content.test.js src/lib/homepage.js docs/superpowers/plans/2026-05-03-homepage-editorial-redesign.md
git commit -m "test: add homepage data helpers"
```

### Task 2: Editorial Homepage Structure

**Files:**
- Modify: `app/[lang]/home-content.jsx`
- Modify: `src/content/portfolio-content.js`

- [ ] **Step 1: Write the failing test**

Extend `test/content.test.js` to assert the localized homepage content exposes the new editorial copy fields needed by the redesigned homepage, including:
- intro label/title
- work section intro
- experience snapshot label/title

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/content.test.js`
Expected: FAIL because the new localized fields are missing.

- [ ] **Step 3: Write minimal implementation**

Update `src/content/portfolio-content.js` to add the localized copy fields required by the new homepage structure for both `en` and `zh`.

Refactor `app/[lang]/home-content.jsx` to:
- use the homepage helper functions
- replace the equal-weight dual-card hero with a dominant editorial hero
- introduce separate sections for editorial intro, selected work, how I work, and experience snapshot
- reduce repeated card usage and improve content pacing

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/content.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/content/portfolio-content.js app/[lang]/home-content.jsx test/content.test.js
git commit -m "feat: redesign homepage narrative structure"
```

### Task 3: Editorial Visual System Refresh

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Write the failing test**

No automated CSS-specific test is necessary here. Use the already-green content tests as the safety net and rely on lint/build plus visual verification for the styling layer.

- [ ] **Step 2: Run current tests before styling**

Run: `node --test test/content.test.js`
Expected: PASS

- [ ] **Step 3: Write minimal implementation**

Refresh `src/index.css` to support the editorial direction:
- warmer background and ink-like text palette
- more expressive typography rhythm
- quieter surfaces and refined buttons
- homepage-friendly helper classes for labels, dividers, stat blocks, section spacing, and list rhythm
- reduced-motion-safe transitions

- [ ] **Step 4: Run verification**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "style: refresh homepage editorial design tokens"
```

### Task 4: Final Verification

**Files:**
- Verify only

- [ ] **Step 1: Run full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Review diff**

Run: `git diff --stat HEAD~3..HEAD`
Expected: Homepage-related changes only.

- [ ] **Step 4: Optional local preview**

Run: `npm run dev`
Expected: Homepage available for manual inspection at the local dev URL if needed.
