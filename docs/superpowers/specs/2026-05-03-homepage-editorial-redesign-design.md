# Homepage Editorial Redesign Design

## Goal

Redesign the localized homepage so it feels like a distinctive editorial personal brand page while still helping recruiters and hiring managers understand Jabin Chen quickly.

## Approved Direction

Use an editorial hybrid approach for the homepage only. The page should feel more intentional, spacious, and memorable than a typical portfolio template, but it should still preserve strong hiring clarity. The redesign should prioritize hierarchy, typography rhythm, and narrative flow over card-heavy UI.

## Audience

- Recruiters who need a fast understanding of role fit, strengths, and credibility.
- Hiring managers who want signals about taste, technical judgment, and product thinking.
- Curious visitors who want a clearer sense of personality without losing substance.

## Scope

- Redesign the homepage layout and visual system only.
- Rework homepage information architecture into a single editorial narrative flow.
- Refine homepage copy presentation for stronger first-pass readability without changing the core personal story.
- Introduce homepage-specific visual rhythm, spacing, and section structure that can later inform other pages.
- Preserve multilingual support and existing content sources unless a small content-layer reshaping is needed for presentation.

## Out Of Scope

- Full redesign of the projects, contact, chat, or navigation pages.
- Major content rewrites across the whole site.
- New backend or API behavior.
- Replacing the existing localization model.

## Problems In The Current Homepage

- The page feels organized but visually close to a polished portfolio template rather than a memorable personal brand page.
- Too much information is presented through similar card treatments, which flattens hierarchy.
- The current hero communicates friendliness but does not create a strong first impression or editorial point of view.
- Important hiring signals exist, but they are spread across multiple blocks instead of being staged in a deliberate narrative sequence.

## Design Principles

1. One clear story at a time. Each section should answer a different visitor question instead of competing equally on screen.
2. Editorial over dashboard. Use layout, proportion, whitespace, and typography to create hierarchy before relying on borders and cards.
3. Personality with restraint. The page should feel thoughtful and human without becoming decorative or vague.
4. Hiring clarity stays intact. The redesign should still help a recruiter understand role fit within a quick scan.
5. Motion should support pacing. Animation should reinforce hierarchy and transitions, not become a visual gimmick.

## Homepage Structure

### 1. Hero

Purpose: establish identity, tone, and immediate relevance.

Content:

- A larger, sharper headline that reads like a positioning statement rather than a resume heading.
- A compact supporting paragraph that explains the kind of work Jabin likes to build.
- One primary CTA and one secondary CTA.
- Three high-value facts, such as location, work focus, and working style.

Layout:

- Shift away from equal-weight dual cards.
- Use a dominant text column with a supporting fact area that feels secondary but still useful.
- Keep the hero visually open with stronger spacing and fewer nested boxes.

### 2. Editorial Intro

Purpose: answer "What kind of engineer is this?" in a more human and confident way.

Content:

- A short editorial-style introduction based on the existing "Who Am I" content.
- Emphasis on practical engineering, AI curiosity, and product-aware thinking.

Layout:

- A text-led section with strong line-length control.
- Supporting label or eyebrow for pacing, but minimal chrome.

### 3. Selected Work

Purpose: prove capability through a small set of representative projects.

Content:

- Feature 2 to 3 projects only.
- Each project should highlight what was built, why it mattered, and what it says about Jabin's abilities.
- Preserve imagery, but ensure text hierarchy does more of the persuasive work than the image alone.

Layout:

- Cards can remain, but they should feel more editorial and less gallery-like.
- Use stronger titles, more selective metadata, and less chip noise.

### 4. How I Work

Purpose: show collaboration style and engineering taste.

Content:

- Merge the current signals, skills, and work-style messaging into one tighter section.
- Emphasize how engineering judgment, user experience, and practical shipping mindset work together.
- Skills should remain visible, but as support rather than the headline message.

Layout:

- Use grouped text modules or a split editorial layout instead of several repeating boxes.

### 5. Experience Snapshot

Purpose: create credibility without recreating a full resume on the homepage.

Content:

- Keep a curated set of experience highlights.
- Shorten the display so it reads as evidence, not a full employment history wall.
- Education and personal details can remain, but visually subordinate to the main story.

Layout:

- Present experience as concise highlights with clear temporal and role cues.
- Reduce repetitive block styling.

## Visual Direction

### Tone

- Editorial
- Warmly professional
- Thoughtful, not flashy
- Premium but approachable

### Color

- Use a warm light background instead of a crisp template-white base.
- Keep deep ink-like text for contrast and seriousness.
- Use one restrained accent color for links, facts, and interactive emphasis.
- Avoid adding multiple bright competing colors.

### Typography

- Increase contrast between display text and body text.
- Let headings feel more assertive and spacious.
- Improve reading rhythm through line-length control, margin pacing, and section spacing.
- Preserve accessibility and legibility on mobile.

### Surfaces

- Reduce dependence on repeated bordered cards.
- Keep surfaces where they clarify grouping, not everywhere by default.
- Favor quieter section framing and stronger compositional spacing.

### Motion

- Use subtle reveal motion with consistent timing.
- Add restrained hover or focus feedback to CTAs and project items.
- Respect reduced-motion preferences.

## Content Strategy

- Tighten the homepage headline so it communicates identity and value faster.
- Compress supporting paragraphs so the first screen reads cleanly.
- Replace generic labels or repeated UI phrasing with more intentional editorial cues.
- Preserve the current voice: curious, grounded, and easy to work with.
- Keep content recruiter-readable before making it poetic.

## Accessibility And UX Requirements

- Preserve clear heading hierarchy.
- Maintain visible keyboard focus states.
- Ensure contrast stays accessible across the new palette.
- Keep primary actions easy to spot and easy to tap on mobile.
- Avoid relying on motion or color alone to communicate importance.
- Ensure the mobile layout remains calm and readable without horizontal overflow.

## Technical Plan Boundaries

- Implement within the current Next.js and Tailwind-based setup.
- Reuse existing content hooks and localized content objects where possible.
- Prefer styling and structural changes in the homepage and shared CSS tokens before introducing unnecessary new abstractions.
- If a small reusable homepage section helper improves clarity, that is acceptable.

## Success Criteria

- The homepage feels meaningfully more distinctive than a standard developer portfolio.
- A first-time recruiter can understand who Jabin is, what he works on, and why he is credible within a quick scan.
- Visual hierarchy is noticeably stronger, with fewer equal-weight blocks competing for attention.
- The page feels more spacious, intentional, and polished on both desktop and mobile.
- Existing functionality and localization continue to work.

## Testing

- Run lint, existing tests, and a production build after implementation.
- Visually verify the homepage on desktop and mobile-sized viewports.
- Check that the localized homepage still renders correctly for both supported languages.
