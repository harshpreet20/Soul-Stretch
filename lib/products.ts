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
    shortDescription: 'High-density foam roller for deep tissue muscle recovery.',
    description: 'The Soul Stretch Foam Roller is engineered for deep tissue relief, targeting muscle knots and lactic acid buildup after intense training sessions. High-density EVA foam maintains shape under pressure, delivering consistent myofascial release across all major muscle groups. Used by elite athletes and trainers worldwide.',
    category: 'recovery',
    imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&q=80',
    images: [],
    benefits: ['Breaks down muscle knots and adhesions', 'Accelerates post-workout recovery', 'Improves blood circulation and oxygen delivery'],
    features: ['High-density EVA foam', '33cm x 14cm standard size', 'Supports up to 120kg', 'Grid texture for targeted relief']
  },
  {
    id: '2',
    name: 'Foot Insoles',
    slug: 'foot-insoles',
    tagline: 'Every step, engineered for performance.',
    shortDescription: 'Arch support insoles for all-day athletic performance.',
    description: 'Soul Stretch Foot Insoles deliver biomechanical arch support that reduces plantar fatigue, corrects overpronation, and keeps you performing at full intensity. From your morning run to your last squat, these insoles ensure your feet are ready for anything.',
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
    shortDescription: 'Ergonomic foam-grip hand strengthener for daily training.',
    description: 'The Soul Stretch Hand Gripper is built for athletes who demand reliable grip training. Durable steel spring with ergonomic foam handles delivers consistent resistance for serious strength development. Ideal for fitness, rehabilitation, and stress relief.',
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
    shortDescription: '5-60kg adjustable resistance with digital rep counter.',
    description: 'Train smarter with the Soul Stretch Adjustable Hand Gripper. Dial in your resistance from 5 to 60kg and track every rep with the built-in digital counter. Ideal for beginners building their foundation and advanced athletes pushing their limits beyond plateaus.',
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
    shortDescription: '360° rotation wrist trainer for mobility and strength.',
    description: 'The Soul Stretch Wrist Exerciser targets the often-neglected forearm rotator muscles, improving wrist stability, reducing injury risk, and unlocking the mobility needed for heavy pressing and pulling movements. Wrist strength powers everything.',
    category: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    images: [],
    benefits: ['Improves wrist flexibility and range of motion', 'Strengthens wrist stabilizers', 'Reduces wrist injury risk'],
    features: ['360° rotation mechanism', 'Non-slip rubber grip', 'Compact travel design', 'Adjustable tension']
  },
  {
    id: '6',
    name: 'Protein Shaker - Orange Edition',
    slug: 'protein-shaker-orange',
    tagline: 'Fuel your recovery. On the go.',
    shortDescription: 'BPA-free 700ml shaker with orange lid and leak-proof design.',
    description: 'The Soul Stretch Protein Shaker in signature Orange keeps your nutrition on track with a 700ml BPA-free vessel, stainless mixing ball for lump-free blends, and a secure leak-proof lid. Take your recovery formula wherever your training takes you.',
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
    shortDescription: 'Compact blue BPA-free shaker for on-the-go nutrition.',
    description: 'The Soul Stretch Blue Edition Protein Shaker delivers a compact, vibrant design perfect for gym bags and travel. BPA-free construction with a secure flip-top lid ensures your shakes stay contained and your nutrition stays on track.',
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
    shortDescription: 'All-black compact shaker with sleek stealth design.',
    description: 'The Soul Stretch Stealth Black Protein Shaker combines a clean all-black aesthetic with reliable performance. Compact enough for any gym bag, with a secure lid and easy-clean design for athletes who prefer understated style.',
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
    shortDescription: 'Dual resistance tube for compound strength and toning.',
    description: 'The Soul Stretch Double Toning Tube creates bilateral resistance for compound movement patterns, activating multiple muscle groups simultaneously for efficient full-body conditioning and lean muscle development.',
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
    shortDescription: 'Neoprene compression wrist wrap for training protection.',
    description: 'The Soul Stretch Wrist Support wraps your wrists in firm neoprene compression, stabilizing the joint during heavy lifts, overhead pressing, and wrist-intensive sports. Train harder. Stay protected.',
    category: 'support',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    images: [],
    benefits: ['Prevents hyperextension during heavy lifts', 'Reduces wrist inflammation', 'Improves lifting confidence'],
    features: ['Neoprene compression material', 'Adjustable velcro closure', 'Thumb loop for secure fit', 'One size fits most']
  },
  {
    id: '11',
    name: 'Resistance Band Set',
    slug: 'resistance-band-set',
    tagline: 'Five bands. Infinite possibilities.',
    shortDescription: '5-band progressive resistance set from 5lbs to 50lbs.',
    description: 'The Soul Stretch Resistance Band Set delivers a complete strength and mobility training system in a compact carry bag. Five color-coded bands spanning 5 to 50lbs let you progressively overload any movement pattern. At home. At the gym. On the road.',
    category: 'recovery',
    imageUrl: 'https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=600&q=80',
    images: [],
    benefits: ['Progressive overload for every fitness level', 'Full-body training capability', 'Joint-friendly resistance'],
    features: ['5 resistance levels: 5/10/20/35/50lbs', 'Natural latex construction', 'Includes carry bag + door anchor', '150cm length per band']
  },
  {
    id: '12',
    name: 'Gym Gloves',
    slug: 'gym-gloves',
    tagline: 'Grip. Protect. Dominate.',
    shortDescription: 'Anti-slip silicone palm gloves with wrist strap support.',
    description: 'Soul Stretch Gym Gloves combine anti-slip silicone palm grips with breathable mesh backing and a wraparound wrist strap. Maximum grip security. Zero calluses. Full range of motion maintained.',
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
    shortDescription: 'Ball-bearing speed rope with 3m adjustable cable.',
    description: 'The Soul Stretch Skipping Rope features precision ball-bearing handles for zero-tangle high-speed rotation, a durable 3m adjustable cable, and contoured foam grips engineered for sustained cardio sessions without hand fatigue.',
    category: 'cardio',
    imageUrl: 'https://images.unsplash.com/photo-1598632640487-6ea4a442ca55?w=600&q=80',
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
