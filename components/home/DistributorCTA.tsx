'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DistributorCTA() {
  return (
    <section className="relative py-12 sm:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-gradient-to-r from-soul-orange/10 via-soul-black to-soul-black"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-soul-white">
              Become a Soul Stretch<br />
              <span className="text-soul-orange">Retail Partner</span>
            </h2>
            <p className="text-base sm:text-xl text-soul-gray max-w-2xl mx-auto leading-relaxed px-2">
              We partner with gyms, sports retailers, and fitness studios to distribute premium fitness equipment across India.
              Stock the best gym accessories for athletes India trusts. Grow together.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/contact?type=distributor">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-3.5 sm:py-4 bg-soul-orange text-soul-black font-bold text-base sm:text-lg rounded-lg hover:bg-orange-600 transition-all touch-manipulation"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-8">
            {[
              { label: 'Stock Premium Fitness Equipment', icon: '⭐' },
              { label: 'High-Margin Gym Accessories', icon: '📈' },
              { label: 'Pan-India Marketing Support', icon: '📢' },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="bg-soul-card/50 backdrop-blur-sm border border-soul-orange/10 rounded-lg p-3 sm:p-4"
              >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{item.icon}</div>
                <p className="text-[10px] sm:text-sm text-soul-gray leading-tight">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
