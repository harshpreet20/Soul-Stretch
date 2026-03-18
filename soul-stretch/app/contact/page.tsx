'use client'

import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { sendToN8N } from '@/lib/n8n'

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-soul-black" />}>
      <ContactPageContent />
    </Suspense>
  )
}

function ContactPageContent() {
  const searchParams = useSearchParams()
  const initialType = (searchParams.get('type') as 'athlete' | 'distributor' | 'retailer') || 'athlete'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: initialType,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const success = await sendToN8N({
        source: 'contact_form',
        name: formData.name,
        email: formData.email,
        message: formData.message,
        type: formData.type,
        timestamp: new Date().toISOString(),
        page: '/contact',
      })

      if (success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '', type: 'athlete' })
      } else {
        setSubmitStatus('error')
      }

      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      q: 'How quickly will I receive my order?',
      a: 'Soul Stretch delivery time in India is among the fastest for premium fitness equipment. We dispatch most orders within 24-48 hours from our warehouse. Standard pan-India delivery takes 3-7 business days depending on your location, with metro cities like Mumbai, Delhi, Bangalore, and Chennai typically receiving orders within 3-4 days. You will receive tracking details via email and WhatsApp once your order is shipped.',
    },
    {
      q: "What is Soul Stretch's return policy for fitness equipment?",
      a: 'Soul Stretch offers a comprehensive 30-day satisfaction guarantee on all fitness equipment and recovery accessories. If you are not completely satisfied with your purchase, you can initiate a return or exchange within 30 days of delivery. The product must be in its original packaging and unused condition. To start a return, contact our support team via WhatsApp or email, and we will arrange a hassle-free pickup at no extra cost. Refunds are processed within 5-7 business days after we receive the returned item.',
    },
    {
      q: 'Do you offer bulk discounts for gym equipment orders in India?',
      a: 'Yes, Soul Stretch provides attractive bulk pricing for gym equipment orders across India. Whether you are a gym owner, fitness studio, corporate wellness program, school, or institutional buyer, we offer volume-based discounts on orders of 10 or more units. Our bulk gym equipment packages include foam rollers, resistance bands, grip trainers, and complete recovery kits. Contact our dedicated B2B team via the form above or WhatsApp to receive a customized quote tailored to your requirements.',
    },
    {
      q: 'How does Soul Stretch ensure product quality?',
      a: 'Soul Stretch product quality is guaranteed through a rigorous multi-step quality assurance process. Every piece of fitness equipment undergoes thorough testing for durability, material integrity, and performance before it reaches our customers. We source only premium-grade materials from trusted manufacturers, including high-density EVA foam for rollers, natural latex for resistance bands, and hardened steel for grip trainers. Each product is designed to withstand intensive daily use by professional athletes and fitness enthusiasts alike, ensuring long-lasting performance.',
    },
    {
      q: 'Does Soul Stretch ship fitness equipment internationally?',
      a: 'Currently, Soul Stretch focuses on delivering premium fitness equipment across all states and union territories in India, including remote and rural areas. International shipping for fitness equipment is not available at this time, but we are actively working to expand our delivery network to select international destinations. If you are located outside India and interested in our products, please contact us through the form above or via WhatsApp, and we will notify you as soon as international shipping becomes available for your region.',
    },
  ]

  return (
    <div className="min-h-screen bg-soul-black">
      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
      {/* Header */}
      <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-soul-orange/5 via-soul-black to-soul-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-soul-white mb-3 sm:mb-4">
            Contact Soul Stretch
          </h1>
          <p className="text-base sm:text-xl text-soul-gray max-w-2xl mx-auto leading-relaxed px-2">
            Questions about our premium fitness equipment? Want to buy gym accessories online in India? Let's talk.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 lg:col-span-1"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-soul-white">Quick Contact</h3>
                <p className="text-soul-gray">
                  Need help choosing the right fitness recovery equipment? Reach out via WhatsApp for the fastest response. We typically reply within hours.
                </p>
              </div>

              <a
                href="https://wa.me/919876543210?text=Hi, I'd like to know more about Soul Stretch products"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.55 2.152-5.831 6.003-5.831 10.252 0 1.052.148 2.102.44 3.104l.6 2.256-2.404.6c-1.084.271-2.007.887-2.727 1.78-.52.639-.89 1.375-1.077 2.153H0c0-4.97 2.02-9.317 5.303-12.557C8.104 2.529 12.361.996 16.807.996c4.443 0 8.696 1.533 11.976 4.322 3.28 2.788 5.301 6.531 5.301 10.456 0 4.926-2.021 9.674-5.302 12.457-3.281 2.783-7.535 4.313-11.976 4.313-1.052 0-2.102-.148-3.104-.44l-2.256-.6.6 2.404c.271 1.084.887 2.007 1.78 2.727.639.52 1.375.89 2.153 1.077v2.151c-4.97 0-9.317-2.02-12.557-5.303C2.529 39.896.996 35.639.996 31.193c0-4.443 1.533-8.696 4.322-11.976z" />
                  </svg>
                  Chat on WhatsApp
                </motion.button>
              </a>

              {/* Contact Details */}
              <div className="space-y-4 border-t border-soul-orange/10 pt-6">
                <h4 className="font-bold text-soul-white">Other Ways to Connect</h4>
                <div className="space-y-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-soul-gray hover:text-soul-orange transition-colors"
                  >
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-soul-gray hover:text-soul-orange transition-colors"
                  >
                    <span>YouTube</span>
                  </a>
                </div>
              </div>

              {/* Distributor Section */}
              <div className="bg-soul-card rounded-xl p-6 border border-soul-orange/10 space-y-3">
                <h4 className="font-bold text-soul-orange">Distribute Premium Fitness Equipment</h4>
                <p className="text-sm text-soul-gray">
                  Interested in stocking the best gym accessories for athletes in India? Fill the form with a distributor inquiry.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-soul-card rounded-xl p-8 border border-soul-orange/10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soul-white">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-soul-black border border-soul-orange/20 rounded-lg text-soul-white placeholder-soul-gray focus:border-soul-orange focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soul-white">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-soul-black border border-soul-orange/20 rounded-lg text-soul-white placeholder-soul-gray focus:border-soul-orange focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Inquiry Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soul-white">
                    I'm inquiring as a...
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-soul-black border border-soul-orange/20 rounded-lg text-soul-white focus:border-soul-orange focus:outline-none transition-colors"
                  >
                    <option value="athlete">Individual Athlete</option>
                    <option value="gym">Gym or Studio Owner</option>
                    <option value="distributor">Distributor / Retailer</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-soul-white">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-soul-black border border-soul-orange/20 rounded-lg text-soul-white placeholder-soul-gray focus:border-soul-orange focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your fitness equipment needs..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 font-bold rounded-lg transition-all ${
                    submitStatus === 'success'
                      ? 'bg-green-500 text-white'
                      : submitStatus === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-soul-orange text-soul-black hover:bg-orange-600'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : submitStatus === 'error' ? 'Failed - Try Again' : 'Send Message'}
                </motion.button>

                {/* Info Text */}
                <p className="text-xs text-soul-gray text-center">
                  Our premium fitness equipment team will get back to you within a few hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-soul-orange/10 via-soul-black to-soul-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-black text-soul-white mb-8 sm:mb-12 text-center">
            Premium Fitness Equipment FAQs
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-soul-card rounded-lg p-6 border border-soul-orange/10"
              >
                <h4 className="font-bold text-soul-white mb-2">{faq.q}</h4>
                <p className="text-soul-gray">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
