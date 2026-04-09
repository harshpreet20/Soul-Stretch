'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Side = 'bands' | 'dumbbells'

const bandsFeatures = [
  { text: 'Progressive overload built-in', icon: '✓' },
  { text: 'Joint-friendly variable resistance', icon: '✓' },
  { text: 'Portable and travel-friendly', icon: '✓' },
  { text: 'Space-efficient storage', icon: '✓' },
  { text: 'Unlimited exercise variations', icon: '✓' },
]

const dumbbellsFeatures = [
  { text: 'Fixed weight increments only', icon: '✕' },
  { text: 'Heavy impact on joints', icon: '✕' },
  { text: 'Requires home gym space', icon: '✕' },
  { text: 'Expensive full rack setup', icon: '✕' },
  { text: 'Limited exercise library', icon: '✕' },
]

const comparisonRows = [
  { label: 'Cost', bands: 'Under ₹1,500', dumbbells: '₹10,000+' },
  { label: 'Portability', bands: 'Fits in a bag', dumbbells: 'Fixed location' },
  { label: 'Joint Safety', bands: 'Low impact', dumbbells: 'High impact' },
  { label: 'Storage', bands: 'Drawer-sized', dumbbells: 'Full rack needed' },
  { label: 'Versatility', bands: '100+ exercises', dumbbells: '20-30 exercises' },
]

export default function ComparisonSlider() {
  const [activeView, setActiveView] = useState<Side>('bands')

  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soul-black via-soul-black to-soul-card opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-soul-white">
              Compare & Choose
            </h2>
            <p className="text-base sm:text-lg text-soul-gray max-w-2xl mx-auto">
              See why athletes are switching to Resistance Bands
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex justify-center">
            <div className="relative inline-flex bg-soul-card border border-white/[0.08] rounded-full p-1">
              <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-soul-orange"
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  left: activeView === 'bands' ? '4px' : '50%',
                  right: activeView === 'bands' ? '50%' : '4px',
                }}
              />
              <button
                onClick={() => setActiveView('bands')}
                className={`relative z-10 px-5 sm:px-8 py-2.5 rounded-full text-sm sm:text-base font-bold transition-colors ${
                  activeView === 'bands' ? 'text-soul-black' : 'text-soul-gray hover:text-soul-white'
                }`}
              >
                Resistance Bands
              </button>
              <button
                onClick={() => setActiveView('dumbbells')}
                className={`relative z-10 px-5 sm:px-8 py-2.5 rounded-full text-sm sm:text-base font-bold transition-colors ${
                  activeView === 'dumbbells' ? 'text-soul-black' : 'text-soul-gray hover:text-soul-white'
                }`}
              >
                Dumbbells
              </button>
            </div>
          </div>

          {/* Feature Cards - Side by Side on Desktop, Toggle on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Resistance Bands Card */}
            <motion.div
              className={`rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                activeView === 'bands'
                  ? 'bg-soul-orange/[0.08] border-soul-orange/30 md:bg-soul-orange/[0.08] md:border-soul-orange/30'
                  : 'bg-white/[0.02] border-white/[0.06] hidden md:block'
              }`}
              layout
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-soul-orange/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-soul-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-soul-orange">Resistance Bands</h3>
              </div>
              <ul className="space-y-3">
                {bandsFeatures.map((item, idx) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-soul-orange/20 text-soul-orange flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <span className="text-sm sm:text-base text-soul-white">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Dumbbells Card */}
            <motion.div
              className={`rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                activeView === 'dumbbells'
                  ? 'bg-white/[0.04] border-white/[0.12] md:bg-white/[0.04] md:border-white/[0.12]'
                  : 'bg-white/[0.02] border-white/[0.06] hidden md:block'
              }`}
              layout
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-soul-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-soul-white">Dumbbells</h3>
              </div>
              <ul className="space-y-3">
                {dumbbellsFeatures.map((item, idx) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-white/10 text-soul-gray flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <span className="text-sm sm:text-base text-soul-gray">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Head-to-Head Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-white/[0.08] overflow-hidden"
          >
            <div className="grid grid-cols-3 bg-white/[0.04] border-b border-white/[0.08]">
              <div className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-soul-gray uppercase tracking-wider">
                Feature
              </div>
              <div className="p-3 sm:p-4 text-xs sm:text-sm font-bold text-soul-orange text-center border-x border-white/[0.06]">
                Bands
              </div>
              <div className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-soul-gray text-center">
                Dumbbells
              </div>
            </div>
            {comparisonRows.map((row, idx) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`grid grid-cols-3 ${idx < comparisonRows.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
              >
                <div className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-soul-white">
                  {row.label}
                </div>
                <div className="p-3 sm:p-4 text-xs sm:text-sm text-soul-orange text-center font-medium border-x border-white/[0.06] bg-soul-orange/[0.03]">
                  {row.bands}
                </div>
                <div className="p-3 sm:p-4 text-xs sm:text-sm text-soul-gray text-center">
                  {row.dumbbells}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-sm text-soul-gray">
              Join thousands of Indian athletes who made the switch
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
