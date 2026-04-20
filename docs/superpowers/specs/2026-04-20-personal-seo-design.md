# Personal SEO Design

## Goal

Help search engines confidently associate `https://jabinchen.com` with Jabin Chen, so searches for `Jabin Chen`, `JabinChen`, and developer portfolio terms can surface the site with accurate titles and summaries.

## Approved Approach

Use identity-first SEO as the main strategy, with light developer keyword support. The site should identify Jabin Chen as a person, point all canonical URLs to `jabinchen.com`, expose complete localized alternate links, and publish a valid sitemap that contains root, English, and Chinese pages.

## Scope

- Strengthen site configuration with official-name, alternate-name, role, location, and profile URL data.
- Keep metadata natural and readable instead of keyword-stuffed.
- Add reusable JSON-LD builders for `Person` and `WebSite` data.
- Put structured data on both the root language selector and localized home pages.
- Fix sitemap generation so every entry is a valid URL with correct localized alternates.
- Add tests for canonical URLs, alternate links, sitemap URLs, and structured data identity fields.

## Out Of Scope

- Google Search Console setup and manual sitemap submission.
- External profile updates, such as GitHub or LinkedIn backlinks.
- Paid ads or search ranking guarantees.

## Testing

Use Node tests for metadata helpers and sitemap output. Run lint, tests, and production build before reporting completion.
