'use client'

import Link from 'next/link'
import { sendToN8N } from '@/lib/n8n'

interface ProductCTAButtonsProps {
  productName: string
  productSlug: string
}

export default function ProductCTAButtons({ productName, productSlug }: ProductCTAButtonsProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'

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
    <div className="space-y-3 pt-8">
      <button
        onClick={handleWhatsAppClick}
        className="w-full px-8 py-4 bg-soul-orange text-soul-black font-bold rounded-lg hover:bg-orange-600 transition-colors text-lg"
      >
        Contact via WhatsApp
      </button>
      <Link href={`/contact?type=athlete&product=${encodeURIComponent(productName)}`}>
        <button className="w-full px-8 py-4 border-2 border-soul-orange text-soul-orange font-bold rounded-lg hover:bg-soul-orange hover:text-soul-black transition-colors text-lg">
          Send Inquiry
        </button>
      </Link>
    </div>
  )
}
