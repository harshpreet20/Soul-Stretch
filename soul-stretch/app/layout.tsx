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
    default: 'Premium Fitness Equipment India | Soul Stretch',
  },
  description:
    'Shop premium fitness equipment in India. Soul Stretch offers foam rollers, resistance bands, grip trainers and recovery gear engineered for Indian athletes.',
  keywords: [
    'premium fitness equipment India',
    'buy gym accessories online India',
    'fitness recovery equipment India',
    'foam roller muscle recovery',
    'resistance bands India',
    'grip strength trainer India',
    'home gym accessories India',
    'sports recovery tools',
    'athletic performance equipment',
    'premium gym equipment online',
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
      <body className="bg-soul-black text-soul-white">
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Soul Stretch',
              url: 'https://soulstretch.in',
              logo: 'https://soulstretch.in/logo.png',
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
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
