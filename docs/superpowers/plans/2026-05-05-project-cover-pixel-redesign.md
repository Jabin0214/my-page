# Project Cover Pixel Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current mismatched project cover images with a new five-image pixel-art product-cover set that better reflects the actual project meanings.

**Architecture:** Keep the existing projects page and content model intact where possible, but generate a new coordinated set of bitmap cover images under `public/covers/` and update any filenames in the content model only if replacement-by-overwrite is not the best fit. Verification is primarily visual plus a production build to ensure the site still resolves the assets correctly.

**Tech Stack:** Built-in image generation tool, existing Next.js asset pipeline, localized content objects

---

### Task 1: Create The Asset Plan

**Files:**
- Create: `docs/superpowers/plans/2026-05-05-project-cover-pixel-redesign.md`

- [ ] **Step 1: Write the plan**

Save the approved execution plan to this file.

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/plans/2026-05-05-project-cover-pixel-redesign.md
git commit -m "docs: add project cover generation plan"
```

### Task 2: Generate The Five Pixel Covers

**Files:**
- Create or replace: `public/covers/oneness.jpg`
- Create or replace: `public/covers/schedora.jpg`
- Create or replace: `public/covers/financebro.jpg`
- Create or replace: `public/covers/medimate.jpg`
- Create or replace: `public/covers/musichat.jpg`

- [ ] **Step 1: Generate the new cover set**

Generate five coordinated images in the approved `structured pixel dashboard card` style:
- The Oneness Association
- Schedora
- FinanceBro
- Medimate
- Musichat

Use consistent framing, pixel density, and palette direction across the full set.

- [ ] **Step 2: Save assets into the workspace**

Move or copy the selected outputs into `public/covers/` using stable filenames.

- [ ] **Step 3: Commit**

```bash
git add public/covers/oneness.jpg public/covers/schedora.jpg public/covers/financebro.jpg public/covers/medimate.jpg public/covers/musichat.jpg
git commit -m "feat: add pixel-art project cover set"
```

### Task 3: Update Project References

**Files:**
- Modify: `src/content/portfolio-content.js`

- [ ] **Step 1: Update cover filenames if needed**

If the new cover set uses new filenames, update the project entries to point at them.

- [ ] **Step 2: Commit**

```bash
git add src/content/portfolio-content.js
git commit -m "feat: update project cover references"
```

Skip this commit if filenames are replaced in-place and no content file change is needed.

### Task 4: Final Verification

**Files:**
- Verify only

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 2: Optional local preview**

Run: `npm run dev`
Expected: Updated projects page available for visual inspection.

- [ ] **Step 3: Review diff**

Run: `git diff --stat HEAD~2..HEAD`
Expected: New cover assets and, if needed, cover-reference updates only.
