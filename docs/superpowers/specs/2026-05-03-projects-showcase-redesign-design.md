# Projects Showcase Redesign Design

## Goal

Redesign the localized projects page so it feels like a premium showcase page, with imagery and presentation carrying more emotional weight while still making each project easy to understand.

## Approved Direction

Use a showcase-first editorial approach. The page should feel smoother, more visual, and more intentionally paced than a standard stacked portfolio list. Motion should be elegant and restrained rather than dramatic, with smooth reveal and light scroll-based enhancement instead of flashy timelines.

## Audience

- Recruiters who want a stronger first impression from project presentation.
- Hiring managers who want to scan project range while also sensing design taste and craft quality.
- General visitors who are more likely to remember projects when they are presented as showcase pieces instead of generic entries.

## Scope

- Redesign the projects page only.
- Shift the project list into a more visual showcase layout with larger imagery and stronger pacing.
- Introduce smooth motion enhancement where it materially improves quality.
- Keep multilingual support and current content sources intact unless small content fields are needed for better presentation.

## Out Of Scope

- Full redesign of homepage, contact, chat, or navigation in this round.
- Rewriting every project description from scratch.
- Heavy animation systems that dominate usability.
- Complex 3D or canvas-based interactions.

## Problems In The Current Projects Page

- The page is clean but reads as a repeated card list rather than a memorable project showcase.
- Every project uses almost the same composition, so the scroll rhythm becomes predictable.
- Images are present, but the layout does not let them feel like the star of the page.
- The interaction layer is functional but does not add much polish or premium feel.

## Design Principles

1. Showcase first. The page should feel like viewing selected work, not reading a database.
2. Visual hierarchy through scale. Use image size, spacing, and asymmetry to create rhythm.
3. Motion as finish, not spectacle. Animation should make the page feel more expensive, not louder.
4. Readability stays intact. The page must still be easy to scan on a hiring pass.
5. Smoothness beats complexity. Prefer elegant reveal, parallax restraint, and better transitions over novelty.

## Page Structure

### 1. Hero

Purpose: establish the page as a curated body of work instead of a generic projects list.

Content:

- Retain the current title and description with possible tightening for showcase tone.
- Add a more spacious hero with stronger display treatment and improved top-of-page composition.

Layout:

- More open hero treatment, less like a padded card.
- Consider a text-led introduction with a visual supporting rhythm rather than enclosing everything in one surface.

### 2. Showcase Rail

Purpose: make each project feel like a featured piece.

Content:

- Keep all current projects.
- Preserve title, description, tags, cover image, and GitHub link.
- Optionally add a short label or sequence marker for curation.

Layout:

- Use larger images and stronger editorial proportion.
- Alternate rhythm between project blocks so scrolling feels designed.
- Reduce the feeling of identical cards repeating down the page.

### 3. Project Detail Layer

Purpose: help each showcase block still communicate substance.

Content:

- Keep a concise explanatory paragraph.
- Keep stack tags, but present them with less visual noise.
- Keep the external source link clear and easy to find.

Layout:

- Text should feel anchored to the image, not detached from it.
- Metadata should support the project instead of visually competing with it.

## Motion Direction

### Overall Feel

- Smooth
- Premium
- Low-friction
- Controlled

### Approved Motion Types

- Subtle reveal on section and project entrance
- Gentle image parallax or slight scale shift on scroll
- Refined hover transitions for project blocks and external links
- Consistent easing and timing across the page

### Motion Constraints

- No aggressive pinned storytelling sections
- No exaggerated kinetic transitions
- No animation that delays access to content
- Reduced-motion support is required

## GSAP Usage Boundary

GSAP is allowed if it is used for scroll-linked polish that Framer Motion does not handle as cleanly. Good uses here include:

- subtle image parallax
- smooth reveal sequencing tied to scroll position
- light scale or translate refinement on showcase media

GSAP should not be introduced for decorative complexity alone. If a motion idea can be expressed simply with the current setup, prefer the simpler path.

## Visual Direction

### Tone

- Showcase-forward
- Editorial
- Smooth and premium
- Confident but not loud

### Layout

- Bigger media blocks
- Clear breathing room between projects
- Alternating composition to create a curated gallery rhythm

### Surfaces

- Use quieter containers and fewer obvious card boundaries
- Let image framing and spacing carry more of the design language

### Typography

- Stronger project titles
- More refined relationship between headline, supporting copy, and metadata
- Maintain easy scanning for recruiters

## Accessibility And UX Requirements

- Maintain meaningful alt text using project titles.
- Keep project links clearly visible and keyboard accessible.
- Ensure hover interactions are not required to understand content.
- Preserve mobile readability and avoid awkward overflow from large media.
- Respect reduced-motion preferences across all enhanced interactions.

## Technical Plan Boundaries

- Implement within the current Next.js structure.
- Reuse the existing localized content source.
- Add GSAP only if it earns its place; keep the integration focused and minimal.
- Keep the page maintainable without creating a fragile animation architecture.

## Success Criteria

- The projects page feels clearly more like a curated showcase than a repeated list.
- Images have stronger visual presence without burying project meaning.
- Scroll pacing feels smoother and more intentional.
- Motion adds polish without distracting from content.
- The page remains fast to understand and easy to navigate on desktop and mobile.

## Testing

- Run lint, tests, and production build after implementation.
- Visually verify the projects page on desktop and mobile.
- Confirm localized rendering still works for both supported languages.
- If GSAP is added, confirm reduced-motion fallbacks and no layout instability.
