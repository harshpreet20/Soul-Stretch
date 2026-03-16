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
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [height, setHeight] = useState('auto')
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const allImages = [product.imageUrl, ...product.images]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setTilt({
      x: y * 5,
      y: -x * 5,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  useEffect(() => {
    if (cardRef.current && isExpanded) {
      setHeight(`${cardRef.current.scrollHeight}px`)
    } else {
      setHeight('auto')
    }
  }, [isExpanded])

  return (
    <motion.div
      ref={cardRef}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Container */}
      <motion.div
        className="bg-soul-card rounded-2xl overflow-hidden border border-soul-orange/10 hover:border-soul-orange/30 transition-all"
        style={
          !isExpanded
            ? {
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }
            : undefined
        }
      >
        {/* Image Section */}
        <div
          className="relative h-64 overflow-hidden cursor-pointer bg-white/5"
          onClick={() => onToggle(product.slug)}
        >
          <Image
            src={allImages[activeImageIndex]}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soul-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Image Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-soul-black/60 hover:bg-soul-orange/80 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveImageIndex((prev) => (prev + 1) % allImages.length)
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-soul-black/60 hover:bg-soul-orange/80 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              >
                ›
              </button>
            </>
          )}

          {/* Image Dots */}
          {allImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImageIndex(idx)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
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
            className="absolute bottom-4 right-4 bg-soul-orange/90 rounded-full p-2 backdrop-blur-sm"
            animate={{ rotate: isExpanded ? 180 : 0 }}
          >
            <svg
              className="w-5 h-5 text-soul-black"
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
        <div className="p-6 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-soul-white group-hover:text-soul-orange transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-soul-orange font-medium">{product.tagline}</p>
          </div>

          {/* Collapsed - Short Description */}
          {!isExpanded && (
            <p className="text-sm text-soul-gray truncate-2">
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
                className="space-y-4 pt-2 overflow-hidden"
              >
                {/* Full Description */}
                <p className="text-sm text-soul-gray leading-relaxed">
                  {product.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-soul-white">Benefits:</h4>
                  <ul className="space-y-1">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-soul-gray flex items-start gap-2">
                        <span className="text-soul-orange mt-1">▸</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-soul-white">Features:</h4>
                  <ul className="space-y-1">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-sm text-soul-gray flex items-start gap-2">
                        <span className="text-soul-orange mt-1">▪</span>
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
                  className="pt-4"
                >
                  <Link href={`/products/${product.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 bg-soul-orange/20 border border-soul-orange text-soul-orange font-medium rounded-lg hover:bg-soul-orange hover:text-soul-black transition-all text-sm"
                    >
                      View Full Details
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
