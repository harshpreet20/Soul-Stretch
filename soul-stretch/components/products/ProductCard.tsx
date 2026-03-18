'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  isExpanded: boolean
  onToggle: (slug: string) => void
}

export default function ProductCard({ product, isExpanded, onToggle }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const allImages = [product.imageUrl, ...product.images]

  return (
    <motion.div ref={cardRef} className="group">
      {/* Card Container */}
      <div className="bg-soul-card rounded-xl sm:rounded-2xl overflow-hidden border border-soul-orange/10 hover:border-soul-orange/30 transition-all active:border-soul-orange/40">
        {/* Image Section */}
        <div
          className="relative h-48 sm:h-64 overflow-hidden cursor-pointer bg-white/5"
          onClick={() => onToggle(product.slug)}
        >
          <Image
            src={allImages[activeImageIndex]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soul-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Image Navigation Arrows - larger touch targets on mobile */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
                }}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-soul-black/60 hover:bg-soul-orange/80 text-white rounded-full w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs touch-manipulation"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveImageIndex((prev) => (prev + 1) % allImages.length)
                }}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-soul-black/60 hover:bg-soul-orange/80 text-white rounded-full w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs touch-manipulation"
              >
                ›
              </button>
            </>
          )}

          {/* Image Dots */}
          {allImages.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImageIndex(idx)
                  }}
                  className={`w-2 h-2 rounded-full transition-all touch-manipulation ${
                    idx === activeImageIndex
                      ? 'bg-soul-orange w-4'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Expand Icon */}
          <motion.div
            className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-soul-orange/90 rounded-full p-1.5 sm:p-2 backdrop-blur-sm"
            animate={{ rotate: isExpanded ? 180 : 0 }}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-soul-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-soul-white group-hover:text-soul-orange transition-colors">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-soul-orange font-medium">{product.tagline}</p>
          </div>

          {/* Collapsed - Short Description */}
          {!isExpanded && (
            <p className="text-xs sm:text-sm text-soul-gray truncate-2">
              {product.shortDescription}
            </p>
          )}

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 sm:space-y-4 pt-2 overflow-hidden"
              >
                {/* Full Description */}
                <p className="text-xs sm:text-sm text-soul-gray leading-relaxed">
                  {product.description}
                </p>

                {/* Benefits */}
                <div className="space-y-1.5 sm:space-y-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-soul-white">Benefits:</h4>
                  <ul className="space-y-1">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-soul-gray flex items-start gap-2">
                        <span className="text-soul-orange mt-0.5">▸</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="space-y-1.5 sm:space-y-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-soul-white">Features:</h4>
                  <ul className="space-y-1">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-soul-gray flex items-start gap-2">
                        <span className="text-soul-orange mt-0.5">▪</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="pt-3 sm:pt-4"
                >
                  <Link href={`/products/${product.slug}`}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2.5 sm:py-2 bg-soul-orange/20 border border-soul-orange text-soul-orange font-medium rounded-lg hover:bg-soul-orange hover:text-soul-black transition-all text-sm touch-manipulation"
                    >
                      View Full Details
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
