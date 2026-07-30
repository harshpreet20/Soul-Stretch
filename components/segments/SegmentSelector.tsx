'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useSegment } from './SegmentProvider'
import { SEGMENT_CONFIGS, AudienceSegment } from '@/lib/segments'

const segmentOptions: { id: AudienceSegment; label: string; icon: string }[] = [
  { id: 'athlete', label: 'Athlete', icon: 'A' },
  { id: 'beginner', label: 'Beginner', icon: 'B' },
  { id: 'gym-owner', label: 'Gym Owner', icon: 'G' },
  { id: 'rehab', label: 'Rehab / Physio', icon: 'R' },
  { id: 'distributor', label: 'Distributor', icon: 'D' },
]

export default function SegmentSelector() {
  const { segment, setSegment } = useSegment()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-soul-orange/10 border border-soul-orange/30 rounded-full text-xs font-medium text-soul-orange hover:bg-soul-orange/20 transition-colors"
      >
        <span className="w-4 h-4 bg-soul-orange text-soul-black rounded-full flex items-center justify-center text-[10px] font-bold">
          {segmentOptions.find((s) => s.id === segment)?.icon}
        </span>
        <span className="hidden sm:inline">
          {segmentOptions.find((s) => s.id === segment)?.label}
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-56 bg-soul-card border border-soul-orange/20 rounded-xl shadow-2xl overflow-hidden z-50"
            >
              <div className="p-2">
                <p className="text-[10px] uppercase tracking-wider text-soul-gray px-3 py-1.5 font-semibold">
                  I'm shopping as...
                </p>
                {segmentOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSegment(option.id)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      segment === option.id
                        ? 'bg-soul-orange/20 text-soul-orange'
                        : 'text-soul-white hover:bg-soul-orange/10'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        segment === option.id
                          ? 'bg-soul-orange text-soul-black'
                          : 'bg-soul-black/50 text-soul-gray'
                      }`}
                    >
                      {option.icon}
                    </span>
                    <span className="font-medium">{option.label}</span>
                    {segment === option.id && (
                      <svg
                        className="w-4 h-4 ml-auto text-soul-orange"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
