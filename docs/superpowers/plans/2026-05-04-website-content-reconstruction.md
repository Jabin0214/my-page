# Website Content Reconstruction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the website’s bilingual content so it reflects Jabin Chen’s current real experience, strongest projects, and clearest hiring-relevant narrative.

**Architecture:** Keep the existing page structure and localization system, but refresh the underlying content model, site-level identity data, and a small amount of page rendering so the homepage, projects page, contact page, and chat-facing identity all align with the knowledge base. Use content-first changes rather than broad visual rewrites, while allowing minor layout adjustments where the new information needs clearer support.

**Tech Stack:** Next.js App Router, React 19, localized content objects, Node test runner

---

### Task 1: Update Test Expectations For The New Content Story

**Files:**
- Create: `docs/superpowers/plans/2026-05-04-website-content-reconstruction.md`
- Modify: `test/content.test.js`
- Modify: `src/config/site.js`

- [ ] **Step 1: Write the failing test**

Extend `test/content.test.js` with new assertions that describe the updated public identity, including:
- a stronger homepage hero title or summary direction
- updated project ordering with `The Oneness Association` first
- stronger contact conversion data such as LinkedIn and work-rights visibility
- updated site identity data in `SITE_CONFIG` such as LinkedIn/profile URLs

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/content.test.js`
Expected: FAIL because the current public content and site config still reflect the older story.

- [ ] **Step 3: Write minimal implementation**

Update `src/config/site.js` with the new canonical public identity data needed by the reconstructed site, including:
- LinkedIn URL
- updated contact email
- profile URLs and keywords aligned to the knowledge base
- any small supporting site-level fields needed by the content layer

- [ ] **Step 4: Run test to verify it still fails only on content gaps**

Run: `node --test test/content.test.js`
Expected: Partial progress, but remaining failures point at the content object still needing reconstruction.

- [ ] **Step 5: Commit**

```bash
git add test/content.test.js src/config/site.js docs/superpowers/plans/2026-05-04-website-content-reconstruction.md
git commit -m "test: define reconstructed site identity"
```

### Task 2: Rebuild Bilingual Homepage And Projects Content

**Files:**
- Modify: `src/content/portfolio-content.js`
- Modify: `app/[lang]/home-content.jsx`
- Modify: `app/[lang]/projects/projects-content.jsx`

- [ ] **Step 1: Write the failing test**

Expand `test/content.test.js` to assert the reconstructed bilingual content now exposes:
- homepage hero copy aligned to current positioning
- homepage experience entries prioritized around ST International, FRW/Medimate, and UoA TA
- updated project list ordering with `The Oneness Association`, `Schedora`, and `FinanceBro` leading
- project descriptions that reflect live/internal/in-progress status accurately

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/content.test.js`
Expected: FAIL because `portfolio-content.js` still contains the older homepage and project story.

- [ ] **Step 3: Write minimal implementation**

Reconstruct `src/content/portfolio-content.js` in both languages to reflect the knowledge base:
- revise homepage hero, about, credibility, and experience snapshot copy
- add or adjust supporting fields needed for right-to-work, certifications, and current-role signals
- replace the old project priority with `The Oneness Association`, `Schedora`, `FinanceBro`, `Medimate`, `Musichat`, and any lower-priority legacy entry after those
- ensure deployment status and role framing stay accurate

Update `app/[lang]/home-content.jsx` only as needed to present the new content cleanly if the information hierarchy changes.

Update `app/[lang]/projects/projects-content.jsx` only as needed to support the re-prioritized project model and any additional project status/detail labels.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/content.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/content/portfolio-content.js app/[lang]/home-content.jsx app/[lang]/projects/projects-content.jsx test/content.test.js
git commit -m "feat: reconstruct homepage and projects content"
```

### Task 3: Strengthen Contact And Chat-Facing Alignment

**Files:**
- Modify: `app/[lang]/contact/contact-content.jsx`
- Modify: `src/content/portfolio-content.js`
- Modify: `src/lib/chat.js`

- [ ] **Step 1: Write the failing test**

Add content assertions for:
- contact page labels or supporting fields needed for LinkedIn and work-rights messaging
- updated chat-system identity expectations, such as more current role/project framing in `CHAT_SYSTEM_PROMPT`

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/content.test.js`
Expected: FAIL because contact conversion messaging and chat identity have not been updated yet.

- [ ] **Step 3: Write minimal implementation**

Update `src/content/portfolio-content.js` contact fields to include stronger conversion-oriented content.

Update `app/[lang]/contact/contact-content.jsx` to surface:
- LinkedIn
- Auckland location
- NZ work rights
- clearer role/conversation context

Review and update `src/lib/chat.js` so the AI-facing identity stays consistent with the new public content without becoming more corporate or less grounded.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/content.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/[lang]/contact/contact-content.jsx src/content/portfolio-content.js src/lib/chat.js test/content.test.js
git commit -m "feat: align contact and chat content"
```

### Task 4: Final Verification

**Files:**
- Verify only

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 2: Run full test suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Review diff**

Run: `git diff --stat HEAD~3..HEAD`
Expected: Content-reconstruction-focused changes only.

- [ ] **Step 5: Optional local preview**

Run: `npm run dev`
Expected: Updated homepage, projects, and contact pages available for manual review.
