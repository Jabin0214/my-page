import { SITE_CONFIG } from '../src/config/site'

export default function manifest() {
  return {
    name: SITE_CONFIG.title,
    short_name: 'Jabin Chen',
    description: SITE_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
