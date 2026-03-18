'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProductImageGalleryProps {
  imageUrl: string
  images: string[]
  name: string
}

export default function ProductImageGallery({ imageUrl, images, name }: ProductImageGalleryProps) {
  const allImages = [imageUrl, ...images]
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image */}
      <div className="relative h-72 sm:h-96 md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden bg-white/5">
        <Image
          src={allImages[activeIndex]}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
          className="object-contain p-4 sm:p-6"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soul-black/20 to-transparent pointer-events-none" />

        {/* Navigation Arrows - larger on mobile */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-soul-black/60 hover:bg-soul-orange/80 text-white rounded-full w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center transition-colors text-lg touch-manipulation"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % allImages.length)}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-soul-black/60 hover:bg-soul-orange/80 text-white rounded-full w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center transition-colors text-lg touch-manipulation"
            >
              ›
            </button>
          </>
        )}

        {/* Image counter for mobile */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:hidden bg-soul-black/60 rounded-full px-3 py-1 text-xs text-soul-white">
            {activeIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((img, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5 border-2 transition-colors touch-manipulation ${
                idx === activeIndex
                  ? 'border-soul-orange'
                  : 'border-transparent hover:border-soul-orange/30'
              }`}
            >
              <Image
                src={img}
                alt={`${name} view ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
