'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MarketplaceLink } from '@/lib/products'

interface MarketplaceButtonsProps {
  links: MarketplaceLink[]
  productName: string
}

function AmazonLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 603 182" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M374.1 142.3c-35.1 25.9-86 39.7-129.8 39.7-61.4 0-116.7-22.7-158.6-60.5-3.3-3-0.3-7 3.6-4.7 45.2 26.3 101 42.1 158.7 42.1 38.9 0 81.7-8.1 121.1-24.8 5.9-2.5 10.9 3.9 5 8.2z" />
      <path d="M388.3 126.2c-4.5-5.7-29.5-2.7-40.8-1.4-3.4 0.4-3.9-2.6-0.9-4.7 20-14.1 52.8-10 56.6-5.3 3.8 4.8-1 37.8-19.8 53.5-2.9 2.4-5.6 1.1-4.3-2.1 4.2-10.5 13.7-34.2 9.2-40z" />
      <path d="M348.6 23.7V7.4c0-2.5 1.9-4.1 4.1-4.1h73c2.3 0 4.2 1.7 4.2 4.1v14c0 2.3-2 5.3-5.4 10l-37.8 54c14-0.3 28.8 1.7 41.5 8.8 2.9 1.6 3.6 3.9 3.9 6.2v17.4c0 2.3-2.6 5.1-5.3 3.7-22.1-11.6-51.5-12.8-75.9 0.1-2.5 1.3-5.1-1.4-5.1-3.7v-16.5c0-2.6 0-7 2.7-10.9l43.8-62.8h-38.1c-2.3 0-4.2-1.7-4.2-4h-0.4z" />
      <path d="M124.9 105.3H100c-2.4-0.2-4.3-2-4.5-4.3V7.6c0-2.6 2.2-4.6 4.8-4.6h23.2c2.4 0.1 4.4 2.1 4.5 4.4V22h0.5C134 8.5 144.5 1.2 158.6 1.2c14.3 0 23.2 7.3 29.6 21.1 5.4-13.8 17.6-21.1 31.2-21.1 9.5 0 19.8 3.9 26.1 12.7 7.2 9.7 5.7 23.8 5.7 36.2l-0.1 54.6c0 2.6-2.2 4.6-4.8 4.6h-24.8c-2.5-0.2-4.4-2.2-4.4-4.6V56.1c0-4.9 0.4-17-0.6-21.5-1.7-7.6-6.8-9.7-13.3-9.7-5.5 0-11.2 3.7-13.6 9.5-2.3 5.9-2.1 15.6-2.1 21.7v49.6c0 2.6-2.2 4.6-4.8 4.6h-24.8c-2.5-0.2-4.5-2.2-4.5-4.6l-0.1-49.6c0-12.9 2.1-31.9-14-31.9-16.2 0-15.6 18.5-15.6 31.9v49.6c0 2.6-2.2 4.6-4.8 4.6z" />
      <path d="M473.2 1.2c36.9 0 56.9 31.7 56.9 72 0 38.9-22.1 69.9-56.9 69.9-36.2 0-55.9-31.7-55.9-71.2 0-39.6 19.9-70.7 55.9-70.7zm0.2 26.1c-18.3 0-19.5 25-19.5 40.5 0 15.6-0.2 48.9 19.2 48.9 19.2 0 20.1-26.9 20.1-43.3 0-10.8-0.5-23.7-3.7-34.1-2.8-9.1-8.4-12-16.1-12z" />
      <path d="M567.9 105.3h-24.7c-2.5-0.2-4.4-2.2-4.4-4.6l-0.1-93.5c0.3-2.3 2.3-4.1 4.8-4.1h23c2.2 0.1 4 1.6 4.5 3.6v14.3h0.5c7-13.5 16.8-19.8 31.7-19.8 10.2 0 20.1 3.7 26.5 13.7 5.9 9.3 5.9 24.8 5.9 36.2v50.2c-0.4 2.2-2.4 3.9-4.8 3.9h-25c-2.2-0.2-4-2-4.3-4V54.4c0-12.7 1.5-31.2-14.2-31.2-5.5 0-10.6 3.7-13.1 9.3-3.2 7.1-3.6 14.1-3.6 21.9v50.3c-0.1 2.6-2.2 4.6-4.8 4.6h0.1z" />
      <path d="M310.6 60.1c0 8.8 0.2 16.1-4.2 23.9-3.6 6.3-9.3 10.2-15.6 10.2-8.7 0-13.8-6.6-13.8-16.4 0-19.3 17.3-22.8 33.5-22.8v5.1h0.1zm22.7 54.9c-1.5 1.3-3.6 1.4-5.3 0.5-7.4-6.2-8.8-9-12.9-14.9-12.3 12.5-21 16.3-37 16.3-18.9 0-33.6-11.7-33.6-35 0-18.2 9.9-30.6 24-36.7 12.2-5.4 29.2-6.3 42.2-7.8v-2.9c0-5.3 0.4-11.6-2.7-16.2-2.7-4.1-8-5.8-12.6-5.8-8.6 0-16.2 4.4-18.1 13.5-0.4 2-1.8 4-3.8 4.1l-23.5-2.5c-1.8-0.4-3.8-1.8-3.3-4.5C252 8.3 274.3 0 294.2 0c10.2 0 23.5 2.7 31.5 10.4 10.2 9.5 9.2 22.2 9.2 36v32.6c0 9.8 4.1 14.1 7.9 19.4 1.3 1.9 1.6 4.2-0.1 5.6l-9.4 8.1v-0.1z" />
      <path d="M56.6 60.1c0 8.8 0.2 16.1-4.2 23.9-3.6 6.3-9.2 10.2-15.6 10.2-8.7 0-13.7-6.6-13.7-16.4 0-19.3 17.3-22.8 33.5-22.8v5.1zm22.7 54.9c-1.5 1.3-3.6 1.4-5.3 0.5-7.4-6.2-8.8-9-12.8-14.9-12.3 12.5-21 16.3-37 16.3C5.3 116.9-9.4 105.2-9.4 81.9c0-18.2 9.9-30.6 24-36.7 12.2-5.4 29.2-6.3 42.2-7.8v-2.9c0-5.3 0.4-11.6-2.7-16.2-2.7-4.1-8-5.8-12.6-5.8-8.6 0-16.2 4.4-18.1 13.5-0.4 2-1.8 4-3.8 4.1L-4 27.6c-1.8-0.4-3.7-1.8-3.2-4.5C-2.3 8.3 20 0 39.8 0 50 0 63.3 2.7 71.3 10.4c10.2 9.5 9.2 22.2 9.2 36v32.6c0 9.8 4.1 14.1 7.9 19.4 1.3 1.9 1.6 4.2-0.1 5.6l-9 8.1v-0.1z" />
    </svg>
  )
}

function FlipkartLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 244 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.4 0H7.1C3.2 0 0 3.2 0 7.1v45.8C0 56.8 3.2 60 7.1 60h20.3V0z" fill="#2874F0" />
      <path d="M27.4 0h20.3C51.6 0 54.8 3.2 54.8 7.1V18H27.4V0z" fill="#FFE500" />
      <text x="65" y="42" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="38" fill="currentColor">Flipkart</text>
    </svg>
  )
}

export default function MarketplaceButtons({ links, productName }: MarketplaceButtonsProps) {
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null)

  const amazonLinks = links.filter((l) => l.platform === 'amazon')
  const flipkartLinks = links.filter((l) => l.platform === 'flipkart')
  const hasVariants = amazonLinks.length > 1 || flipkartLinks.length > 1

  const handleClick = (url: string, platform: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-soul-white/50 uppercase tracking-[0.15em]">Also Available On</p>

      {/* Amazon Button(s) */}
      {amazonLinks.length > 0 && (
        <div className="space-y-2">
          {amazonLinks.length === 1 ? (
            <motion.button
              onClick={() => handleClick(amazonLinks[0].url, 'amazon')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full group relative overflow-hidden rounded-xl border border-[#FF9900]/30 bg-gradient-to-r from-[#232F3E] to-[#131921] transition-all duration-300 hover:border-[#FF9900]/60 hover:shadow-[0_0_25px_rgba(255,153,0,0.15)]"
            >
              <div className="relative z-10 flex items-center justify-center gap-3 px-6 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Buy on</span>
                  <svg className="h-5" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="22" fill="#FF9900">amazon.in</text>
                  </svg>
                </div>
                <motion.svg
                  className="w-4 h-4 text-[#FF9900]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF9900]/0 via-[#FF9900]/5 to-[#FF9900]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#FF9900] to-[#FEBD69]"
                initial={{ width: '0%' }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          ) : (
            <div>
              <motion.button
                onClick={() => setExpandedPlatform(expandedPlatform === 'amazon' ? null : 'amazon')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group relative overflow-hidden rounded-xl border border-[#FF9900]/30 bg-gradient-to-r from-[#232F3E] to-[#131921] transition-all duration-300 hover:border-[#FF9900]/60 hover:shadow-[0_0_25px_rgba(255,153,0,0.15)]"
              >
                <div className="relative z-10 flex items-center justify-between px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Buy on</span>
                    <svg className="h-5" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="22" fill="#FF9900">amazon.in</text>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#FF9900]/70 font-medium">{amazonLinks.length} sizes</span>
                    <motion.svg
                      animate={{ rotate: expandedPlatform === 'amazon' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4 text-[#FF9900]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF9900]/0 via-[#FF9900]/5 to-[#FF9900]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>

              <AnimatePresence>
                {expandedPlatform === 'amazon' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {amazonLinks.map((link, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleClick(link.url, 'amazon')}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-2.5 bg-[#232F3E] border border-[#FF9900]/20 rounded-lg hover:border-[#FF9900]/50 hover:shadow-[0_0_15px_rgba(255,153,0,0.1)] transition-all duration-300 group"
                        >
                          <span className="text-xs font-bold text-white group-hover:text-[#FF9900] transition-colors">
                            {link.label || `Option ${idx + 1}`}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Flipkart Button(s) */}
      {flipkartLinks.length > 0 && (
        <div className="space-y-2">
          {flipkartLinks.length === 1 ? (
            <motion.button
              onClick={() => handleClick(flipkartLinks[0].url, 'flipkart')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full group relative overflow-hidden rounded-xl border border-[#2874F0]/30 bg-gradient-to-r from-[#2874F0]/10 to-[#172B4D] transition-all duration-300 hover:border-[#2874F0]/60 hover:shadow-[0_0_25px_rgba(40,116,240,0.15)]"
            >
              <div className="relative z-10 flex items-center justify-center gap-3 px-6 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Buy on</span>
                  <svg className="h-5" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="22" fill="#2874F0">Flipkart</text>
                  </svg>
                </div>
                <motion.svg
                  className="w-4 h-4 text-[#2874F0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2874F0]/0 via-[#2874F0]/5 to-[#2874F0]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#2874F0] to-[#6DB3F2]"
                initial={{ width: '0%' }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setExpandedPlatform(expandedPlatform === 'flipkart' ? null : 'flipkart')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full group relative overflow-hidden rounded-xl border border-[#2874F0]/30 bg-gradient-to-r from-[#2874F0]/10 to-[#172B4D] transition-all duration-300 hover:border-[#2874F0]/60 hover:shadow-[0_0_25px_rgba(40,116,240,0.15)]"
            >
              <div className="relative z-10 flex items-center justify-between px-6 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Buy on</span>
                  <svg className="h-5" viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="22" fill="#2874F0">Flipkart</text>
                  </svg>
                </div>
                <span className="text-xs text-[#2874F0]/70 font-medium">{flipkartLinks.length} options</span>
              </div>
            </motion.button>
          )}
        </div>
      )}
    </div>
  )
}
