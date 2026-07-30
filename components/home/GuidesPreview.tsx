'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const guides = [
  {
    id: 1,
    title: '10 Foam Roller Exercises for Muscle Recovery',
    summary: 'Master the essential techniques to accelerate post-workout recovery.',
    href: '/guides',
    icon: '🔄',
  },
  {
    id: 2,
    title: 'Best Resistance Band Workouts at Home',
    summary: 'Full-body conditioning with zero equipment footprint.',
    href: '/guides',
    icon: '💪',
  },
  {
    id: 3,
    title: 'How Grip Strength Improves Athletic Performance',
    summary: 'Understand the science behind elite grip development.',
    href: '/guides',
    icon: '🏋️',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function GuidesPreview() {
  return (
    <section className="relative py-12 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soul-black via-soul-black to-soul-card opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-soul-white mb-3 sm:mb-4">
            Learn from the Best
          </h2>
          <p className="text-base sm:text-xl text-soul-gray max-w-2xl mx-auto px-2">
            Expert guides designed to elevate your training and recovery game.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {guides.map((guide) => (
            <motion.div
              key={guide.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={guide.href}>
                <div className="h-full bg-soul-card rounded-xl p-5 sm:p-6 border border-soul-orange/10 hover:border-soul-orange/30 active:border-soul-orange/40 transition-all duration-300 cursor-pointer">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="text-3xl sm:text-4xl">{guide.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-soul-white group-hover:text-soul-orange transition-colors leading-tight">
                      {guide.title}
                    </h3>
                    <p className="text-soul-gray text-xs sm:text-sm leading-relaxed">
                      {guide.summary}
                    </p>
                    <div className="pt-3 sm:pt-4 border-t border-soul-orange/10 group-hover:border-soul-orange/30 transition-colors">
                      <span className="text-soul-orange text-sm font-medium flex items-center gap-2">
                        Read Guide
                        <svg
                          className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link href="/guides">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-soul-orange text-soul-black font-bold rounded-lg hover:bg-orange-600 transition-colors touch-manipulation"
            >
              View All Guides
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
