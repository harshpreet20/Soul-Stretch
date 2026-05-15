'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  isExpanded: boolean
  onToggle: (slug: string) => void
}

export default function ProductCard({ product, isExpanded, onToggle }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const allImages = [product.imageUrl, ...product.images]

  // 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const categoryColors: Record<string, string> = {
    recovery: 'from-orange-500/20 to-amber-600/5',
    strength: 'from-red-500/20 to-rose-600/5',
    support: 'from-blue-500/20 to-cyan-600/5',
    accessories: 'from-purple-500/20 to-violet-600/5',
    cardio: 'from-green-500/20 to-emerald-600/5',
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group perspective"
    >
      <div className={`relative bg-soul-card rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 ${
        isHovered
          ? 'border-soul-orange/40 shadow-[0_0_40px_rgba(255,122,24,0.12)]'
          : isExpanded
            ? 'border-soul-orange/30 shadow-[0_0_30px_rgba(255,122,24,0.08)]'
            : 'border-white/[0.06] shadow-lg'
      }`}>
        {/* Ambient gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[product.category] || 'from-soul-orange/10 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0`} />

        {/* Shimmer line on hover */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-soul-orange/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Image Section */}
        <div
          className="relative h-56 sm:h-72 overflow-hidden cursor-pointer bg-white"
          onClick={() => onToggle(product.slug)}
        >

          {/* Product Image with crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={allImages[activeImageIndex]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-6 sm:p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>

          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-soul-card via-transparent to-transparent opacity-80" />

          {/* Floating category badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10"
          >
            <span className="px-2.5 py-1 bg-soul-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] sm:text-xs font-medium text-soul-gray uppercase tracking-wider">
              {product.category}
            </span>
          </motion.div>

          {/* Image Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
                }}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-soul-black/40 backdrop-blur-sm hover:bg-soul-orange/80 text-white/80 hover:text-white rounded-full w-8 h-8 flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 text-xs touch-manipulation border border-white/10 hover:border-soul-orange/50"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveImageIndex((prev) => (prev + 1) % allImages.length)
                }}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-soul-black/40 backdrop-blur-sm hover:bg-soul-orange/80 text-white/80 hover:text-white rounded-full w-8 h-8 flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 text-xs touch-manipulation border border-white/10 hover:border-soul-orange/50"
              >
                ›
              </button>
            </>
          )}

          {/* Image Dots */}
          {allImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImageIndex(idx)
                  }}
                  className={`rounded-full transition-all duration-300 touch-manipulation ${
                    idx === activeImageIndex
                      ? 'bg-soul-orange w-5 h-1.5'
                      : 'bg-white/30 hover:bg-white/50 w-1.5 h-1.5'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Expand indicator */}
          <motion.div
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-soul-orange/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-soul-orange/20">
              <svg
                className="w-4 h-4 text-soul-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 p-5 sm:p-6 space-y-3">
          {/* Title + Tagline */}
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-soul-white group-hover:text-soul-orange transition-colors duration-300 tracking-tight">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-soul-orange/80 font-medium italic">{product.tagline}</p>
          </div>

          {/* Price + Short Description (always visible) */}
          {!isExpanded && (
            <>
              {/* Price Row */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-soul-white">₹{product.price}</span>
                {product.comparePrice && (
                  <span className="text-sm text-soul-gray/50 line-through">₹{product.comparePrice}</span>
                )}
                {product.comparePrice && (
                  <span className="px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-[10px] font-bold text-green-400">
                    {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-soul-gray/70 line-clamp-2 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Buy Buttons — always visible */}
              <div className="space-y-2 pt-2">
                {/* WhatsApp Order */}
                <motion.a
                  href={`https://wa.me/919217103413?text=${encodeURIComponent(`Hi, I'd like to order ${product.name} (₹${product.price})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(37,211,102,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white font-bold rounded-xl text-sm touch-manipulation transition-all hover:bg-[#20BD5A]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Order on WhatsApp
                </motion.a>

                {/* Amazon / Flipkart Row */}
                {product.marketplaceLinks && product.marketplaceLinks.length > 0 && (
                  <div className="flex gap-2">
                    {(() => {
                      const amazonLinks = product.marketplaceLinks!.filter(l => l.platform === 'amazon')
                      const flipkartLinks = product.marketplaceLinks!.filter(l => l.platform === 'flipkart')
                      return (
                        <>
                          {amazonLinks.length > 0 && (
                            <motion.a
                              href={amazonLinks[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              whileHover={{ scale: 1.04, y: -1 }}
                              whileTap={{ scale: 0.96 }}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#232F3E] border border-[#FF9900]/30 rounded-xl hover:border-[#FF9900]/60 hover:shadow-[0_0_12px_rgba(255,153,0,0.15)] transition-all duration-300"
                            >
                              <span className="text-xs font-bold text-white">Buy on</span>
                              <svg className="h-3" viewBox="0 0 100 30" fill="none">
                                <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="22" fill="#FF9900">amazon</text>
                              </svg>
                              <motion.svg
                                className="w-3 h-3 text-[#FF9900] flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </motion.svg>
                            </motion.a>
                          )}
                          {flipkartLinks.length > 0 && (
                            <motion.a
                              href={flipkartLinks[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              whileHover={{ scale: 1.04, y: -1 }}
                              whileTap={{ scale: 0.96 }}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#172B4D] border border-[#2874F0]/30 rounded-xl hover:border-[#2874F0]/60 hover:shadow-[0_0_12px_rgba(40,116,240,0.15)] transition-all duration-300"
                            >
                              <span className="text-xs font-bold text-white">Buy on</span>
                              <svg className="h-3" viewBox="0 0 80 30" fill="none">
                                <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="22" fill="#2874F0">Flipkart</text>
                              </svg>
                              <motion.svg
                                className="w-3 h-3 text-[#2874F0] flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </motion.svg>
                            </motion.a>
                          )}
                        </>
                      )
                    })()}
                  </div>
                )}

                {/* View Details link */}
                <Link
                  href={`/products/${product.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="block text-center text-xs text-soul-gray/50 hover:text-soul-orange transition-colors pt-1 underline underline-offset-2 decoration-soul-gray/20 hover:decoration-soul-orange/40"
                >
                  View full details &amp; more sizes →
                </Link>
              </div>
            </>
          )}

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-2">
                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-soul-orange/20 to-transparent" />

                  {/* Full Description */}
                  <p className="text-xs sm:text-sm text-soul-gray/90 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-soul-white/60 uppercase tracking-wider">Benefits</h4>
                    <ul className="space-y-1.5">
                      {product.benefits.map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="text-xs sm:text-sm text-soul-gray flex items-start gap-2"
                        >
                          <span className="w-1 h-1 mt-1.5 bg-soul-orange rounded-full flex-shrink-0" />
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-soul-white/60 uppercase tracking-wider">Specs</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {product.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                          className="px-2.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[10px] sm:text-xs text-soul-gray/80"
                        >
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-2"
                  >
                    <Link href={`/products/${product.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(255,122,24,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-soul-orange to-amber-500 text-soul-black font-bold rounded-xl transition-all text-sm touch-manipulation relative overflow-hidden group/btn"
                      >
                        <span className="relative z-10">View Full Details</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-soul-orange opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
