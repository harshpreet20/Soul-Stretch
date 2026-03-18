import { Metadata } from 'next'
import Link from 'next/link'
import { fetchProducts } from '@/lib/products'
import ProductGrid from '@/components/products/ProductGrid'

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

  return (
    <div className="min-h-screen bg-soul-black">
      {/* Header */}
      <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-soul-orange/5 via-soul-black to-soul-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-soul-white mb-3 sm:mb-4">
            Premium Fitness Equipment<br />
            <span className="text-soul-orange">& Gym Accessories India</span>
          </h1>
          <p className="text-base sm:text-xl text-soul-gray max-w-2xl mx-auto leading-relaxed px-2">
            Buy fitness recovery tools online. Foam rollers, resistance bands, hand grippers, protein shakers, and more — engineered for athletes who refuse to compromise.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-soul-orange/10 via-soul-black to-soul-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-soul-white">
            Need Bulk Gym Equipment Delivery India-Wide?
          </h2>
          <p className="text-soul-gray text-base sm:text-lg">
            Contact us for bulk orders of premium fitness equipment, custom solutions, or retail partnerships across India.
          </p>
          <Link href="/contact">
            <button className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-soul-orange text-soul-black font-bold rounded-lg hover:bg-orange-600 transition-colors touch-manipulation mt-2">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
