import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProductBySlug, getAllProductSlugs } from '@/lib/products'
import { motion } from 'framer-motion'

export async function generateStaticParams() {
  const slugs = getAllProductSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | Soul Stretch`,
    description: product.description,
    keywords: [
      product.name,
      product.category,
      'buy online',
      'India',
      ...product.benefits,
    ],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  }
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-soul-gray mb-6">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Link href="/products">
            <button className="px-6 py-3 bg-soul-orange text-soul-black font-bold rounded-lg hover:bg-orange-600 transition-colors">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-soul-black">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/products" className="text-soul-orange hover:text-orange-600 text-sm font-medium">
          ← Back to Products
        </Link>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden bg-white/5">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-6"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soul-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-3">
                <p className="text-soul-orange font-medium text-sm uppercase tracking-wide">
                  {product.category}
                </p>
                <h1 className="text-5xl sm:text-6xl font-black text-soul-white">
                  {product.name}
                </h1>
                <p className="text-2xl text-soul-orange font-bold">{product.tagline}</p>
              </div>

              {/* Description */}
              <p className="text-lg text-soul-gray leading-relaxed">
                {product.description}
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-soul-white">Benefits</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-soul-orange font-bold mt-0.5">✓</span>
                      <span className="text-soul-white">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-soul-white">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-soul-orange text-lg">●</span>
                      <span className="text-soul-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-8">
                <a href={`https://wa.me/919876543210?text=Hi, I'm interested in ${product.name}`} target="_blank" rel="noopener noreferrer">
                  <button className="w-full px-8 py-4 bg-soul-orange text-soul-black font-bold rounded-lg hover:bg-orange-600 transition-colors text-lg">
                    Contact via WhatsApp
                  </button>
                </a>
                <Link href="/contact">
                  <button className="w-full px-8 py-4 border-2 border-soul-orange text-soul-orange font-bold rounded-lg hover:bg-soul-orange hover:text-soul-black transition-colors text-lg">
                    Send Inquiry
                  </button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="bg-soul-card rounded-lg p-6 border border-soul-orange/10 space-y-3">
                <p className="text-sm text-soul-gray flex items-center gap-2">
                  <span className="text-soul-orange">✓</span>
                  Premium Quality Assured
                </p>
                <p className="text-sm text-soul-gray flex items-center gap-2">
                  <span className="text-soul-orange">✓</span>
                  Fast Pan-India Delivery
                </p>
                <p className="text-sm text-soul-gray flex items-center gap-2">
                  <span className="text-soul-orange">✓</span>
                  Satisfaction Guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 border-t border-soul-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-soul-white mb-8">
            Explore More Products
          </h2>
          <Link href="/products">
            <button className="px-8 py-4 bg-soul-orange/20 border border-soul-orange text-soul-orange font-bold rounded-lg hover:bg-soul-orange hover:text-soul-black transition-colors">
              View All Products
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
