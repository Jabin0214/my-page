# Jabin Portfolio

A Next.js App Router portfolio built for Vercel deployment, custom domains, and stronger SEO fundamentals.

## Stack

- Next.js 16
- React 19
- Tailwind CSS
- Framer Motion
- Three.js
- i18next / react-i18next

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Checks

```bash
npm run lint
npm run build
```

## Deploy To Vercel

1. Import this repository into Vercel.
2. Keep the framework preset as `Next.js`.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain, for example `https://www.yourdomain.com`.
4. Add your custom domain in the Vercel dashboard.

## SEO Notes

- Core pages are prerendered as static HTML.
- Metadata is configured in [`app/layout.jsx`](./app/layout.jsx).
- `robots.txt` is generated from [`app/robots.js`](./app/robots.js).
- `sitemap.xml` is generated from [`app/sitemap.js`](./app/sitemap.js).

## Recommended Next Step

After the domain is connected, update `NEXT_PUBLIC_SITE_URL` in Vercel so canonical URLs, sitemap links, and social metadata all use the real production domain.
