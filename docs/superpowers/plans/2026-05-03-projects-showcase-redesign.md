# Projects Showcase Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the localized projects page into a showcase-first editorial gallery with smoother visual rhythm and polished motion while preserving readability and localization.

**Architecture:** Keep the existing content source and route structure, but add a small projects presentation helper so the page can derive showcase metadata such as sequence labels and alternating layout treatment without burying display logic inside the page component. Refactor the projects page into a larger-media showcase layout and extend shared CSS with projects-specific classes that provide smoother motion and quieter surfaces.

**Tech Stack:** Next.js App Router, React 19, Tailwind CSS, Framer Motion, Node test runner

---

### Task 1: Add Projects Presentation Helpers

**Files:**
- Create: `docs/superpowers/plans/2026-05-03-projects-showcase-redesign.md`
- Create: `src/lib/projects.js`
- Modify: `test/content.test.js`

- [ ] **Step 1: Write the failing test**

Add a test to `test/content.test.js` for a helper that:
- converts the projects list into showcase items
- adds a `sequenceLabel` such as `Project 01`
- alternates a `mediaSide` field between `left` and `right`

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/content.test.js`
Expected: FAIL because `src/lib/projects.js` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/projects.js` with a `buildProjectShowcase(projects, labelPrefix)` helper that returns the original project data plus:
- `sequenceLabel`
- `mediaSide`

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/content.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add test/content.test.js src/lib/projects.js docs/superpowers/plans/2026-05-03-projects-showcase-redesign.md
git commit -m "test: add projects showcase helper"
```

### Task 2: Add Localized Showcase Copy And Refactor Page Structure

**Files:**
- Modify: `src/content/portfolio-content.js`
- Modify: `app/[lang]/projects/projects-content.jsx`

- [ ] **Step 1: Write the failing test**

Extend `test/content.test.js` to assert the localized projects content exposes the new showcase copy fields needed by the redesign, including:
- intro label
- intro note
- closing or supporting copy for the gallery rhythm

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/content.test.js`
Expected: FAIL because the new localized fields are missing.

- [ ] **Step 3: Write minimal implementation**

Update `src/content/portfolio-content.js` with the new localized projects showcase fields for both `en` and `zh`.

Refactor `app/[lang]/projects/projects-content.jsx` to:
- use the projects presentation helper
- replace the repeated equal-weight card list with larger showcase sections
- increase image prominence
- alternate layout rhythm between projects
- keep GitHub links and tags readable without visual clutter
- use smooth existing motion primitives rather than introducing GSAP unless absolutely necessary

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/content.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/content/portfolio-content.js app/[lang]/projects/projects-content.jsx test/content.test.js
git commit -m "feat: redesign projects showcase layout"
```

### Task 3: Add Projects Showcase Styling And Motion Polish

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Write the failing test**

No dedicated CSS-only test is required here. Use the already-green content tests plus lint/build as the verification boundary.

- [ ] **Step 2: Run current tests before styling**

Run: `node --test test/content.test.js`
Expected: PASS

- [ ] **Step 3: Write minimal implementation**

Extend `src/index.css` with projects-page-specific showcase styles:
- larger framed media blocks
- alternating showcase layout helpers
- quieter metadata presentation
- gentle hover/image polish
- smooth reduced-motion-safe reveal support for the projects gallery

- [ ] **Step 4: Run verification**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "style: add projects showcase presentation"
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
Expected: Projects-page-related changes only.

- [ ] **Step 4: Optional local preview**

Run: `npm run dev`
Expected: Projects page available for manual inspection at the local dev URL if needed.
