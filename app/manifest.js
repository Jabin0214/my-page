import { SITE_CONFIG } from '../src/config/site'

export default function manifest() {
  return {
    name: SITE_CONFIG.title,
    short_name: 'Jabin Chen',
    description: SITE_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#eef3f7',
    theme_color: '#eef3f7',
    icons: [
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
