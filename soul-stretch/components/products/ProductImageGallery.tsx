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
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden bg-white/5">
        <Image
          src={allImages[activeIndex]}
          alt={name}
          fill
          className="object-contain p-6"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soul-black/20 to-transparent pointer-events-none" />

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-soul-black/60 hover:bg-soul-orange/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors text-lg"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % allImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-soul-black/60 hover:bg-soul-orange/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors text-lg"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5 border-2 transition-colors ${
                idx === activeIndex
                  ? 'border-soul-orange'
                  : 'border-transparent hover:border-soul-orange/30'
              }`}
            >
              <Image
                src={img}
                alt={`${name} view ${idx + 1}`}
                fill
                className="object-contain p-1"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
