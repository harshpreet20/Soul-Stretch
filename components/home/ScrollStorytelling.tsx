'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

function StrengthVector() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full opacity-15"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dumbbell */}
        <g>
          {/* Left weight plates */}
          <rect x="140" y="230" width="40" height="140" rx="6" fill="#ff7a18" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="190" y="250" width="30" height="100" rx="4" fill="#ff7a18" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.4;0.7" dur="3s" begin="0.2s" repeatCount="indefinite" />
          </rect>

          {/* Bar */}
          <rect x="220" y="285" width="360" height="30" rx="15" fill="#ff7a18" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.3;0.5" dur="3s" begin="0.4s" repeatCount="indefinite" />
          </rect>

          {/* Right weight plates */}
          <rect x="580" y="250" width="30" height="100" rx="4" fill="#ff7a18" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.4;0.7" dur="3s" begin="0.2s" repeatCount="indefinite" />
          </rect>
          <rect x="620" y="230" width="40" height="140" rx="6" fill="#ff7a18" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* Fist / grip outline */}
        <g opacity="0.2">
          <circle cx="400" cy="300" r="120" fill="none" stroke="#ff7a18" strokeWidth="2" strokeDasharray="8 4">
            <animate attributeName="r" values="120;130;120" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.4;1" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="300" r="160" fill="none" stroke="#ff7a18" strokeWidth="1" strokeDasharray="4 8">
            <animate attributeName="r" values="160;175;160" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Lightning bolt accent */}
        <g opacity="0.3">
          <path d="M380 180 L400 260 L420 260 L390 360 L430 260 L410 260 L430 180 Z" fill="#ff7a18">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Radiating lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1={400 + Math.cos((angle * Math.PI) / 180) * 200}
            y1={300 + Math.sin((angle * Math.PI) / 180) * 200}
            x2={400 + Math.cos((angle * Math.PI) / 180) * 250}
            y2={300 + Math.sin((angle * Math.PI) / 180) * 250}
            stroke="#ff7a18"
            strokeWidth="2"
            opacity="0.15"
            strokeLinecap="round"
          >
            <animate attributeName="opacity" values="0.15;0.4;0.15" dur="3s" begin={`${angle / 360}s`} repeatCount="indefinite" />
          </line>
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-soul-black via-soul-black/60 to-soul-black/40" />
    </div>
  )
}

const sections = [
  {
    id: 'recover',
    title: 'RECOVER FASTER',
    subtitle: 'Muscle recovery unlocks performance.',
    description: 'Your muscles don\'t grow during the workout. They grow after it.',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80',
    color: '#ff7a18',
    useVector: false,
  },
  {
    id: 'move',
    title: 'MOVE BETTER',
    subtitle: 'Mobility powers every movement.',
    description: 'Flexibility is strength that bends without breaking.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    color: '#ff7a18',
    useVector: false,
  },
  {
    id: 'build',
    title: 'BUILD STRENGTH',
    subtitle: 'Grip strength fuels every lift.',
    description: 'Grip is everything. Everything starts with grip.',
    image: '',
    color: '#ff7a18',
    useVector: true,
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
          className="relative min-h-[80vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* Background */}
          {section.useVector ? (
            <StrengthVector />
          ) : (
            <div className="absolute inset-0 z-0">
              <Image
                src={section.image}
                alt={section.title}
                fill
                sizes="100vw"
                className="object-cover opacity-20"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-soul-black via-soul-black/50 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h2
                  data-title
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
                  style={{ color: section.color }}
                >
                  {section.title}
                </h2>
                <p
                  data-subtitle
                  className="text-xl sm:text-2xl md:text-3xl text-soul-white font-light max-w-2xl"
                >
                  {section.subtitle}
                </p>
              </div>
              <p className="text-base sm:text-lg text-soul-gray max-w-xl leading-relaxed italic">
                {section.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
