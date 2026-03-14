'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import { Product } from '@/lib/products'

interface ProductGridProps {
  products: Product[]
}

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'strength', label: 'Strength' },
  { id: 'support', label: 'Support' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'cardio', label: 'Cardio' },
]

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  const handleToggle = (slug: string) => {
    setExpandedId(expandedId === slug ? null : slug)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="space-y-12">
      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id)
              setExpandedId(null)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
              selectedCategory === cat.id
                ? 'bg-soul-orange text-soul-black'
                : 'bg-soul-card border border-soul-orange/20 text-soul-white hover:border-soul-orange/50'
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredProducts.map((product) => (
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
      {filteredProducts.length === 0 && (
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
