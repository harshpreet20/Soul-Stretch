import { Metadata } from 'next'
import { fetchProducts } from '@/lib/products'
import ProductGrid from '@/components/products/ProductGrid'
import ProductsPageClient from '@/components/products/ProductsPageClient'

export const metadata: Metadata = {
  title: 'Buy Gym Accessories Online India | Soul Stretch',
  description:
    'Buy premium fitness recovery equipment online in India. Shop foam rollers, resistance bands, grip trainers and gym accessories at Soul Stretch.',
  keywords: [
    'buy gym accessories online India',
    'premium fitness recovery equipment',
    'foam roller buy online India',
    'resistance bands India',
    'grip trainer online India',
    'premium fitness equipment India',
    'gym accessories online shopping',
  ],
}

export default async function ProductsPage() {
  const products = await fetchProducts()

  return <ProductsPageClient products={products} />
}
