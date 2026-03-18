'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AudienceSegment, DEFAULT_SEGMENT, getSegmentConfig, SegmentConfig } from '@/lib/segments'

interface SegmentContextType {
  segment: AudienceSegment
  config: SegmentConfig
  setSegment: (segment: AudienceSegment) => void
}

const SegmentContext = createContext<SegmentContextType>({
  segment: DEFAULT_SEGMENT,
  config: getSegmentConfig(DEFAULT_SEGMENT),
  setSegment: () => {},
})

export function useSegment() {
  return useContext(SegmentContext)
}

export default function SegmentProvider({ children }: { children: ReactNode }) {
  const [segment, setSegmentState] = useState<AudienceSegment>(DEFAULT_SEGMENT)

  useEffect(() => {
    const stored = localStorage.getItem('soul-stretch-segment') as AudienceSegment | null
    if (stored && ['athlete', 'gym-owner', 'beginner', 'rehab', 'distributor'].includes(stored)) {
      setSegmentState(stored)
    }
  }, [])

  const setSegment = (newSegment: AudienceSegment) => {
    setSegmentState(newSegment)
    localStorage.setItem('soul-stretch-segment', newSegment)
  }

  const config = getSegmentConfig(segment)

  return (
    <SegmentContext.Provider value={{ segment, config, setSegment }}>
      {children}
    </SegmentContext.Provider>
  )
}
