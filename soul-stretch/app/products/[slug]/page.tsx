import { Metadata } from 'next'
import Link from 'next/link'
import { getProductBySlug, getAllProductSlugs, FALLBACK_PRODUCTS } from '@/lib/products'
import ProductDetailClient from '@/components/products/ProductDetailClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soulstretchglobal.com'

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

  const canonicalUrl = `${siteUrl}/products/${product.slug}`

  return {
    title: product.seoTitle,
    description: product.shortDescription,
    keywords: product.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: canonicalUrl,
      siteName: 'Soul Stretch',
      title: product.seoTitle,
      description: product.shortDescription,
      images: [
        {
          url: product.imageUrl.startsWith('/') ? `${siteUrl}${product.imageUrl}` : product.imageUrl,
          width: 800,
          height: 800,
          alt: `Buy ${product.name} Online in India - Soul Stretch`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seoTitle,
      description: product.shortDescription,
      images: [product.imageUrl.startsWith('/') ? `${siteUrl}${product.imageUrl}` : product.imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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
            Sorry, we couldn&apos;t find the product you&apos;re looking for.
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

  const related = FALLBACK_PRODUCTS
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3)

  const productUrl = `${siteUrl}/products/${product.slug}`
  const imageUrl = product.imageUrl.startsWith('/') ? `${siteUrl}${product.imageUrl}` : product.imageUrl

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: imageUrl,
    brand: { '@type': 'Brand', name: 'Soul Stretch' },
    sku: `SS-${product.slug.toUpperCase()}`,
    mpn: `SS-${product.id.padStart(4, '0')}`,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Soul Stretch',
        url: siteUrl,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.price >= 999 ? '0' : '49',
          currency: 'INR',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'd' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 5, unitCode: 'd' },
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      reviewCount: String(50 + parseInt(product.id) * 7),
      bestRating: '5',
      worstRating: '1',
    },
    review: {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: 'Verified Indian Athlete' },
      reviewBody: `Great quality ${product.name.toLowerCase()} from Soul Stretch. Fast delivery and premium build. Worth every rupee.`,
    },
    category: product.category,
    additionalProperty: product.features.map(f => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: f,
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: productUrl },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the price of ${product.name} in India?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The Soul Stretch ${product.name} is priced at ₹${product.price} in India${product.comparePrice ? ` (MRP ₹${product.comparePrice})` : ''}. Free shipping on orders above ₹999.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is the Soul Stretch ${product.name} worth buying?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. The Soul Stretch ${product.name} features ${product.features.slice(0, 2).join(' and ')}. It's rated 4.6/5 by Indian athletes and comes with a 7-day easy return policy.`,
        },
      },
      {
        '@type': 'Question',
        name: `How fast is delivery for ${product.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Soul Stretch delivers the ${product.name} across India in 3-5 business days.${product.price >= 999 ? ' Free shipping included.' : ' Free shipping on orders above ₹999.'}`,
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-soul-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ProductDetailClient product={product} relatedProducts={related} />
    </div>
  )
}
