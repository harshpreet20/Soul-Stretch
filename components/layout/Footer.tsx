'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      label: 'Product',
      links: [
        { label: 'Products', href: '/products' },
        { label: 'Guides', href: '/guides' },
        { label: 'Blog', href: '/guides' },
      ],
    },
    {
      label: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      label: 'Support',
      links: [
        { label: 'FAQ', href: '#' },
        { label: 'Returns', href: '#' },
        { label: 'Shipping', href: '#' },
      ],
    },
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-soul-black border-t border-soul-orange/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-3">
              SOUL <span className="text-soul-orange">STRETCH</span>
            </h3>
            <p className="text-sm text-soul-gray mb-4">
              Train Better. Recover Faster. Stretch Further.
            </p>
            <div className="flex items-center gap-2 text-xs text-soul-gray">
              <svg className="w-4 h-4 text-soul-orange" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.828 0 1.5-.672 1.5-1.5S14.328 6 13.5 6 12 6.672 12 7.5s.672 1.5 1.5 1.5zm-7 0c.828 0 1.5-.672 1.5-1.5S7.328 6 6.5 6 5 6.672 5 7.5 5.672 9 6.5 9zm3.5 6.75c2.34 0 4.35-1.56 5.24-3.75H4.76c.89 2.19 2.9 3.75 5.24 3.75z" />
              </svg>
              Made in India
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-sm">{section.label}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-soul-gray hover:text-soul-orange transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-soul-orange/10 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-soul-gray">
            © {currentYear} Soul Stretch. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#ff7a18' }}
                className="text-soul-gray hover:text-soul-orange transition-colors"
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I'm interested in Soul Stretch products`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="text-xs font-medium text-soul-orange hover:text-soul-white transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.55 2.152-5.831 6.003-5.831 10.252 0 1.052.148 2.102.44 3.104l.6 2.256-2.404.6c-1.084.271-2.007.887-2.727 1.78-.52.639-.89 1.375-1.077 2.153H0c0-4.97 2.02-9.317 5.303-12.557C8.104 2.529 12.361.996 16.807.996c4.443 0 8.696 1.533 11.976 4.322 3.28 2.788 5.301 6.531 5.301 10.456 0 4.926-2.021 9.674-5.302 12.457-3.281 2.783-7.535 4.313-11.976 4.313-1.052 0-2.102-.148-3.104-.44l-2.256-.6.6 2.404c.271 1.084.887 2.007 1.78 2.727.639.52 1.375.89 2.153 1.077v2.151c-4.97 0-9.317-2.02-12.557-5.303C2.529 39.896.996 35.639.996 31.193c0-4.443 1.533-8.696 4.322-11.976z" />
            </svg>
            WhatsApp
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
