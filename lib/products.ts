export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: string
  imageUrl: string
  images: string[]
  benefits: string[]
  features: string[]
  tagline: string
}

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/10R0JbenWYvmOE-VH3shvcSpn_IaobaLmU7z3DQqpzB8/export?format=csv'

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Foam Roller',
    slug: 'foam-roller',
    tagline: 'Deep tissue relief, engineered for recovery.',
    shortDescription: 'Premium muscle recovery roller by Soul Stretch. Buy foam roller online in India for deep tissue relief.',
    description: 'The Soul Stretch Foam Roller is the go-to muscle recovery roller for Indian athletes seeking deep tissue relief. Engineered to target muscle knots and lactic acid buildup, this high-density EVA foam roller maintains shape under pressure, delivering consistent myofascial release. Buy foam roller online in India from Soul Stretch and recover faster after every session.',
    category: 'recovery',
    imageUrl: '/images/products/foam-roller.jpg',
    images: [],
    benefits: ['Breaks down muscle knots and adhesions', 'Accelerates post-workout recovery', 'Improves blood circulation and oxygen delivery'],
    features: ['High-density EVA foam', '33cm x 14cm standard size', 'Supports up to 120kg', 'Grid texture for targeted relief']
  },
  {
    id: '2',
    name: 'Foot Insoles',
    slug: 'foot-insoles',
    tagline: 'Every step, engineered for performance.',
    shortDescription: 'Premium arch support insoles by Soul Stretch. Buy foot insoles online in India for all-day athletic comfort.',
    description: 'Soul Stretch Foot Insoles deliver biomechanical arch support that reduces plantar fatigue, corrects overpronation, and keeps Indian athletes performing at full intensity. Trusted by fitness enthusiasts across India, these premium insoles ensure your feet are ready from morning runs to heavy squats.',
    category: 'support',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    images: [],
    benefits: ['Reduces plantar fascia strain', 'Corrects foot alignment', 'Absorbs impact on hard surfaces'],
    features: ['Memory foam heel cup', 'Breathable top layer', 'Fits sizes 6-12', 'Anti-odor treatment']
  },
  {
    id: '3',
    name: 'Hand Gripper',
    slug: 'hand-gripper',
    tagline: 'Crush your limits. Build iron grip.',
    shortDescription: 'Premium hand gripper India by Soul Stretch. Ergonomic grip strength trainer for daily training.',
    description: 'The Soul Stretch Hand Gripper is India\'s top-rated grip strength trainer, built for athletes who demand reliable hand gripper performance. Durable steel spring with ergonomic foam handles delivers consistent resistance for serious strength development. Buy hand gripper online in India from Soul Stretch for fitness, rehabilitation, and stress relief.',
    category: 'strength',
    imageUrl: '/images/products/hand-gripper.jpeg',
    images: [
      '/images/products/hand-gripper-with-box.jpeg',
      '/images/products/hand-gripper-in-use.jpeg',
      '/images/products/hand-gripper-packaging.jpeg',
    ],
    benefits: ['Builds forearm and grip strength', 'Supports recovery and rehabilitation', 'Portable training anywhere'],
    features: ['Durable steel spring', 'Ergonomic foam handles', 'Compact carry size', 'Non-slip grip surface']
  },
  {
    id: '4',
    name: 'Adjustable Hand Gripper',
    slug: 'adjustable-hand-gripper',
    tagline: 'Progressive resistance. Progressive results.',
    shortDescription: 'Adjustable hand gripper with digital counter. Buy grip strength trainer online in India from Soul Stretch.',
    description: 'Train smarter with the Soul Stretch Adjustable Hand Gripper, a premium grip strength trainer available online in India. Dial in resistance from 5 to 60kg and track every rep with the built-in digital counter. Trusted by Indian athletes for progressive overload, this adjustable hand gripper suits beginners and advanced athletes alike.',
    category: 'strength',
    imageUrl: '/images/products/adjustable-hand-gripper.jpeg',
    images: [
      '/images/products/adjustable-hand-gripper-with-box.jpeg',
      '/images/products/adjustable-hand-gripper-box.jpeg',
      '/images/products/adjustable-hand-gripper-packaging.jpeg',
    ],
    benefits: ['Progressive overload built-in', 'Digital rep counter for tracking', 'Suitable for all fitness levels'],
    features: ['5-60kg adjustable dial', 'Built-in digital counter', 'Anti-slip grip surface', 'Resistance indicator window']
  },
  {
    id: '5',
    name: 'Wrist Exerciser',
    slug: 'wrist-exerciser',
    tagline: 'Unlock wrist mobility. Unlock performance.',
    shortDescription: 'Premium wrist exerciser by Soul Stretch. Buy wrist trainer online in India for mobility and strength.',
    description: 'The Soul Stretch Wrist Exerciser targets the often-neglected forearm rotator muscles, improving wrist stability and reducing injury risk for Indian athletes. This premium wrist trainer unlocks the mobility needed for heavy pressing and pulling movements. Buy wrist exerciser online in India from Soul Stretch.',
    category: 'strength',
    imageUrl: '/images/products/wrist-exerciser.webp',
    images: [],
    benefits: ['Improves wrist flexibility and range of motion', 'Strengthens wrist stabilizers', 'Reduces wrist injury risk'],
    features: ['360° rotation mechanism', 'Non-slip rubber grip', 'Compact travel design', 'Adjustable tension']
  },
  {
    id: '6',
    name: 'Protein Shaker - Orange Edition',
    slug: 'protein-shaker-orange',
    tagline: 'Fuel your recovery. On the go.',
    shortDescription: 'Premium protein shaker online India. Soul Stretch 700ml BPA-free gym shaker bottle with leak-proof design.',
    description: 'The Soul Stretch Protein Shaker in signature Orange is the ultimate gym shaker bottle for Indian athletes. This 700ml BPA-free vessel features a stainless mixing ball for lump-free blends and a secure leak-proof lid. Buy protein shaker online in India from Soul Stretch and fuel your recovery on the go.',
    category: 'accessories',
    imageUrl: '/images/products/protein-shaker-orange.jpeg',
    images: [
      '/images/products/protein-shaker.jpeg',
    ],
    benefits: ['Smooth lump-free protein blends', 'Leak-proof at any angle', 'Easy to clean'],
    features: ['700ml BPA-free Tritan', 'Stainless mixing ball', 'Screw-lock lid', 'Measurement markings']
  },
  {
    id: '7',
    name: 'Protein Shaker - Blue Edition',
    slug: 'protein-shaker-blue',
    tagline: 'Move Better. Feel Stronger.',
    shortDescription: 'Compact gym shaker bottle by Soul Stretch. Buy protein shaker online in India with BPA-free construction.',
    description: 'The Soul Stretch Blue Edition Protein Shaker is a compact gym shaker bottle perfect for Indian athletes on the go. BPA-free construction with a secure flip-top lid ensures your shakes stay contained. Buy protein shaker online in India from Soul Stretch for reliable, vibrant nutrition support.',
    category: 'accessories',
    imageUrl: '/images/products/protein-shaker-blue.jpeg',
    images: [
      '/images/products/protein-shaker-blue-alt.jpeg',
    ],
    benefits: ['Compact size for gym bags', 'Leak-proof flip-top lid', 'Easy to clean'],
    features: ['BPA-free construction', 'Flip-top secure lid', 'Translucent body for fill level', 'Soul Stretch branded']
  },
  {
    id: '8',
    name: 'Protein Shaker - Stealth Black',
    slug: 'protein-shaker-black',
    tagline: 'Move Better. Feel Stronger.',
    shortDescription: 'Stealth black gym shaker bottle by Soul Stretch. Buy protein shaker online in India with sleek design.',
    description: 'The Soul Stretch Stealth Black Protein Shaker is a premium gym shaker bottle that combines a clean all-black aesthetic with reliable performance. Compact enough for any gym bag, this protein shaker is a favourite among Indian athletes who prefer understated style. Buy online in India from Soul Stretch.',
    category: 'accessories',
    imageUrl: '/images/products/protein-shaker-black-small.jpeg',
    images: [
      '/images/products/protein-shaker-black-large.jpeg',
      '/images/products/protein-shaker-black-large-alt.jpeg',
    ],
    benefits: ['Sleek stealth design', 'Leak-proof at any angle', 'Easy to clean'],
    features: ['BPA-free construction', 'All-black design', 'Screw-lock lid', 'Measurement markings']
  },
  {
    id: '9',
    name: 'Double Toning Tube',
    slug: 'double-toning-tube',
    tagline: 'Build Strength. Tone Muscles. Stay Active.',
    shortDescription: 'Premium toning tube by Soul Stretch. Buy resistance tube online in India for full-body strength training.',
    description: 'The Soul Stretch Double Toning Tube is a premium resistance tube trusted by Indian athletes for compound strength training. It creates bilateral resistance that activates multiple muscle groups simultaneously, delivering efficient full-body conditioning and lean muscle development. Buy toning tube online in India from Soul Stretch.',
    category: 'strength',
    imageUrl: '/images/products/double-toning-tube.jpeg',
    images: [
      '/images/products/double-toning-tube-box.jpeg',
    ],
    benefits: ['Activates multiple muscle groups', 'Improves bilateral strength balance', 'Portable full-body workout'],
    features: ['Dual tube resistance', 'Padded handles', 'Non-slip foot strap', 'Foldable for storage']
  },
  {
    id: '10',
    name: 'Wrist Support',
    slug: 'wrist-support',
    tagline: 'Protect what powers your performance.',
    shortDescription: 'Premium wrist support wraps by Soul Stretch. Buy wrist wraps online in India for gym protection.',
    description: 'The Soul Stretch Wrist Support wraps your wrists in firm neoprene compression, stabilizing the joint during heavy lifts, overhead pressing, and wrist-intensive sports. Trusted by Indian athletes for reliable wrist protection, this premium wrist wrap lets you train harder and stay protected. Buy wrist support online in India from Soul Stretch.',
    category: 'support',
    imageUrl: '/images/products/wrist-support.jpeg',
    images: [],
    benefits: ['Prevents hyperextension during heavy lifts', 'Reduces wrist inflammation', 'Improves lifting confidence'],
    features: ['Neoprene compression material', 'Adjustable velcro closure', 'Thumb loop for secure fit', 'One size fits most']
  },
  {
    id: '11',
    name: 'Resistance Band Set',
    slug: 'resistance-band-set',
    tagline: 'Five bands. Infinite possibilities.',
    shortDescription: 'Premium resistance bands India by Soul Stretch. Buy 5-band progressive resistance set online in India.',
    description: 'The Soul Stretch Resistance Band Set is a complete strength and mobility training system for Indian athletes. Five color-coded resistance bands spanning 5 to 50lbs let you progressively overload any movement pattern. Buy resistance bands online in India from Soul Stretch and train at home, at the gym, or on the road.',
    category: 'recovery',
    imageUrl: '/images/products/resistance-band.jpg',
    images: [],
    benefits: ['Progressive overload for every fitness level', 'Full-body training capability', 'Joint-friendly resistance'],
    features: ['5 resistance levels: 5/10/20/35/50lbs', 'Natural latex construction', 'Includes carry bag + door anchor', '150cm length per band']
  },
  {
    id: '12',
    name: 'Gym Gloves',
    slug: 'gym-gloves',
    tagline: 'Grip. Protect. Dominate.',
    shortDescription: 'Premium gym gloves by Soul Stretch. Buy gym gloves online in India with anti-slip silicone palm grip.',
    description: 'Soul Stretch Gym Gloves are premium fitness gloves designed for Indian athletes, combining anti-slip silicone palm grips with breathable mesh backing and a wraparound wrist strap. Maximum grip security, zero calluses, full range of motion. Buy gym gloves online in India from Soul Stretch.',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=600&q=80',
    images: [],
    benefits: ['Eliminates grip fatigue during long sets', 'Prevents callus formation', 'Wrist support integrated'],
    features: ['Silicone anti-slip palm', 'Breathable mesh dorsal', 'Adjustable wrist wrap', 'Sizes S/M/L/XL']
  },
  {
    id: '13',
    name: 'Skipping Rope',
    slug: 'skipping-rope',
    tagline: 'Speed. Endurance. No excuses.',
    shortDescription: 'Premium skipping rope by Soul Stretch. Buy speed jump rope online in India with ball-bearing handles.',
    description: 'The Soul Stretch Skipping Rope is a premium speed jump rope built for Indian athletes who take cardio seriously. Precision ball-bearing handles deliver zero-tangle high-speed rotation, while the durable 3m adjustable cable and contoured foam grips ensure sustained sessions without hand fatigue. Buy skipping rope online in India from Soul Stretch.',
    category: 'cardio',
    imageUrl: '/images/products/skipping-rope.jpg',
    images: [],
    benefits: ['Burns 10-16 calories per minute', 'Improves coordination and footwork', 'Compact cardio anywhere'],
    features: ['Ball-bearing swivel handles', '3m adjustable cable', 'Foam cushion grips', 'PVC-coated steel cable']
  }
]

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(SHEET_CSV_URL, { next: { revalidate: 3600 } })
    if (!response.ok) throw new Error('Sheet fetch failed')
    // CSV is fetched; in production, parse and map rows to Product type.
    // For now, returns the static dataset while the sheet populates.
    await response.text()
    return FALLBACK_PRODUCTS
  } catch {
    return FALLBACK_PRODUCTS
  }
}

export function getProductBySlug(slug: string): Product | undefined {
  return FALLBACK_PRODUCTS.find(p => p.slug === slug)
}

export function getAllProductSlugs(): string[] {
  return FALLBACK_PRODUCTS.map(p => p.slug)
}
