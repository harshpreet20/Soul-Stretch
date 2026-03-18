export type AudienceSegment = 'athlete' | 'gym-owner' | 'beginner' | 'rehab' | 'distributor'

export interface SegmentConfig {
  id: AudienceSegment
  label: string
  description: string
  heroHeadline: string
  heroSubtext: string
  ctaLabel: string
  ctaLink: string
  priorityCategories: string[]
  messagingTone: string
}

export const SEGMENT_CONFIGS: Record<AudienceSegment, SegmentConfig> = {
  athlete: {
    id: 'athlete',
    label: 'Serious Athlete',
    description: 'Competitive athletes focused on performance and recovery',
    heroHeadline: 'Train Better. Recover Faster. Stretch Further.',
    heroSubtext:
      "India's premium fitness equipment for serious athletes. Recovery tools, grip trainers, resistance bands, and gym accessories — engineered to elevate your performance.",
    ctaLabel: 'Shop Premium Equipment',
    ctaLink: '/products',
    priorityCategories: ['recovery', 'strength', 'cardio'],
    messagingTone: 'performance',
  },
  'gym-owner': {
    id: 'gym-owner',
    label: 'Gym / Studio Owner',
    description: 'Gym owners and studio managers buying in bulk',
    heroHeadline: 'Equip Your Gym. Elevate Your Members.',
    heroSubtext:
      'Bulk pricing on premium fitness equipment for gyms and studios across India. Stock the recovery and strength tools your members actually use.',
    ctaLabel: 'Get Bulk Pricing',
    ctaLink: '/contact?type=gym',
    priorityCategories: ['recovery', 'accessories', 'strength'],
    messagingTone: 'business',
  },
  beginner: {
    id: 'beginner',
    label: 'Fitness Beginner',
    description: 'New to fitness, looking for accessible entry-level gear',
    heroHeadline: 'Start Your Fitness Journey Right.',
    heroSubtext:
      'Premium yet accessible fitness equipment designed for every level. Resistance bands, foam rollers, and more — everything you need to build a home gym in India.',
    ctaLabel: 'Explore Starter Gear',
    ctaLink: '/products',
    priorityCategories: ['accessories', 'cardio', 'recovery'],
    messagingTone: 'encouraging',
  },
  rehab: {
    id: 'rehab',
    label: 'Rehab / Physio',
    description: 'Rehabilitation patients and physiotherapy practitioners',
    heroHeadline: 'Recover With Confidence.',
    heroSubtext:
      'Gentle yet effective recovery and mobility equipment trusted by physiotherapists across India. Support your rehabilitation journey with tools designed for safe, progressive recovery.',
    ctaLabel: 'View Recovery Tools',
    ctaLink: '/products',
    priorityCategories: ['recovery', 'support', 'strength'],
    messagingTone: 'supportive',
  },
  distributor: {
    id: 'distributor',
    label: 'Distributor / Retailer',
    description: 'Wholesale and retail distribution partners',
    heroHeadline: 'Partner With India\'s Fastest-Growing Fitness Brand.',
    heroSubtext:
      'High-margin premium fitness equipment with pan-India demand. Become a Soul Stretch retail partner and grow with us.',
    ctaLabel: 'Become a Partner',
    ctaLink: '/contact?type=distributor',
    priorityCategories: ['recovery', 'strength', 'accessories'],
    messagingTone: 'business',
  },
}

export const DEFAULT_SEGMENT: AudienceSegment = 'athlete'

export function getSegmentConfig(segment: AudienceSegment): SegmentConfig {
  return SEGMENT_CONFIGS[segment] || SEGMENT_CONFIGS[DEFAULT_SEGMENT]
}

export function getSegmentProductOrder(segment: AudienceSegment, categories: string[]): string[] {
  const config = getSegmentConfig(segment)
  const prioritized = config.priorityCategories.filter((c) => categories.includes(c))
  const remaining = categories.filter((c) => !prioritized.includes(c))
  return [...prioritized, ...remaining]
}
