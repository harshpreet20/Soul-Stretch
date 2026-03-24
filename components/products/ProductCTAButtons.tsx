'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { sendToN8N } from '@/lib/n8n'

interface ProductCTAButtonsProps {
  productName: string
  productSlug: string
}

export default function ProductCTAButtons({ productName, productSlug }: ProductCTAButtonsProps) {
  const whatsappNumber = '919217103413'

  const handleWhatsAppClick = () => {
    sendToN8N({
      source: 'product_inquiry',
      product: productName,
      message: `WhatsApp inquiry for ${productName}`,
      timestamp: new Date().toISOString(),
      page: `/products/${productSlug}`,
    })

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in ${productName}`)}`,
      '_blank'
    )
  }

  return (
    <div className="space-y-3 pt-6 sm:pt-8">
      {/* Primary CTA */}
      <motion.button
        onClick={handleWhatsAppClick}
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,122,24,0.3)' }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-8 py-4 bg-gradient-to-r from-soul-orange to-amber-500 text-soul-black font-bold rounded-xl transition-all text-base sm:text-lg touch-manipulation relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
          Order on WhatsApp
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-soul-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>

      {/* Secondary CTA */}
      <Link href={`/contact?type=athlete&product=${encodeURIComponent(productName)}`}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-3.5 bg-white/[0.03] border border-soul-orange/30 text-soul-orange font-bold rounded-xl hover:bg-soul-orange/10 transition-all text-base sm:text-lg touch-manipulation mt-3"
        >
          Request a Quote
        </motion.button>
      </Link>
    </div>
  )
}
