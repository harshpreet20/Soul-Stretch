'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductImageGalleryProps {
  imageUrl: string
  images: string[]
  name: string
}

export default function ProductImageGallery({ imageUrl, images, name }: ProductImageGalleryProps) {
  const allImages = [imageUrl, ...images]
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const navigate = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1)
    setActiveIndex(newIndex)
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    }),
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image Container */}
      <div className="relative h-72 sm:h-96 md:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-white/[0.06]">

        {/* Animated image */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={allImages[activeIndex]}
              alt={`${name} - view ${activeIndex + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-contain p-6 sm:p-10"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => navigate((activeIndex - 1 + allImages.length) % allImages.length)}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-soul-black/40 backdrop-blur-md hover:bg-soul-orange/80 text-white/70 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 text-lg touch-manipulation border border-white/10 hover:border-soul-orange/50 hover:shadow-lg hover:shadow-soul-orange/20"
            >
              ‹
            </button>
            <button
              onClick={() => navigate((activeIndex + 1) % allImages.length)}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 bg-soul-black/40 backdrop-blur-md hover:bg-soul-orange/80 text-white/70 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 text-lg touch-manipulation border border-white/10 hover:border-soul-orange/50 hover:shadow-lg hover:shadow-soul-orange/20"
            >
              ›
            </button>
          </>
        )}

        {/* Image counter pill */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-soul-black/50 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10">
            <div className="flex items-center gap-2">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(idx)}
                  className={`rounded-full transition-all duration-300 touch-manipulation ${
                    idx === activeIndex
                      ? 'bg-soul-orange w-6 h-1.5'
                      : 'bg-white/25 hover:bg-white/40 w-1.5 h-1.5'
                  }`}
                />
              ))}
            </div>
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
              onClick={() => navigate(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white transition-all duration-300 touch-manipulation ${
                idx === activeIndex
                  ? 'border-2 border-soul-orange shadow-lg shadow-soul-orange/20 scale-105'
                  : 'border-2 border-white/[0.06] hover:border-soul-orange/30'
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
              {idx === activeIndex && (
                <motion.div
                  layoutId="thumbActive"
                  className="absolute inset-0 border-2 border-soul-orange rounded-xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
