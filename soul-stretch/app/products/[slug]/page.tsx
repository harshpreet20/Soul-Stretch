import { Metadata } from 'next'
import Link from 'next/link'
import { getProductBySlug, getAllProductSlugs, FALLBACK_PRODUCTS } from '@/lib/products'
import ProductDetailClient from '@/components/products/ProductDetailClient'

export async function generateStaticParams() {
  const slugs = getAllProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: `Buy ${product.name} Online India | Soul Stretch`,
    description: product.shortDescription + ' Buy online in India from Soul Stretch.',
    keywords: [
      product.name,
      `${product.name} India`,
      `buy ${product.name.toLowerCase()} online India`,
      product.category,
      'premium fitness equipment India',
      'buy online India',
      'Soul Stretch',
      ...product.benefits,
    ],
    openGraph: {
      title: `${product.name} - Premium Fitness Equipment | Soul Stretch India`,
      description: product.shortDescription,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: `${product.name} - Soul Stretch Premium Fitness Equipment India`,
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Product Not Found</h1>
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

  // Get related products (same category, excluding current)
  const related = FALLBACK_PRODUCTS
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-soul-black">
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.imageUrl,
            brand: { '@type': 'Brand', name: 'Soul Stretch' },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'INR',
              price: '',
              priceValidUntil: '2027-12-31',
              url: `https://soulstretch.in/products/${product.slug}`,
              seller: { '@type': 'Organization', name: 'Soul Stretch' },
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
              },
            },
            category: product.category,
          }),
        }}
      />

      <ProductDetailClient product={product} relatedProducts={related} />
    </div>
  )
}
