'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface Banner {
  id: number
  image: string
  alt: string
  link?: string
}

const banners: Banner[] = [
  {
    id: 1,
    image: '/images/banners/foam-roller-banner.png',
    alt: 'Soul Stretch Premium Foam Roller - Roll Better, Feel Better',
    link: '/products/foam-roller',
  },
  {
    id: 2,
    image: '/images/banners/banner-2.png',
    alt: 'Soul Stretch Premium Fitness Equipment - Banner 2',
    link: '/products',
  },
  {
    id: 3,
    image: '/images/banners/banner-3.png',
    alt: 'Soul Stretch Premium Fitness Equipment - Banner 3',
    link: '/products',
  },
  {
    id: 4,
    image: '/images/banners/banner-4.png',
    alt: 'Soul Stretch Premium Fitness Equipment - Banner 4',
    link: '/products',
  },
  {
    id: 5,
    image: '/images/banners/banner-5.png',
    alt: 'Soul Stretch Premium Fitness Equipment - Banner 5',
    link: '/products',
  },
]

const AUTOPLAY_INTERVAL = 5000
const SWIPE_THRESHOLD = 50

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const activeBanners = banners

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % activeBanners.length)
  }, [activeBanners.length])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)
  }, [activeBanners.length])

  useEffect(() => {
    if (isPaused || activeBanners.length <= 1) return
    const timer = setInterval(next, AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [isPaused, next, activeBanners.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) next()
      else prev()
    }
    setTouchStart(null)
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  const banner = activeBanners[current]

  return (
    <section>
      <div
        className="relative w-full aspect-[2/1] bg-soul-black overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={banner.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {banner.link ? (
              <Link href={banner.link} className="block relative w-full h-full">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  className="object-cover object-center"
                  priority={current === 0}
                  sizes="100vw"
                />
              </Link>
            ) : (
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                className="object-cover object-center"
                priority={current === 0}
                sizes="100vw"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-soul-orange/80 transition-colors"
              aria-label="Previous banner"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-soul-orange/80 transition-colors"
              aria-label="Next banner"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {activeBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 bg-soul-orange'
                    : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to banner ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {activeBanners.length > 1 && !isPaused && (
          <motion.div
            key={`progress-${current}`}
            className="absolute bottom-0 left-0 h-[3px] bg-soul-orange z-10"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
          />
        )}
      </div>
    </section>
  )
}
