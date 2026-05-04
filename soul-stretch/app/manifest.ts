import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Soul Stretch - Premium Fitness Equipment India',
    short_name: 'Soul Stretch',
    description: 'Train Better. Recover Faster. Stretch Further. Premium fitness equipment made in India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#ff7a18',
    icons: [
      {
        src: '/images/soulstretchf.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/soulstretchf.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}
