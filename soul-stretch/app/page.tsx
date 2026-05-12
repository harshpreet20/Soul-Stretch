import { Metadata } from 'next'
import HeroCarousel from '@/components/home/HeroCarousel'
import ScrollStorytelling from '@/components/home/ScrollStorytelling'
import AppleProductReveal from '@/components/home/AppleProductReveal'
import ComparisonSlider from '@/components/home/ComparisonSlider'
import GuidesPreview from '@/components/home/GuidesPreview'
import DistributorCTA from '@/components/home/DistributorCTA'
import { FALLBACK_PRODUCTS } from '@/lib/products'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soulstretchglobal.com'

export const metadata: Metadata = {
  title: 'Soul Stretch | Buy Premium Fitness Equipment Online India',
  description:
    'India\'s #1 premium fitness equipment brand. Buy foam rollers, resistance bands, gym gloves, hand grippers, skipping ropes & more online. Free shipping above ₹999. Made in India.',
  keywords: [
    'Soul Stretch',
    'fitness equipment India',
    'buy gym equipment online India',
    'premium gym accessories India',
    'home gym equipment India',
    'foam roller India',
    'resistance bands India',
    'gym gloves India',
    'hand gripper India',
    'skipping rope India',
    'fitness recovery equipment',
    'best gym accessories India',
    'workout equipment online India',
    'made in India fitness',
  ],
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Soul Stretch Products',
    description: 'Premium fitness equipment available online in India',
    numberOfItems: FALLBACK_PRODUCTS.length,
    itemListElement: FALLBACK_PRODUCTS.map((product, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${siteUrl}/products/${product.slug}`,
      name: product.name,
      image: product.imageUrl.startsWith('/') ? `${siteUrl}${product.imageUrl}` : product.imageUrl,
    })),
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Soul Stretch',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <HeroCarousel />
      <ScrollStorytelling />
      <AppleProductReveal />
      <ComparisonSlider />
      <GuidesPreview />
      <DistributorCTA />
    </>
  )
}
