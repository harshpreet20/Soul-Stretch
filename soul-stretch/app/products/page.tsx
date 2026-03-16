import { Metadata } from 'next'
import { fetchProducts } from '@/lib/products'
import ProductGrid from '@/components/products/ProductGrid'

export const metadata: Metadata = {
  title: 'Premium Recovery & Performance Accessories | Soul Stretch',
  description:
    'Shop our complete range of premium fitness recovery equipment. Foam rollers, resistance bands, grip trainers, and more engineered for serious athletes.',
  keywords: [
    'buy gym accessories online India',
    'foam roller online',
    'resistance bands buy',
    'grip trainer online',
    'recovery equipment',
  ],
}

export default async function ProductsPage() {
  const products = await fetchProducts()

  return (
    <div className="min-h-screen bg-soul-black">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-soul-orange/5 via-soul-black to-soul-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-soul-white mb-4">
            Premium Recovery &<br />
            <span className="text-soul-orange">Performance Accessories</span>
          </h1>
          <p className="text-xl text-soul-gray max-w-2xl mx-auto leading-relaxed">
            Engineered for athletes who refuse to compromise. Train harder. Recover smarter.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-soul-orange/10 via-soul-black to-soul-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-bold text-soul-white">
            Can't find what you're looking for?
          </h2>
          <p className="text-soul-gray text-lg">
            Contact us directly for bulk orders, custom solutions, or partnerships.
          </p>
          <a href="https://wa.me/919876543210?text=Hi, I'm interested in Soul Stretch products">
            <button className="px-8 py-4 bg-soul-orange text-soul-black font-bold rounded-lg hover:bg-orange-600 transition-colors">
              Chat on WhatsApp
            </button>
          </a>
        </div>
      </section>
    </div>
  )
}
