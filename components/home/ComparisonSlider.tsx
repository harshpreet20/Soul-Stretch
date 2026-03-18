'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ComparisonSlider() {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const newPosition = ((clientX - rect.left) / rect.width) * 100
    if (newPosition >= 0 && newPosition <= 100) {
      setPosition(newPosition)
    }
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    updatePosition(e.clientX)
  }

  const handleTouchStart = () => setIsDragging(true)
  const handleTouchEnd = () => setIsDragging(false)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    updatePosition(e.touches[0].clientX)
  }

  return (
    <section className="relative min-h-[70vh] sm:min-h-screen w-full py-12 sm:py-20 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soul-black via-soul-black to-soul-card opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-soul-white">
              Compare & Choose
            </h2>
            <p className="text-base sm:text-xl text-soul-gray max-w-2xl mx-auto px-2">
              Drag the slider to compare Resistance Bands with Traditional Dumbbells
            </p>
          </div>

          {/* Comparison Slider */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            className="relative w-full h-80 sm:h-96 md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden cursor-col-resize group bg-soul-card select-none touch-pan-y"
          >
            {/* Left Panel - Resistance Bands */}
            <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
              <div className="relative w-full h-full bg-gradient-to-br from-soul-orange/10 to-soul-orange/5 p-4 sm:p-8 flex flex-col justify-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-soul-orange mb-4 sm:mb-6">
                  Resistance Bands
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-soul-white">
                  {['Progressive overload built-in', 'Joint-friendly variable resistance', 'Portable and travel-friendly', 'Space-efficient storage', 'Unlimited exercise variations'].map((item) => (
                    <li key={item} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-soul-orange text-base sm:text-lg flex-shrink-0">✓</span>
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Panel - Dumbbells */}
            <div
              className="absolute top-0 right-0 h-full overflow-hidden bg-gradient-to-br from-soul-white/5 to-soul-white/10 p-4 sm:p-8 flex flex-col justify-center"
              style={{ width: `${100 - position}%` }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-soul-white mb-4 sm:mb-6">
                Dumbbells
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-soul-gray">
                {['Fixed weight increments only', 'Heavy impact on joints', 'Requires home gym space', 'Expensive full rack setup', 'Limited exercise library'].map((item) => (
                  <li key={item} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-soul-gray text-base sm:text-lg flex-shrink-0">•</span>
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider Handle */}
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-soul-orange cursor-col-resize z-20 group-hover:w-2"
              style={{ left: `${position}%` }}
              drag="x"
              dragElastic={0}
              dragConstraints={{ left: 0, right: 0 }}
              onDrag={(_, info) => {
                if (!containerRef.current) return
                const rect = containerRef.current.getBoundingClientRect()
                const newPosition = ((info.point.x - rect.left) / rect.width) * 100
                if (newPosition >= 0 && newPosition <= 100) {
                  setPosition(newPosition)
                }
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-soul-orange rounded-full flex items-center justify-center shadow-lg touch-manipulation">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-soul-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7M15 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-xs sm:text-sm text-soul-gray">
            Drag the handle left and right to compare
          </p>
        </div>
      </motion.div>
    </section>
  )
}
