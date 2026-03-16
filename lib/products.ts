export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: string
  imageUrl: string
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
    benefits: ['Reduces plantar fascia strain', 'Corrects foot alignment', 'Absorbs impact on hard surfaces'],
    features: ['Memory foam heel cup', 'Breathable top layer', 'Fits sizes 6-12', 'Anti-odor treatment']
  },
  {
    id: '3',
    name: 'Hand Gripper',
    slug: 'hand-gripper',
    tagline: 'Crush your limits. Build iron grip.',
    shortDescription: '60kg resistance hand gripper for elite grip training.',
    description: 'The Soul Stretch Hand Gripper is built for athletes who demand elite grip performance. Precision-engineered steel coil with ergonomic knurled handles delivers 60kg of consistent resistance for serious strength development. Every rep builds unstoppable grip.',
    category: 'strength',
    imageUrl: '/images/products/hand-gripper.jpeg',
    benefits: ['Builds forearm and grip strength', 'Improves pulling and deadlift performance', 'Portable training anywhere'],
    features: ['60kg fixed resistance', 'Hardened steel spring', 'Knurled anti-slip handles', 'Compact carry size']
  },
  {
    id: '4',
    name: 'Adjustable Hand Gripper',
    slug: 'adjustable-hand-gripper',
    tagline: 'Progressive resistance. Progressive results.',
    shortDescription: '10-60kg adjustable resistance for progressive grip training.',
    description: 'Train smarter with the Soul Stretch Adjustable Hand Gripper. Dial in your resistance from 10 to 60kg and progress with your strength. Ideal for beginners building their foundation and advanced athletes pushing their limits beyond plateaus.',
    category: 'strength',
    imageUrl: '/images/products/adjustable-hand-gripper.jpeg',
    benefits: ['Progressive overload built-in', 'Suitable for all fitness levels', 'Prevents training plateaus'],
    features: ['10-60kg adjustable dial', 'Zinc alloy body', 'Anti-slip grip surface', 'Resistance indicator window']
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
    benefits: ['Improves wrist flexibility and range of motion', 'Strengthens wrist stabilizers', 'Reduces wrist injury risk'],
    features: ['360° rotation mechanism', 'Non-slip rubber grip', 'Compact travel design', 'Adjustable tension']
  },
  {
    id: '6',
    name: 'Protein Shaker',
    slug: 'protein-shaker',
    tagline: 'Fuel your recovery. On the go.',
    shortDescription: 'BPA-free 700ml shaker with leak-proof design.',
    description: 'The Soul Stretch Protein Shaker keeps your nutrition on track with a 700ml BPA-free vessel, stainless mixing ball for lump-free blends, and a secure leak-proof lid. Take your recovery formula wherever your training takes you.',
    category: 'accessories',
    imageUrl: '/images/products/protein-shaker.jpeg',
    benefits: ['Smooth lump-free protein blends', 'Leak-proof at any angle', 'Easy to clean'],
    features: ['700ml BPA-free Tritan', 'Stainless mixing ball', 'Screw-lock lid', 'Measurement markings']
  },
  {
    id: '7',
    name: 'Double Toning Equipment',
    slug: 'double-toning-equipment',
    tagline: 'Dual resistance. Total body activation.',
    shortDescription: 'Dual resistance system for compound strength and toning.',
    description: 'The Soul Stretch Double Toning Equipment creates bilateral resistance for compound movement patterns, activating multiple muscle groups simultaneously for efficient full-body conditioning and lean muscle development.',
    category: 'strength',
    imageUrl: '/images/products/double-toning-tube.jpeg',
    benefits: ['Activates multiple muscle groups', 'Improves bilateral strength balance', 'Portable full-body workout'],
    features: ['Dual spring resistance', 'Padded handles', 'Non-slip feet', 'Foldable for storage']
  },
  {
    id: '8',
    name: 'Wrist Support',
    slug: 'wrist-support',
    tagline: 'Protect what powers your performance.',
    shortDescription: 'Neoprene compression wrist wrap for training protection.',
    description: 'The Soul Stretch Wrist Support wraps your wrists in firm neoprene compression, stabilizing the joint during heavy lifts, overhead pressing, and wrist-intensive sports. Train harder. Stay protected.',
    category: 'support',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    benefits: ['Prevents hyperextension during heavy lifts', 'Reduces wrist inflammation', 'Improves lifting confidence'],
    features: ['Neoprene compression material', 'Adjustable velcro closure', 'Thumb loop for secure fit', 'One size fits most']
  },
  {
    id: '9',
    name: 'Resistance Band Set',
    slug: 'resistance-band-set',
    tagline: 'Five bands. Infinite possibilities.',
    shortDescription: '5-band progressive resistance set from 5lbs to 50lbs.',
    description: 'The Soul Stretch Resistance Band Set delivers a complete strength and mobility training system in a compact carry bag. Five color-coded bands spanning 5 to 50lbs let you progressively overload any movement pattern. At home. At the gym. On the road.',
    category: 'recovery',
    imageUrl: 'https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=600&q=80',
    benefits: ['Progressive overload for every fitness level', 'Full-body training capability', 'Joint-friendly resistance'],
    features: ['5 resistance levels: 5/10/20/35/50lbs', 'Natural latex construction', 'Includes carry bag + door anchor', '150cm length per band']
  },
  {
    id: '10',
    name: 'Gym Gloves',
    slug: 'gym-gloves',
    tagline: 'Grip. Protect. Dominate.',
    shortDescription: 'Anti-slip silicone palm gloves with wrist strap support.',
    description: 'Soul Stretch Gym Gloves combine anti-slip silicone palm grips with breathable mesh backing and a wraparound wrist strap. Maximum grip security. Zero calluses. Full range of motion maintained.',
    category: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=600&q=80',
    benefits: ['Eliminates grip fatigue during long sets', 'Prevents callus formation', 'Wrist support integrated'],
    features: ['Silicone anti-slip palm', 'Breathable mesh dorsal', 'Adjustable wrist wrap', 'Sizes S/M/L/XL']
  },
  {
    id: '11',
    name: 'Skipping Rope',
    slug: 'skipping-rope',
    tagline: 'Speed. Endurance. No excuses.',
    shortDescription: 'Ball-bearing speed rope with 3m adjustable cable.',
    description: 'The Soul Stretch Skipping Rope features precision ball-bearing handles for zero-tangle high-speed rotation, a durable 3m adjustable cable, and contoured foam grips engineered for sustained cardio sessions without hand fatigue.',
    category: 'cardio',
    imageUrl: 'https://images.unsplash.com/photo-1598632640487-6ea4a442ca55?w=600&q=80',
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
