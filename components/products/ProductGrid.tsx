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
  { id: 'all', label: 'All Products', icon: '◆' },
  { id: 'recovery', label: 'Recovery', icon: '↻' },
  { id: 'strength', label: 'Strength', icon: '◉' },
  { id: 'support', label: 'Support', icon: '◇' },
  { id: 'accessories', label: 'Accessories', icon: '▲' },
  { id: 'cardio', label: 'Cardio', icon: '♦' },
]

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { config } = useSegment()

  const sortedProducts = useMemo(() => {
    const filtered =
      selectedCategory === 'all'
        ? products
        : products.filter((p) => p.category === selectedCategory)

    if (selectedCategory !== 'all') return filtered

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

  return (
    <div className="space-y-10 sm:space-y-16">
      {/* Premium Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Filter label */}
        <p className="text-center text-xs text-soul-gray/50 uppercase tracking-[0.2em] mb-4 sm:mb-5 font-medium">
          Filter by Category
        </p>

        <div className="flex gap-2 sm:gap-3 justify-start sm:justify-center overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => {
                setSelectedCategory(cat.id)
                setExpandedId(null)
              }}
              whileTap={{ scale: 0.95 }}
              className={`group/pill relative px-4 sm:px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-soul-orange to-amber-500 text-soul-black shadow-lg shadow-soul-orange/20'
                  : 'bg-white/[0.03] border border-white/[0.08] text-soul-gray hover:border-soul-orange/30 hover:text-soul-white hover:bg-white/[0.06]'
              }`}
            >
              <span className={`text-[10px] ${selectedCategory === cat.id ? 'opacity-80' : 'opacity-40 group-hover/pill:opacity-60'}`}>
                {cat.icon}
              </span>
              {cat.label}
              {selectedCategory === cat.id && (
                <motion.span
                  layoutId="categoryCount"
                  className="ml-1 bg-soul-black/20 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                >
                  {sortedProducts.length}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Products Grid with staggered reveal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
        >
          {sortedProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <ProductCard
                product={product}
                isExpanded={expandedId === product.slug}
                onToggle={handleToggle}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No Results */}
      {sortedProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/[0.06]">
            <span className="text-2xl opacity-40">◇</span>
          </div>
          <p className="text-soul-gray/60 text-lg">No products found in this category.</p>
        </motion.div>
      )}
    </div>
  )
}
