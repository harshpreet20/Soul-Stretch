import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import SegmentProvider from '@/components/segments/SegmentProvider'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soulstretch.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Soul Stretch',
    default: 'Premium Fitness Equipment India | Soul Stretch',
  },
  description:
    'Buy premium fitness equipment online in India. Soul Stretch offers foam rollers, resistance bands, hand grippers, gym gloves, skipping ropes, protein shakers at best prices. Free shipping above ₹999.',
  keywords: [
    'Soul Stretch',
    'fitness equipment India',
    'buy gym equipment online India',
    'gym accessories India',
    'foam roller India',
    'resistance bands India',
    'hand gripper India',
    'gym gloves India',
    'skipping rope India',
    'protein shaker India',
    'home gym India',
    'workout equipment India',
    'fitness gear India',
    'best gym accessories India price',
  ],
  authors: [{ name: 'Soul Stretch' }],
  creator: 'Soul Stretch',
  publisher: 'Soul Stretch',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Soul Stretch',
    title: 'Premium Fitness Equipment India | Soul Stretch',
    description:
      'Shop premium fitness equipment in India. Soul Stretch offers recovery and mobility accessories engineered for Indian athletes.',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Soul Stretch - Premium Fitness Recovery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soul Stretch | Premium Fitness Equipment India',
    description: 'Shop premium fitness equipment in India. Train Better. Recover Faster. Stretch Further.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@soulstretchIN',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0e0e0e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="bg-soul-black text-soul-white antialiased">
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Soul Stretch',
              url: 'https://soulstretch.in',
              logo: `${siteUrl}/images/soulstretchf.png`,
              description:
                'Soul Stretch is India\u2019s premium fitness equipment and recovery accessories brand, offering high-quality foam rollers, resistance bands, grip trainers, and athletic recovery tools engineered for Indian athletes and fitness enthusiasts.',
              foundingDate: '2024',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: 'en',
              },
              sameAs: [
                'https://instagram.com/soulstretchIN',
                'https://youtube.com/@soulstretch',
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'IN',
              },
            }),
          }}
        />
        <SegmentProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SegmentProvider>
      </body>
    </html>
  )
}
