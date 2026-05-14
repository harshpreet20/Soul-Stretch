export interface MarketplaceLink {
  platform: 'amazon' | 'flipkart'
  url: string
  label?: string
}

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
  price: number
  comparePrice?: number
  seoTitle: string
  seoKeywords: string[]
  marketplaceLinks?: MarketplaceLink[]
}

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/10R0JbenWYvmOE-VH3shvcSpn_IaobaLmU7z3DQqpzB8/export?format=csv'

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Foam Roller',
    slug: 'foam-roller',
    tagline: 'Deep tissue relief, engineered for recovery.',
    shortDescription: 'Best foam roller for muscle recovery in India. High-density EVA grid foam roller for back pain, leg soreness, and post-workout myofascial release. Free shipping.',
    description: 'The Soul Stretch Foam Roller is the best-rated muscle recovery foam roller in India, built for athletes who train hard and recover harder. High-density EVA construction with a precision grid texture targets deep knots, releases lactic acid, and restores mobility after intense sessions. Whether you need a foam roller for back pain relief, IT band release, or post-gym recovery, this roller supports up to 120kg and maintains shape through thousands of rolls. Buy foam roller online in India with free shipping from Soul Stretch.',
    category: 'recovery',
    imageUrl: '/images/products/foam-roller.jpg',
    images: [],
    price: 899,
    comparePrice: 1499,
    seoTitle: 'Buy Foam Roller Online India | Best Foam Roller for Back Pain & Recovery',
    seoKeywords: ['foam roller', 'foam roller India', 'buy foam roller online India', 'best foam roller for back pain', 'muscle recovery foam roller', 'foam roller for legs', 'EVA foam roller', 'grid foam roller India', 'foam roller price India', 'myofascial release roller', 'gym foam roller', 'foam roller for home workout'],
    benefits: ['Breaks down muscle knots and adhesions', 'Accelerates post-workout recovery', 'Improves blood circulation and oxygen delivery'],
    features: ['High-density EVA foam', '33cm x 14cm standard size', 'Supports up to 120kg', 'Grid texture for targeted relief'],
    marketplaceLinks: [
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GZHX3MRP' },
    ],
  },
  {
    id: '2',
    name: 'Foot Insoles',
    slug: 'foot-insoles',
    tagline: 'Every step, engineered for performance.',
    shortDescription: 'Best arch support insoles in India for flat feet, plantar fasciitis, and running. Memory foam shoe insoles with anti-odor treatment. Free shipping.',
    description: 'Soul Stretch Foot Insoles are the best orthopedic shoe insoles in India for flat feet, plantar fasciitis, and high-impact sports. Medical-grade memory foam heel cup with breathable anti-odor top layer delivers biomechanical arch support that reduces foot fatigue, corrects overpronation, and cushions every step. Trusted by runners, gym-goers, and everyday athletes across India. Available in sizes 6-12. Buy foot insoles online in India from Soul Stretch with free shipping.',
    category: 'support',
    imageUrl: '/images/products/foot-insoles.jpeg',
    images: [],
    price: 399,
    comparePrice: 799,
    seoTitle: 'Buy Foot Insoles Online India | Best Arch Support Insoles for Flat Feet',
    seoKeywords: ['foot insoles', 'shoe insoles India', 'buy insoles online India', 'arch support insoles', 'insoles for flat feet', 'plantar fasciitis insoles India', 'memory foam insoles', 'running insoles India', 'orthopedic insoles', 'insoles for gym shoes', 'best insoles India price', 'shoe insoles for standing all day'],
    benefits: ['Reduces plantar fascia strain', 'Corrects foot alignment', 'Absorbs impact on hard surfaces'],
    features: ['Memory foam heel cup', 'Breathable top layer', 'Fits sizes 6-12', 'Anti-odor treatment'],
    marketplaceLinks: [
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GZDZ7WKY', label: 'Size 6' },
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GZNYCRGP', label: 'Size 7' },
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0H114KP2W', label: 'Size 8' },
    ],
  },
  {
    id: '3',
    name: 'Hand Gripper',
    slug: 'hand-gripper',
    tagline: 'Crush your limits. Build iron grip.',
    shortDescription: 'Best hand gripper in India for grip strength training. Steel spring hand exerciser for forearm strength, stress relief, and rehabilitation. Free shipping.',
    description: 'The Soul Stretch Hand Gripper is India\'s top-rated grip strength trainer with durable steel spring construction and ergonomic foam handles. Built for athletes, climbers, and anyone who wants to build crushing grip strength and forearm size. This compact hand exerciser is perfect for daily grip training, stress relief, and post-injury rehabilitation. Portable enough for office, home, or gym use. Buy hand gripper online in India from Soul Stretch with free delivery.',
    category: 'strength',
    imageUrl: '/images/products/hand-gripper.jpeg',
    images: [
      '/images/products/hand-gripper-with-box.jpeg',
      '/images/products/hand-gripper-in-use.jpeg',
      '/images/products/hand-gripper-packaging.jpeg',
    ],
    price: 499,
    comparePrice: 899,
    seoTitle: 'Buy Hand Gripper Online India | Best Grip Strength Trainer ₹499',
    seoKeywords: ['hand gripper', 'hand gripper India', 'buy hand gripper online', 'grip strength trainer', 'hand exerciser India', 'forearm strengthener', 'hand gripper for gym', 'grip trainer India price', 'steel hand gripper', 'hand gripper exercise', 'best hand gripper India', 'grip strengthener for men'],
    benefits: ['Builds forearm and grip strength', 'Supports recovery and rehabilitation', 'Portable training anywhere'],
    features: ['Durable steel spring', 'Ergonomic foam handles', 'Compact carry size', 'Non-slip grip surface']
  },
  {
    id: '4',
    name: 'Adjustable Hand Gripper',
    slug: 'adjustable-hand-gripper',
    tagline: 'Progressive resistance. Progressive results.',
    shortDescription: 'Adjustable hand gripper 5-60kg with digital counter. Best adjustable grip strengthener in India for progressive overload training. Free shipping.',
    description: 'The Soul Stretch Adjustable Hand Gripper features a 5-60kg resistance dial and built-in digital rep counter for serious grip training. This is the best adjustable hand gripper in India for progressive overload, letting you increase resistance as you get stronger. Perfect for gym-goers, rock climbers, martial artists, and anyone recovering from hand injuries. Track every rep, adjust every session. Buy adjustable hand gripper online in India from Soul Stretch.',
    category: 'strength',
    imageUrl: '/images/products/adjustable-hand-gripper.jpeg',
    images: [
      '/images/products/adjustable-hand-gripper-with-box.jpeg',
      '/images/products/adjustable-hand-gripper-box.jpeg',
      '/images/products/adjustable-hand-gripper-packaging.jpeg',
    ],
    price: 699,
    comparePrice: 1299,
    seoTitle: 'Buy Adjustable Hand Gripper Online India | 5-60kg with Digital Counter',
    seoKeywords: ['adjustable hand gripper', 'adjustable hand gripper India', 'hand gripper with counter', 'buy adjustable gripper online India', 'grip strengthener adjustable', 'hand gripper 60kg', 'digital counter hand gripper', 'progressive hand gripper', 'best adjustable hand gripper India', 'hand gripper for men', 'grip trainer with counter'],
    benefits: ['Progressive overload built-in', 'Digital rep counter for tracking', 'Suitable for all fitness levels'],
    features: ['5-60kg adjustable dial', 'Built-in digital counter', 'Anti-slip grip surface', 'Resistance indicator window'],
    marketplaceLinks: [
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GZ7MNZDZ?th=1', label: 'Black' },
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0H11YCZYB?th=1', label: 'Green' },
    ],
  },
  {
    id: '5',
    name: 'Wrist Exerciser',
    slug: 'wrist-exerciser',
    tagline: 'Unlock wrist mobility. Unlock performance.',
    shortDescription: 'Best wrist exerciser in India for forearm strength and mobility. 360° rotation wrist roller for carpal tunnel relief and wrist rehab. Free shipping.',
    description: 'The Soul Stretch Wrist Exerciser targets forearm rotator muscles with a 360° rotation mechanism, improving wrist stability, grip endurance, and reducing carpal tunnel risk. This is the best wrist strengthener in India for athletes, gamers, desk workers, and anyone recovering from wrist injuries. Compact design with adjustable tension fits in any gym bag or desk drawer. Buy wrist exerciser online in India from Soul Stretch.',
    category: 'strength',
    imageUrl: '/images/products/wrist-exerciser.webp',
    images: [],
    price: 599,
    comparePrice: 999,
    seoTitle: 'Buy Wrist Exerciser Online India | Best Wrist Strengthener & Forearm Roller',
    seoKeywords: ['wrist exerciser', 'wrist exerciser India', 'buy wrist exerciser online', 'wrist strengthener', 'forearm roller', 'wrist roller India', 'carpal tunnel exercise tool', 'wrist rehab equipment', 'forearm exerciser India', 'wrist trainer', 'wrist exercise equipment India price'],
    benefits: ['Improves wrist flexibility and range of motion', 'Strengthens wrist stabilizers', 'Reduces wrist injury risk'],
    features: ['360° rotation mechanism', 'Non-slip rubber grip', 'Compact travel design', 'Adjustable tension'],
    marketplaceLinks: [
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GZJ1MVM3' },
    ],
  },
  {
    id: '6',
    name: 'Protein Shaker - Orange Edition',
    slug: 'protein-shaker-orange',
    tagline: 'Fuel your recovery. On the go.',
    shortDescription: 'Best protein shaker bottle in India. 700ml BPA-free gym shaker with stainless mixing ball and leak-proof lid. Buy shaker bottle online. Free shipping.',
    description: 'The Soul Stretch Protein Shaker Orange Edition is the best gym shaker bottle in India with 700ml BPA-free Tritan construction, stainless steel mixing ball for lump-free protein shakes, and a secure screw-lock leak-proof lid. Measurement markings make dosing easy. Perfect for whey protein, BCAA, creatine, or pre-workout supplements. Buy protein shaker online in India from Soul Stretch.',
    category: 'accessories',
    imageUrl: '/images/products/protein-shaker-orange.jpeg',
    images: [
      '/images/products/protein-shaker.jpeg',
    ],
    price: 349,
    comparePrice: 699,
    seoTitle: 'Buy Protein Shaker Bottle Online India | 700ml BPA-Free Gym Shaker',
    seoKeywords: ['protein shaker', 'protein shaker bottle India', 'buy shaker bottle online India', 'gym shaker bottle', 'BPA free shaker bottle', 'protein shake mixer', 'shaker bottle 700ml', 'best shaker bottle India', 'gym water bottle India', 'protein shaker with ball', 'leak proof shaker bottle'],
    benefits: ['Smooth lump-free protein blends', 'Leak-proof at any angle', 'Easy to clean'],
    features: ['700ml BPA-free Tritan', 'Stainless mixing ball', 'Screw-lock lid', 'Measurement markings'],
    marketplaceLinks: [
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GZK9T8VY', label: 'Orange 700ml (Spring)' },
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GZ816L4F', label: 'Orange 700ml (Medium)' },
    ],
  },
  {
    id: '7',
    name: 'Protein Shaker - Blue Edition',
    slug: 'protein-shaker-blue',
    tagline: 'Move Better. Feel Stronger.',
    shortDescription: 'Compact gym shaker bottle for protein shakes. BPA-free construction with flip-top leak-proof lid. Buy protein shaker online India. Free shipping.',
    description: 'The Soul Stretch Blue Edition Protein Shaker is a compact, BPA-free gym shaker bottle designed for Indian athletes. Flip-top secure lid with leak-proof seal ensures your protein shake stays inside your bag, not on it. Translucent body lets you monitor fill levels at a glance. Buy protein shaker bottle online in India from Soul Stretch.',
    category: 'accessories',
    imageUrl: '/images/products/protein-shaker-blue.jpeg',
    images: [
      '/images/products/protein-shaker-blue-alt.jpeg',
    ],
    price: 299,
    comparePrice: 599,
    seoTitle: 'Buy Protein Shaker Blue Online India | Compact Gym Shaker Bottle',
    seoKeywords: ['protein shaker blue', 'gym shaker bottle India', 'buy protein shaker online', 'compact shaker bottle', 'BPA free gym bottle', 'flip top shaker', 'protein shake bottle India', 'shaker bottle for gym', 'best gym bottle India'],
    benefits: ['Compact size for gym bags', 'Leak-proof flip-top lid', 'Easy to clean'],
    features: ['BPA-free construction', 'Flip-top secure lid', 'Translucent body for fill level', 'Soul Stretch branded'],
    marketplaceLinks: [
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GZ8F6V7Y', label: 'Blue 700ml (Medium)' },
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0H11QWD6S', label: 'Blue 500ml (Small)' },
    ],
  },
  {
    id: '8',
    name: 'Protein Shaker - Stealth Black',
    slug: 'protein-shaker-black',
    tagline: 'Move Better. Feel Stronger.',
    shortDescription: 'Premium black protein shaker bottle for gym. Sleek stealth design with leak-proof screw-lock lid. Buy gym shaker online India. Free shipping.',
    description: 'The Soul Stretch Stealth Black Protein Shaker combines a clean all-black matte aesthetic with reliable gym-grade performance. Screw-lock lid ensures zero leaks during commute or gym sessions. Measurement markings and BPA-free construction make it the best black shaker bottle in India for athletes who prefer understated style. Buy protein shaker online in India from Soul Stretch.',
    category: 'accessories',
    imageUrl: '/images/products/protein-shaker-black-small.jpeg',
    images: [
      '/images/products/protein-shaker-black-large.jpeg',
      '/images/products/protein-shaker-black-large-alt.jpeg',
    ],
    price: 349,
    comparePrice: 699,
    seoTitle: 'Buy Black Protein Shaker Online India | Premium Stealth Gym Bottle',
    seoKeywords: ['black protein shaker', 'black gym shaker bottle', 'buy shaker bottle online India', 'stealth black shaker', 'matte black gym bottle', 'protein shaker black India', 'premium shaker bottle', 'gym bottle India price'],
    benefits: ['Sleek stealth design', 'Leak-proof at any angle', 'Easy to clean'],
    features: ['BPA-free construction', 'All-black design', 'Screw-lock lid', 'Measurement markings'],
    marketplaceLinks: [
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GZKDSXPF', label: 'Black 700ml (Spring)' },
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0H11Z8YD4', label: 'Black 500ml (Small)' },
    ],
  },
  {
    id: '9',
    name: 'Double Toning Tube',
    slug: 'double-toning-tube',
    tagline: 'Build Strength. Tone Muscles. Stay Active.',
    shortDescription: 'Best toning tube in India for full-body workout. Double resistance tube with padded handles for strength training, toning, and home gym. Free shipping.',
    description: 'The Soul Stretch Double Toning Tube is the best resistance toning tube in India for full-body strength training at home or gym. Dual-tube bilateral resistance activates chest, shoulders, arms, back, and legs simultaneously. Padded handles and non-slip foot straps ensure safe, comfortable workouts. Perfect for muscle toning, strength building, and physiotherapy exercises. Buy double toning tube online in India from Soul Stretch.',
    category: 'strength',
    imageUrl: '/images/products/double-toning-tube.jpeg',
    images: [
      '/images/products/double-toning-tube-box.jpeg',
    ],
    price: 499,
    comparePrice: 899,
    seoTitle: 'Buy Double Toning Tube Online India | Best Resistance Tube for Home Workout',
    seoKeywords: ['toning tube', 'double toning tube India', 'buy toning tube online', 'resistance tube India', 'toning tube for women', 'toning tube for men', 'resistance tube for home workout', 'exercise tube India', 'best toning tube India price', 'pull tube for exercise', 'chest expander tube', 'home gym resistance tube'],
    benefits: ['Activates multiple muscle groups', 'Improves bilateral strength balance', 'Portable full-body workout'],
    features: ['Dual tube resistance', 'Padded handles', 'Non-slip foot strap', 'Foldable for storage'],
    marketplaceLinks: [
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GZHS3S3P', label: 'Black' },
      { platform: 'amazon', url: 'https://www.amazon.in/dp/B0GYZ8TQKT', label: 'Yellow' },
    ],
  },
  {
    id: '10',
    name: 'Wrist Support',
    slug: 'wrist-support',
    tagline: 'Protect what powers your performance.',
    shortDescription: 'Best wrist wraps for gym in India. Neoprene compression wrist support with velcro strap for weightlifting, bench press, and CrossFit. Free shipping.',
    description: 'Soul Stretch Wrist Support wraps deliver firm neoprene compression that stabilizes your wrists during heavy bench press, overhead press, deadlifts, and CrossFit WODs. Adjustable velcro closure with thumb loop ensures a secure, custom fit. These are the best wrist wraps in India for powerlifters, bodybuilders, and serious gym-goers who need joint protection without sacrificing mobility. Buy wrist support online in India from Soul Stretch.',
    category: 'support',
    imageUrl: '/images/products/wrist-support.jpeg',
    images: [],
    price: 499,
    comparePrice: 899,
    seoTitle: 'Buy Wrist Support Online India | Best Wrist Wraps for Gym & Weightlifting',
    seoKeywords: ['wrist support', 'wrist wraps India', 'buy wrist support online India', 'wrist wraps for gym', 'wrist band for weightlifting', 'wrist support for bench press', 'neoprene wrist wrap', 'gym wrist band India', 'best wrist wraps India', 'wrist support for CrossFit', 'wrist guard gym India price'],
    benefits: ['Prevents hyperextension during heavy lifts', 'Reduces wrist inflammation', 'Improves lifting confidence'],
    features: ['Neoprene compression material', 'Adjustable velcro closure', 'Thumb loop for secure fit', 'One size fits most']
  },
  {
    id: '11',
    name: 'Resistance Band Set',
    slug: 'resistance-band-set',
    tagline: 'Five bands. Infinite possibilities.',
    shortDescription: 'Best resistance bands set in India. 5 latex loop bands (5-50lbs) with carry bag for home gym, pull-ups, stretching, and physiotherapy. Free shipping.',
    description: 'The Soul Stretch Resistance Band Set is India\'s best-selling resistance band kit with 5 color-coded natural latex bands spanning 5 to 50lbs of progressive resistance. Includes carry bag and door anchor for 100+ exercises at home, gym, or on the road. Perfect for pull-up assistance, stretching, physiotherapy, muscle building, and mobility work. Buy resistance bands online in India from Soul Stretch with free shipping.',
    category: 'recovery',
    imageUrl: '/images/products/resistance-band.jpg',
    images: [],
    price: 1299,
    comparePrice: 2499,
    seoTitle: 'Buy Resistance Bands Set Online India | 5 Loop Bands for Home Gym ₹1,299',
    seoKeywords: ['resistance bands', 'resistance bands India', 'buy resistance bands online India', 'resistance band set', 'loop resistance bands', 'pull up bands India', 'exercise bands for home workout', 'resistance bands for stretching', 'latex resistance bands', 'best resistance bands India price', 'resistance bands for physiotherapy', 'home gym bands set'],
    benefits: ['Progressive overload for every fitness level', 'Full-body training capability', 'Joint-friendly resistance'],
    features: ['5 resistance levels: 5/10/20/35/50lbs', 'Natural latex construction', 'Includes carry bag + door anchor', '150cm length per band']
  },
  {
    id: '12',
    name: 'Gym Gloves',
    slug: 'gym-gloves',
    tagline: 'Grip. Protect. Dominate.',
    shortDescription: 'Best gym gloves in India with anti-slip silicone palm grip. Breathable workout gloves for weightlifting, CrossFit, and pull-ups. Free shipping.',
    description: 'Soul Stretch Gym Gloves are the best workout gloves in India, featuring anti-slip silicone palm grips for maximum barbell and dumbbell control, breathable mesh backing for sweat-free comfort, and an integrated wraparound wrist strap for joint support. Zero calluses, full range of motion, and sizes from S to XL. Perfect for weightlifting, CrossFit, pull-ups, and deadlifts. Buy gym gloves online in India from Soul Stretch.',
    category: 'accessories',
    imageUrl: '/images/products/gym-gloves.jpeg',
    images: [],
    price: 699,
    comparePrice: 1299,
    seoTitle: 'Buy Gym Gloves Online India | Best Workout Gloves for Weightlifting',
    seoKeywords: ['gym gloves', 'gym gloves India', 'buy gym gloves online India', 'workout gloves', 'weightlifting gloves India', 'gym gloves for men', 'gym gloves for women', 'anti-slip gym gloves', 'best gym gloves India price', 'CrossFit gloves', 'gym hand gloves', 'pull up gloves India'],
    benefits: ['Eliminates grip fatigue during long sets', 'Prevents callus formation', 'Wrist support integrated'],
    features: ['Silicone anti-slip palm', 'Breathable mesh dorsal', 'Adjustable wrist wrap', 'Sizes S/M/L/XL']
  },
  {
    id: '13',
    name: 'Skipping Rope',
    slug: 'skipping-rope',
    tagline: 'Speed. Endurance. No excuses.',
    shortDescription: 'Best skipping rope in India with ball-bearing handles. Adjustable speed jump rope for weight loss, cardio, and boxing training. Free shipping.',
    description: 'The Soul Stretch Skipping Rope is the best speed jump rope in India with precision ball-bearing swivel handles for zero-tangle, high-speed rotation. Adjustable 3m PVC-coated steel cable and contoured foam grips deliver sustained cardio sessions without hand fatigue. Burns 10-16 calories per minute. Perfect for weight loss, HIIT, boxing footwork, and CrossFit double-unders. Buy skipping rope online in India from Soul Stretch.',
    category: 'cardio',
    imageUrl: '/images/products/skipping-rope.jpg',
    images: [],
    price: 599,
    comparePrice: 999,
    seoTitle: 'Buy Skipping Rope Online India | Best Speed Jump Rope for Weight Loss',
    seoKeywords: ['skipping rope', 'skipping rope India', 'buy skipping rope online India', 'jump rope India', 'speed jump rope', 'skipping rope for weight loss', 'ball bearing skipping rope', 'best skipping rope India price', 'boxing skipping rope', 'adjustable skipping rope', 'gym skipping rope', 'CrossFit jump rope India'],
    benefits: ['Burns 10-16 calories per minute', 'Improves coordination and footwork', 'Compact cardio anywhere'],
    features: ['Ball-bearing swivel handles', '3m adjustable cable', 'Foam cushion grips', 'PVC-coated steel cable']
  }
]

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(SHEET_CSV_URL, { next: { revalidate: 3600 } })
    if (!response.ok) throw new Error('Sheet fetch failed')
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
