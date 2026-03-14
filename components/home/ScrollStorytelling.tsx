'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const sections = [
  {
    id: 'recover',
    title: 'RECOVER FASTER',
    subtitle: 'Muscle recovery unlocks performance.',
    description: 'Your muscles don\'t grow during the workout. They grow after it.',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80',
    color: '#ff7a18',
  },
  {
    id: 'move',
    title: 'MOVE BETTER',
    subtitle: 'Mobility powers every movement.',
    description: 'Flexibility is strength that bends without breaking.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    color: '#ff7a18',
  },
  {
    id: 'build',
    title: 'BUILD STRENGTH',
    subtitle: 'Grip strength fuels every lift.',
    description: 'Grip is everything. Everything starts with grip.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    color: '#ff7a18',
  },
]

export default function ScrollStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const sectionEl = document.getElementById(`section-${section.id}`)
        const titleEl = sectionEl?.querySelector('[data-title]')
        const subtitleEl = sectionEl?.querySelector('[data-subtitle]')

        if (!sectionEl || !titleEl) return

        gsap.fromTo(
          titleEl,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 60%',
              end: 'top 30%',
              scrub: 0.5,
              markers: false,
            },
          }
        )

        if (subtitleEl) {
          gsap.fromTo(
            subtitleEl,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              delay: 0.3,
              scrollTrigger: {
                trigger: sectionEl,
                start: 'top 60%',
                end: 'top 30%',
                scrub: 0.5,
              },
            }
          )
        }
      })
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {sections.map((section) => (
        <section
          key={section.id}
          id={`section-${section.id}`}
          className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={section.image}
              alt={section.title}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-soul-black via-soul-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2
                  data-title
                  className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none"
                  style={{ color: section.color }}
                >
                  {section.title}
                </h2>
                <p
                  data-subtitle
                  className="text-2xl sm:text-3xl text-soul-white font-light max-w-2xl"
                >
                  {section.subtitle}
                </p>
              </div>
              <p className="text-lg text-soul-gray max-w-xl leading-relaxed italic">
                {section.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
