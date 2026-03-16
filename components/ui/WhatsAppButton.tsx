'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I'm interested in Soul Stretch products`

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-[60] group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.55 2.152-5.831 6.003-5.831 10.252 0 1.052.148 2.102.44 3.104l.6 2.256-2.404.6c-1.084.271-2.007.887-2.727 1.78-.52.639-.89 1.375-1.077 2.153H0c0-4.97 2.02-9.317 5.303-12.557C8.104 2.529 12.361.996 16.807.996c4.443 0 8.696 1.533 11.976 4.322 3.28 2.788 5.301 6.531 5.301 10.456 0 4.926-2.021 9.674-5.302 12.457-3.281 2.783-7.535 4.313-11.976 4.313-1.052 0-2.102-.148-3.104-.44l-2.256-.6.6 2.404c.271 1.084.887 2.007 1.78 2.727.639.52 1.375.89 2.153 1.077v2.151c-4.97 0-9.317-2.02-12.557-5.303C2.529 39.896.996 35.639.996 31.193c0-4.443 1.533-8.696 4.322-11.976z"/>
        </svg>
      </motion.a>

      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-full right-0 mb-3 bg-soul-card border border-soul-orange border-opacity-30 rounded-lg px-3 py-2 whitespace-nowrap text-sm"
        >
          Chat with us
        </motion.div>
      )}
    </motion.div>
  )
}
