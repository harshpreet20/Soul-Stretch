import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soulstretch.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Soul Stretch',
    default: 'Premium Fitness Recovery Accessories India | Soul Stretch',
  },
  description:
    'Soul Stretch delivers premium gym accessories, foam rollers, resistance bands, grip trainers and recovery tools engineered for Indian athletes. Shop performance gear online.',
  keywords: [
    'premium gym accessories India',
    'fitness recovery equipment India',
    'foam roller muscle recovery',
    'resistance bands India',
    'grip strength trainer India',
    'home gym accessories India',
    'sports recovery tools',
    'athletic performance equipment',
  ],
  authors: [{ name: 'Soul Stretch' }],
  creator: 'Soul Stretch',
  publisher: 'Soul Stretch',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Soul Stretch',
    title: 'Premium Fitness Recovery Accessories India | Soul Stretch',
    description:
      'Train Better. Recover Faster. Stretch Further. Premium recovery and mobility accessories engineered for athletes.',
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
    title: 'Soul Stretch | Premium Fitness Recovery',
    description: 'Train Better. Recover Faster. Stretch Further.',
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
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Soul Stretch',
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description:
                'Premium recovery and mobility accessories engineered for athletes.',
              foundingDate: '2024',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguageID: 'en',
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
      </head>
      <body className="bg-soul-black text-soul-white">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
