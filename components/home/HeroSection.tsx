'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSegment } from '@/components/segments/SegmentProvider'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function HeroSection() {
  const { config, segment } = useSegment()

  // Split headline into lines for animation
  const headlineLines = config.heroHeadline.split('. ').map((l) => l.replace(/\.$/, ''))

  return (
    <section className="relative w-full min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-soul-black via-soul-black to-soul-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-soul-orange rounded-full filter blur-3xl opacity-10" />
          <div className="absolute bottom-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-soul-orange rounded-full filter blur-3xl opacity-5" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Segment Badge */}
        {segment !== 'athlete' && (
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block px-3 py-1 bg-soul-orange/10 border border-soul-orange/30 rounded-full text-xs font-medium text-soul-orange">
              Personalized for {config.label}s
            </span>
          </motion.div>
        )}

        {/* Main Headline */}
        <div className="mb-6 sm:mb-8 space-y-1 sm:space-y-2">
          {headlineLines.map((line, i) => (
            <motion.h1
              key={i}
              variants={itemVariants}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
                i === headlineLines.length - 1 ? 'text-soul-orange' : ''
              }`}
            >
              {line}{i < headlineLines.length - 1 ? '.' : '.'}
            </motion.h1>
          ))}
        </div>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-soul-gray mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2"
        >
          {config.heroSubtext}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-16 sm:mb-20 px-4 sm:px-0"
        >
          <Link href={config.ctaLink} className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-soul-orange text-soul-black font-bold rounded-lg hover:bg-orange-600 transition-colors text-base sm:text-lg"
            >
              {config.ctaLabel}
            </motion.button>
          </Link>
          <Link href="/guides" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 border-2 border-soul-orange text-soul-orange font-bold rounded-lg hover:bg-soul-orange hover:text-soul-black transition-colors text-base sm:text-lg"
            >
              Recovery Guides
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1.5, duration: 0.8 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
          className="cursor-pointer hidden sm:block"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
        >
          <svg className="w-6 h-6 text-soul-orange mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
