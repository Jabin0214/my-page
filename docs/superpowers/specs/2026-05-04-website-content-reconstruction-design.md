# Website Content Reconstruction Design

## Goal

Reconstruct the website content around Jabin Chen's current real experience, strongest projects, and clearest professional positioning so the site feels both more credible for hiring and more distinctive as a personal brand.

## Approved Direction

Use a balanced narrative-credibility approach. The website should present Jabin as a real builder with current production work, applied AI and automation experience, and end-to-end ownership, while still preserving a thoughtful personal tone and editorial feel.

## Source Of Truth

The primary content source for this redesign is:

- `Jabin_Chen_CV_Knowledge_Base.md`

The website should align to that knowledge base unless a field is clearly website-only presentation copy. When in doubt, prefer fidelity over embellishment.

## Audience

- Recruiters who need clear proof of employability, current work relevance, and role fit.
- Hiring managers who want to see real ownership, technical judgment, and project credibility.
- General visitors who should come away with a stronger sense of Jabin's direction and current level.

## Scope

- Reconstruct core website content in both English and Chinese.
- Update homepage identity, supporting narrative, and credibility signals.
- Re-prioritize and rewrite projects content to reflect current strongest work.
- Strengthen contact and conversion-oriented content.
- Align AI chat-facing identity and public-facing content tone with the knowledge base where needed.

## Out Of Scope

- A full visual redesign beyond what the updated content requires.
- Inventing new experience, metrics, roles, or responsibilities not supported by the knowledge base.
- Adding resume-only details everywhere without regard for readability.
- Replacing the existing localization architecture.

## Key Problems In Current Content

- The homepage positioning is too generic and under-describes what Jabin actually does now.
- Several high-value credibility signals are missing or buried, including current work, production ownership, and stronger current projects.
- The projects section still prioritizes older or less representative work over stronger recent projects.
- Contact and supporting content undersell hiring conversion signals such as LinkedIn, work rights, and real collaboration context.
- Parts of the website and AI-facing identity still reflect an older version of Jabin's story.

## Content Strategy

The content should answer these questions in this order:

1. What kind of engineer is Jabin now?
2. What kinds of systems and problems does he actually work on?
3. What proof shows that this is real and current?
4. How easy is it to contact or evaluate him for work?

This means the website should move away from broad student-to-developer framing and toward a more precise narrative:

- full-stack developer
- real-world systems and workflow tools
- AI-assisted products and automation
- production delivery and independent ownership

## Homepage Content Direction

### Hero

The hero should emphasize:

- professional identity
- strongest project/problem domain direction
- what Jabin is currently building or working on

It should stop sounding like a broad graduate portfolio introduction and start sounding like a current professional positioning statement.

### Credibility Signals

The homepage should prominently surface a small set of strong signals, likely including:

- based in Auckland
- current work across production systems, workflow tooling, or AI-assisted products
- practical ownership from problem discovery through shipped outcome

Signals like right to work and certifications should appear on the homepage or nearby supporting sections, but not necessarily in the first headline block.

### About Narrative

The about content should shift from generic enthusiasm language to a more grounded explanation of:

- what kinds of systems Jabin likes building
- how real business problems and product judgment show up in his work
- how his current trajectory combines full-stack, AI, and operationally useful software

### Experience Snapshot

The homepage should highlight the most representative experience entries rather than the full history equally.

Priority experience:

1. ST International Ltd
2. FRW Healthcare Ltd & ICT Graduate School
3. University of Auckland Teaching Assistant

Older or lower-signal entries should be reduced in prominence on the homepage.

## Projects Content Direction

The projects section should be re-prioritized to better reflect Jabin's strongest current body of work.

### New Priority Order

Recommended prominence order:

1. The Oneness Association
2. Schedora
3. FinanceBro
4. Medimate
5. Musichat
6. Older academic or exploratory work, if retained

### Project Content Rules

Each project should communicate:

- what problem it solved
- what Jabin owned
- what architecture or technical decisions mattered
- whether it is live, internal, personal, or still in development

The website must not misstate deployment status or production readiness.

### Accuracy Constraints

- Do not present Schedora as already deployed to AWS or live in production.
- Do not present FinanceBro as a trading bot that executes trades.
- Do not overstate IT administration scope inside ST International.
- Do not promote outdated projects as if they are the strongest current proof.

## Contact And Conversion Layer

The contact page should become more useful for hiring conversion.

Recommended additions or stronger visibility:

- LinkedIn
- NZ work rights
- Auckland location
- a clearer statement of the kinds of roles, projects, or conversations Jabin is open to

Optional but lower priority:

- Full Licence

This information should feel easy to find without making the page read like a form.

## AI Chat Alignment

The website-facing identity and the AI chat identity should align around the same core narrative.

The public site and chat assistant should both reflect:

- current role trajectory
- strongest real projects
- grounded claims only
- a direct, non-corporate tone

The AI system prompt does not need a complete rewrite unless the current wording conflicts with the updated public narrative, but it should be reviewed for drift.

## Localization Requirements

English and Chinese content should both be fully updated.

Requirements:

- Neither language should feel like a weaker adaptation of the other.
- Facts, project status, and credibility signals must stay aligned.
- Chinese copy can be slightly more natural and direct where literal translation would sound stiff.

## Data Model Boundaries

The existing `portfolio-content.js` model can remain the main source, but it will likely need:

- updated homepage hero and about fields
- stronger project descriptions and new project ordering
- richer contact content fields
- possible additions for credibility/supporting signals

If small helper fields improve content clarity, they are acceptable.

## Success Criteria

- A recruiter can understand Jabin's current professional identity and strongest areas within one homepage scan.
- The website reflects current, credible, and better-prioritized experience and projects.
- The site feels more aligned with Jabin's real knowledge base than with an older generic portfolio story.
- Contact and hiring-relevant information become easier to find.
- English and Chinese versions stay consistent and equally strong.

## Testing

- Validate updated localized content through existing tests and any new content assertions.
- Run lint, tests, and production build after implementation.
- Manually review homepage, projects, contact, and chat-adjacent wording for consistency.
