import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Soul Stretch | Premium Fitness Recovery Brand',
  description:
    'Learn about Soul Stretch mission, values, and commitment to delivering premium recovery and performance accessories for athletes across India.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-soul-black">
      {/* Header */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-soul-orange/5 via-soul-black to-soul-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-soul-white mb-6">
            Our Story
          </h1>
          <p className="text-2xl text-soul-gray max-w-3xl mx-auto leading-relaxed">
            Elite athletes understand one truth: performance is built in recovery.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl font-black text-soul-white">Our Mission</h2>
            <div className="space-y-4 text-lg text-soul-gray leading-relaxed">
              <p>
                Soul Stretch exists to bridge the gap between elite athletic recovery and everyday athletes in India.
              </p>
              <p>
                For too long, Indian athletes have either compromised on recovery quality or paid exorbitant prices for premium equipment. We changed that.
              </p>
              <p>
                We source, engineer, and deliver premium recovery and mobility accessories—foam rollers, resistance bands, grip trainers, compression tools—at prices that make elite training accessible to every serious athlete.
              </p>
              <p>
                Your muscles grow after training. Your mind sharpens after sleep. Your performance builds after recovery. We engineer the tools that power that recovery.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
            {[
              {
                title: 'Elite Quality',
                description: 'Zero compromises. Every product is engineered to serve competitive athletes.',
                icon: '⭐',
              },
              {
                title: 'Indian Athletes First',
                description: 'Built for Indian athletes, by athletes who understand your needs.',
                icon: '🇮🇳',
              },
              {
                title: 'Relentless Innovation',
                description: 'We continuously evolve our products based on athlete feedback and sports science.',
                icon: '🚀',
              },
            ].map((value) => (
              <div key={value.title} className="bg-soul-card rounded-xl p-6 border border-soul-orange/10">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-bold text-soul-white mb-3">{value.title}</h3>
                <p className="text-soul-gray leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-gradient-to-r from-soul-orange/10 via-soul-black to-soul-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-5xl font-black text-soul-white">Our Philosophy</h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-soul-orange">Train Better</h3>
              <p className="text-lg text-soul-gray leading-relaxed">
                Better training starts with intent. Every movement should serve a purpose. Your accessories should amplify that purpose, not add noise.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-soul-orange">Recover Faster</h3>
              <p className="text-lg text-soul-gray leading-relaxed">
                Recovery is not passive rest. It's active restoration. Foam rolling, compression, mobility work—these aren't luxury. They're necessity.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-soul-orange">Stretch Further</h3>
              <p className="text-lg text-soul-gray leading-relaxed">
                Your potential isn't fixed. It stretches with every session, every recovery, every intentional movement. We're here to push that boundary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-5xl font-black text-soul-white">Why We Exist</h2>

          <div className="space-y-6 text-lg text-soul-gray leading-relaxed">
            <p>
              The fitness industry has a problem. Recovery products are either cheap and ineffective, or expensive and inaccessible.
            </p>
            <p>
              A premium foam roller costs ₹3,000-5,000 online in India. Elite grip trainers cost ₹1,500+. Resistance bands are often low-quality.
            </p>
            <p>
              Meanwhile, Indian athletes are training harder than ever. Running marathons. Competing in powerlifting. Wrestling. Climbing. Playing football, cricket, badminton at elite levels.
            </p>
            <p>
              These athletes deserve the same recovery tools as Olympians. Not someday. Now.
            </p>
            <p className="text-xl text-soul-orange font-semibold">
              Soul Stretch democratizes elite recovery.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-20 bg-soul-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { stat: '11+', label: 'Premium Products' },
              { stat: '100% India', label: 'Distribution Network' },
              { stat: '1000+', label: 'Happy Athletes' },
            ].map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="text-4xl font-black text-soul-orange">{metric.stat}</div>
                <p className="text-soul-gray">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-bold text-soul-white">
            Join the Elite Recovery Movement
          </h2>
          <p className="text-lg text-soul-gray max-w-2xl mx-auto">
            Your training demands premium recovery. Build yours with Soul Stretch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="px-8 py-4 bg-soul-orange text-soul-black font-bold rounded-lg hover:bg-orange-600 transition-colors">
                Explore Products
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 border-2 border-soul-orange text-soul-orange font-bold rounded-lg hover:bg-soul-orange hover:text-soul-black transition-colors">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
