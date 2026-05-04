import { Metadata } from 'next'
import { fetchProducts } from '@/lib/products'
import ProductsPageClient from '@/components/products/ProductsPageClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soulstretch.in'

export const metadata: Metadata = {
  title: 'Buy Gym & Fitness Equipment Online India | Soul Stretch Store',
  description:
    'Shop premium gym accessories online in India at best prices. Foam rollers, resistance bands, hand grippers, gym gloves, skipping ropes, protein shakers & more. Free shipping above ₹999.',
  keywords: [
    'buy gym equipment online India',
    'fitness equipment India',
    'gym accessories online India',
    'buy foam roller India',
    'resistance bands India',
    'hand gripper India',
    'gym gloves India',
    'skipping rope India',
    'protein shaker India',
    'home gym equipment India',
    'workout accessories online',
    'best gym equipment India price',
    'fitness accessories under 1000',
    'Soul Stretch products',
  ],
  alternates: {
    canonical: `${siteUrl}/products`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: `${siteUrl}/products`,
    siteName: 'Soul Stretch',
    title: 'Buy Gym & Fitness Equipment Online India | Soul Stretch',
    description: 'Shop premium gym accessories at best prices in India. Free shipping above ₹999.',
  },
}

export default async function ProductsPage() {
  const products = await fetchProducts()

  return <ProductsPageClient products={products} />
}
