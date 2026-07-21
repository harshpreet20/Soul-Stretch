import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-soul-black via-soul-black to-soul-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-0 w-96 h-96 bg-soul-orange rounded-full filter blur-3xl opacity-10" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-soul-orange rounded-full filter blur-3xl opacity-5" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <div className="mb-8 space-y-2">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            Train Better.
          </h1>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            Recover Faster.
          </h1>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-soul-orange">
            Stretch Further.
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-soul-gray mb-10 max-w-2xl mx-auto leading-relaxed">
          Premium recovery and mobility accessories engineered for athletes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/products">
            <button className="px-8 py-4 bg-soul-orange text-soul-black font-bold rounded-lg hover:bg-orange-600 transition-colors">
              Explore Products
            </button>
          </Link>
          <Link href="/guides">
            <button className="px-8 py-4 border-2 border-soul-orange text-soul-orange font-bold rounded-lg hover:bg-soul-orange hover:text-soul-black transition-colors">
              Read Guides
            </button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <svg className="w-6 h-6 text-soul-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
