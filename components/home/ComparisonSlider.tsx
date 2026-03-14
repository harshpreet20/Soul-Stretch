'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ComparisonSlider() {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100

    if (newPosition >= 0 && newPosition <= 100) {
      setPosition(newPosition)
    }
  }

  const handleTouchStart = () => {
    setIsDragging(true)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const touch = e.touches[0]
    const newPosition = ((touch.clientX - rect.left) / rect.width) * 100

    if (newPosition >= 0 && newPosition <= 100) {
      setPosition(newPosition)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="relative min-h-screen w-full py-20 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soul-black via-soul-black to-soul-card opacity-50" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-5xl sm:text-6xl font-black text-soul-white">
              Compare & Choose
            </h2>
            <p className="text-xl text-soul-gray max-w-2xl mx-auto">
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
            className="relative w-full h-96 sm:h-[500px] rounded-2xl overflow-hidden cursor-col-resize group bg-soul-card"
          >
            {/* Left Panel - Resistance Bands */}
            <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
              <div className="relative w-full h-full bg-gradient-to-br from-soul-orange/10 to-soul-orange/5 p-8 flex flex-col justify-center">
                <h3 className="text-3xl sm:text-4xl font-bold text-soul-orange mb-6">
                  Resistance Bands
                </h3>
                <ul className="space-y-3 text-soul-white">
                  <li className="flex items-start gap-3">
                    <span className="text-soul-orange text-lg">✓</span>
                    <span>Progressive overload built-in</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-soul-orange text-lg">✓</span>
                    <span>Joint-friendly variable resistance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-soul-orange text-lg">✓</span>
                    <span>Portable and travel-friendly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-soul-orange text-lg">✓</span>
                    <span>Space-efficient storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-soul-orange text-lg">✓</span>
                    <span>Unlimited exercise variations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Panel - Dumbbells */}
            <div
              className="absolute top-0 right-0 h-full overflow-hidden transition-all duration-0 bg-gradient-to-br from-soul-white/5 to-soul-white/10 p-8 flex flex-col justify-center"
              style={{ width: `${100 - position}%` }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-soul-white mb-6">
                Dumbbells
              </h3>
              <ul className="space-y-3 text-soul-gray">
                <li className="flex items-start gap-3">
                  <span className="text-soul-gray text-lg">•</span>
                  <span>Fixed weight increments only</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-soul-gray text-lg">•</span>
                  <span>Heavy impact on joints</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-soul-gray text-lg">•</span>
                  <span>Requires home gym space</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-soul-gray text-lg">•</span>
                  <span>Expensive full rack setup</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-soul-gray text-lg">•</span>
                  <span>Limited exercise library</span>
                </li>
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
                const newPosition = ((info.x) / rect.width) * 100
                if (newPosition >= 0 && newPosition <= 100) {
                  setPosition(newPosition)
                }
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-soul-orange rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-soul-black"
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
          <p className="text-center text-sm text-soul-gray">
            Drag the handle left and right to compare
          </p>
        </div>
      </motion.div>
    </section>
  )
}
