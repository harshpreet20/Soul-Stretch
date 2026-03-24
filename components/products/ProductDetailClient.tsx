'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Product } from '@/lib/products'
import ProductImageGallery from './ProductImageGallery'
import ProductCTAButtons from './ProductCTAButtons'

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

type DetailTab = 'description' | 'specs' | 'materials' | 'sizes' | 'faqs'

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])
  const [activeTab, setActiveTab] = useState<DetailTab>('description')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const allTabs: { id: DetailTab; label: string; show: boolean }[] = [
    { id: 'description' as DetailTab, label: 'Overview', show: !!(product as any).longDescription },
    { id: 'specs' as DetailTab, label: 'Specs', show: !!((product as any).specs && (product as any).specs.length > 0) },
    { id: 'materials' as DetailTab, label: 'Materials', show: !!((product as any).materialInfo && (product as any).materialInfo.length > 0) },
    { id: 'sizes' as DetailTab, label: 'Size Guide', show: !!((product as any).sizeChart && (product as any).sizeChart.length > 0) },
    { id: 'faqs' as DetailTab, label: 'FAQs', show: !!((product as any).faqs && (product as any).faqs.length > 0) },
  ]
  const tabs = allTabs.filter((t) => t.show)

  // Extract extended fields safely
  const ext = product as any

  return (
    <>
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-2 sm:pb-4"
      >
        <Link href="/products" className="inline-flex items-center gap-2 text-soul-gray/60 hover:text-soul-orange text-sm font-medium touch-manipulation transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Products
        </Link>
      </motion.div>

      {/* Hero Product Section */}
      <section ref={heroRef} className="relative py-6 sm:py-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-soul-orange/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-soul-orange/[0.02] rounded-full blur-[100px] pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-start">
              {/* Product Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -40, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ProductImageGallery imageUrl={product.imageUrl} images={product.images} name={product.name} />
              </motion.div>

              {/* Product Info */}
              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="space-y-3 sm:space-y-4">
                  <motion.div variants={fadeUp} className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-soul-orange/10 border border-soul-orange/20 rounded-full text-[10px] sm:text-xs font-medium text-soul-orange uppercase tracking-wider">
                      {product.category}
                    </span>
                    <span className="w-8 h-px bg-soul-orange/20" />
                  </motion.div>
                  <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-soul-white tracking-tight leading-[0.95]">
                    {product.name}
                  </motion.h1>
                  <motion.p variants={fadeUp} className="text-lg sm:text-2xl font-bold gradient-text">
                    {product.tagline}
                  </motion.p>
                </div>

                <motion.div variants={fadeUp} className="h-px bg-gradient-to-r from-soul-orange/20 via-soul-orange/10 to-transparent" />

                <motion.p variants={fadeUp} className="text-base sm:text-lg text-soul-gray/90 leading-relaxed">
                  {product.description}
                </motion.p>

                {/* Benefits */}
                <motion.div variants={fadeUp} className="space-y-4">
                  <h3 className="text-xs font-semibold text-soul-white/50 uppercase tracking-[0.15em]">Why Choose This</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {product.benefits.map((benefit, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-soul-orange/20 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-soul-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-soul-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-soul-white text-sm sm:text-base">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Specs Grid */}
                <motion.div variants={fadeUp} className="space-y-4">
                  <h3 className="text-xs font-semibold text-soul-white/50 uppercase tracking-[0.15em]">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {product.features.map((feature, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + idx * 0.08 }}
                        className="px-3 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl text-xs sm:text-sm text-soul-gray hover:text-soul-white hover:border-soul-orange/20 transition-all">
                        <span className="text-soul-orange/60 mr-1.5">▪</span>{feature}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={fadeUp}>
                  <ProductCTAButtons productName={product.name} productSlug={product.slug} />
                </motion.div>

                {/* Trust Badges */}
                <motion.div variants={fadeUp} className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/[0.06] space-y-3">
                  {[
                    { label: 'Premium Quality Assured', icon: '◆' },
                    { label: 'Fast Pan-India Delivery', icon: '◇' },
                    { label: 'Satisfaction Guaranteed', icon: '▲' },
                  ].map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-soul-orange text-xs">{badge.icon}</span>
                      <span className="text-xs sm:text-sm text-soul-gray/80">{badge.label}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tabbed Detail Sections */}
      {tabs.length > 0 && (
        <section className="py-12 sm:py-20 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide mb-8 sm:mb-12 border-b border-white/[0.06]"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
                    activeTab === tab.id ? 'text-soul-orange' : 'text-soul-gray/50 hover:text-soul-gray'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-soul-orange rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* Overview / Long Description */}
              {activeTab === 'description' && ext.longDescription && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="prose-custom"
                >
                  {(ext.longDescription as string).split('\n\n').map((paragraph: string, idx: number) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="text-soul-gray/80 text-sm sm:text-base leading-relaxed mb-5"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>
              )}

              {/* Specs Table */}
              {activeTab === 'specs' && ext.specs && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white/[0.01] border border-white/[0.06] rounded-2xl overflow-hidden">
                    {ext.specs.map((spec: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className={`flex items-center justify-between px-5 sm:px-6 py-4 ${
                          idx !== ext.specs.length - 1 ? 'border-b border-white/[0.04]' : ''
                        } hover:bg-white/[0.02] transition-colors`}
                      >
                        <span className="text-sm text-soul-gray/60 font-medium">{spec.label}</span>
                        <span className="text-sm text-soul-white font-semibold text-right">{spec.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Materials Chart */}
              {activeTab === 'materials' && ext.materialInfo && (
                <motion.div
                  key="materials"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {ext.materialInfo.map((mat: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.08 }}
                      className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:border-soul-orange/20 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-soul-orange/60 rounded-full" />
                        <h4 className="text-sm font-bold text-soul-white">{mat.material}</h4>
                      </div>
                      <span className="inline-block px-2 py-0.5 bg-soul-orange/10 border border-soul-orange/15 rounded-full text-[10px] text-soul-orange/80 mb-2 font-medium">
                        {mat.grade}
                      </span>
                      <p className="text-xs sm:text-sm text-soul-gray/70 leading-relaxed">{mat.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Size Chart */}
              {activeTab === 'sizes' && ext.sizeChart && (
                <motion.div
                  key="sizes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white/[0.01] border border-white/[0.06] rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full min-w-[400px]">
                      <thead>
                        <tr className="border-b border-white/[0.06]">
                          <th className="px-5 py-3 text-left text-xs font-semibold text-soul-orange/80 uppercase tracking-wider">Size</th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-soul-orange/80 uppercase tracking-wider">Dimensions</th>
                          {ext.sizeChart[0]?.weight && (
                            <th className="px-5 py-3 text-left text-xs font-semibold text-soul-orange/80 uppercase tracking-wider">Weight</th>
                          )}
                          {ext.sizeChart[0]?.recommended && (
                            <th className="px-5 py-3 text-left text-xs font-semibold text-soul-orange/80 uppercase tracking-wider">Recommended For</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {ext.sizeChart.map((row: any, idx: number) => (
                          <motion.tr
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.06 }}
                            className={`${idx !== ext.sizeChart!.length - 1 ? 'border-b border-white/[0.03]' : ''} hover:bg-white/[0.02] transition-colors`}
                          >
                            <td className="px-5 py-3 text-sm font-bold text-soul-white">{row.size}</td>
                            <td className="px-5 py-3 text-sm text-soul-gray/80">{row.dimensions}</td>
                            {row.weight !== undefined && <td className="px-5 py-3 text-sm text-soul-gray/80">{row.weight}</td>}
                            {row.recommended !== undefined && <td className="px-5 py-3 text-sm text-soul-gray/60">{row.recommended}</td>}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* FAQs */}
              {activeTab === 'faqs' && ext.faqs && (
                <motion.div
                  key="faqs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  {ext.faqs.map((faq: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="bg-white/[0.01] border border-white/[0.06] rounded-xl overflow-hidden hover:border-soul-orange/15 transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left touch-manipulation"
                      >
                        <span className="text-sm sm:text-base font-semibold text-soul-white pr-4">{faq.question}</span>
                        <motion.svg
                          animate={{ rotate: openFaq === idx ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-5 h-5 text-soul-orange/60 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-4 border-t border-white/[0.04]">
                              <p className="text-sm text-soul-gray/70 leading-relaxed pt-3">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-24 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-8 sm:mb-12">
              <p className="text-xs text-soul-orange/60 uppercase tracking-[0.2em] mb-2 font-medium">You may also like</p>
              <h2 className="text-2xl sm:text-4xl font-black text-soul-white tracking-tight">Related Products</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
              {relatedProducts.map((related, idx) => (
                <motion.div key={related.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }}>
                  <Link href={`/products/${related.slug}`}>
                    <div className="group bg-soul-card rounded-2xl overflow-hidden border border-white/[0.06] hover:border-soul-orange/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,122,24,0.1)]">
                      <div className="relative h-48 sm:h-56 overflow-hidden bg-white/[0.02]">
                        <Image src={related.imageUrl} alt={related.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-6 group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-soul-card to-transparent opacity-60" />
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="text-lg font-bold text-soul-white group-hover:text-soul-orange transition-colors">{related.name}</h3>
                        <p className="text-xs text-soul-orange/70 font-medium italic">{related.tagline}</p>
                        <div className="flex items-center gap-2 pt-2 text-sm text-soul-orange font-medium">
                          <span>View Details</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10 sm:mt-14">
              <Link href="/products">
                <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,122,24,0.2)' }} whileTap={{ scale: 0.98 }}
                  className="px-10 py-3.5 bg-white/[0.03] border border-soul-orange/30 text-soul-orange font-bold rounded-xl hover:bg-soul-orange hover:text-soul-black transition-all duration-300 touch-manipulation">
                  View All Products
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </>
  )
}
