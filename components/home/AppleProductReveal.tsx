'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const products = [
  {
    id: 1,
    title: 'RECOVER FASTER',
    subtitle: 'Deep tissue relief engineered for peak recovery',
    product: 'Foam Roller',
    slug: 'foam-roller',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80',
  },
  {
    id: 2,
    title: 'MOVE BETTER',
    subtitle: 'Progressive resistance for every movement pattern',
    product: 'Resistance Bands',
    slug: 'resistance-band-set',
    image: 'https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=800&q=80',
  },
  {
    id: 3,
    title: 'BUILD STRENGTH',
    subtitle: 'Anti-slip grip and wrist support for serious athletes',
    product: 'Gym Gloves',
    slug: 'gym-gloves',
    image: 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=800&q=80',
  },
]

export default function AppleProductReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={containerRef} className="relative">
      {products.map((product, idx) => (
        <ProductRevealSection
          key={product.id}
          product={product}
          index={idx}
          scrollYProgress={scrollYProgress}
          total={products.length}
        />
      ))}
    </div>
  )
}

interface ProductRevealSectionProps {
  product: (typeof products)[0]
  index: number
  scrollYProgress: any
  total: number
}

function ProductRevealSection({
  product,
  index,
  scrollYProgress,
  total,
}: ProductRevealSectionProps) {
  const scale = useTransform(
    scrollYProgress,
    [index / total, (index + 1) / total],
    [0.8, 1]
  )

  const opacity = useTransform(
    scrollYProgress,
    [index / total - 0.1, index / total, (index + 1) / total],
    [0, 1, 0.5]
  )

  return (
    <section className="relative min-h-[80vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-soul-black via-soul-card to-soul-black" />

      {/* Accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-soul-orange via-soul-orange to-transparent opacity-50" />

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center py-12 sm:py-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 order-2 lg:order-1"
          >
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-soul-orange mb-3 sm:mb-4">
                {product.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-soul-white font-light leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            <div className="space-y-4 pt-4 sm:pt-8">
              <p className="text-base sm:text-lg text-soul-gray leading-relaxed">
                {product.product} delivers premium performance engineered for serious athletes.
              </p>

              <Link href={`/products/${product.slug}`}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 sm:mt-8 w-full sm:w-auto px-8 py-3 bg-soul-orange text-soul-black font-bold rounded-lg hover:bg-orange-600 transition-colors inline-block touch-manipulation"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Product Image */}
          <motion.div
            style={{ scale, opacity }}
            className="relative aspect-square order-1 lg:order-2 max-h-[50vh] sm:max-h-none"
          >
            <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.product}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soul-black/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
