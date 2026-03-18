'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import { Product } from '@/lib/products'
import { useSegment } from '@/components/segments/SegmentProvider'

interface ProductGridProps {
  products: Product[]
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'strength', label: 'Strength' },
  { id: 'support', label: 'Support' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'cardio', label: 'Cardio' },
]

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { config } = useSegment()

  // Sort products based on segment priority categories
  const sortedProducts = useMemo(() => {
    const filtered =
      selectedCategory === 'all'
        ? products
        : products.filter((p) => p.category === selectedCategory)

    if (selectedCategory !== 'all') return filtered

    // Prioritize based on segment
    const prioritized = config.priorityCategories
    return [...filtered].sort((a, b) => {
      const aIdx = prioritized.indexOf(a.category)
      const bIdx = prioritized.indexOf(b.category)
      const aScore = aIdx === -1 ? 999 : aIdx
      const bScore = bIdx === -1 ? 999 : bIdx
      return aScore - bScore
    })
  }, [products, selectedCategory, config.priorityCategories])

  const handleToggle = (slug: string) => {
    setExpandedId(expandedId === slug ? null : slug)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Category Filter - horizontal scroll on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 sm:gap-3 justify-start sm:justify-center overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id)
              setExpandedId(null)
            }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-all text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-soul-orange text-soul-black'
                : 'bg-soul-card border border-soul-orange/20 text-soul-white active:bg-soul-orange/20'
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence mode="wait">
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                product={product}
                isExpanded={expandedId === product.slug}
                onToggle={handleToggle}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {sortedProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-soul-gray text-lg">No products found in this category.</p>
        </motion.div>
      )}
    </div>
  )
}
