'use client'

import { useState, useRef } from 'react'
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
  const [imgError, setImgError] = useState(false)

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
          className="relative h-64 overflow-hidden cursor-pointer"
          onClick={() => onToggle(product.slug)}
        >
          {imgError ? (
            <div className="w-full h-full bg-gradient-to-br from-soul-card to-soul-black flex flex-col items-center justify-center gap-2">
              <div className="w-16 h-16 rounded-full bg-soul-orange/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-soul-orange/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs text-soul-orange/40 font-medium uppercase tracking-widest">Soul Stretch</span>
            </div>
          ) : (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-soul-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

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
