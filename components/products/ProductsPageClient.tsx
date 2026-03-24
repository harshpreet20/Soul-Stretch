'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ProductGrid from './ProductGrid'
import { Product } from '@/lib/products'

interface ProductsPageClientProps {
  products: Product[]
}

export default function ProductsPageClient({ products }: ProductsPageClientProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ['start start', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const headerScale = useTransform(scrollYProgress, [0, 1], [1, 0.97])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="min-h-screen bg-soul-black">
      {/* Premium Header */}
      <section ref={headerRef} className="relative pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-soul-orange/[0.04] via-soul-black to-soul-black" />
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-soul-orange/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-soul-orange/[0.02] rounded-full blur-[80px]" />
          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.015] bg-noise" />
        </div>

        <motion.div
          style={{ y: headerY, scale: headerScale, opacity: headerOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-soul-orange/[0.08] border border-soul-orange/15 rounded-full text-xs font-medium text-soul-orange/80 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 bg-soul-orange rounded-full animate-pulse" />
              {products.length} Premium Products
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-soul-white mb-4 sm:mb-6 tracking-tight leading-[0.95]"
          >
            Premium Fitness
            <br />
            <span className="gradient-text">Equipment & Accessories</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-soul-gray/70 max-w-2xl mx-auto leading-relaxed px-2"
          >
            Recovery tools, grip trainers, resistance bands, and gym accessories. Engineered for athletes who refuse to compromise.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-6 sm:gap-10 mt-8 sm:mt-10"
          >
            {[
              { value: '13+', label: 'Products' },
              { value: '5', label: 'Categories' },
              { value: 'Pan-India', label: 'Delivery' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg sm:text-2xl font-black text-soul-orange">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-soul-gray/50 uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="py-4 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-soul-orange/[0.06] via-soul-black to-soul-black" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-soul-orange/[0.04] rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-8"
        >
          <div className="space-y-3">
            <p className="text-xs text-soul-orange/60 uppercase tracking-[0.2em] font-medium">For Gyms & Studios</p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-soul-white tracking-tight">
              Need Bulk Fitness Equipment?
            </h2>
            <p className="text-soul-gray/60 text-base sm:text-lg max-w-xl mx-auto">
              Premium fitness equipment for gyms, studios, and retail partners across India. Unlock custom bulk pricing today.
            </p>
          </div>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(255,122,24,0.25)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-soul-orange to-amber-500 text-soul-black font-bold rounded-xl hover:shadow-lg transition-all touch-manipulation text-lg mt-4"
            >
              Unlock Bulk Pricing
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
