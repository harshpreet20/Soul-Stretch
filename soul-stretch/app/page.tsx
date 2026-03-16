import HeroSection from '@/components/home/HeroSection'
import ScrollStorytelling from '@/components/home/ScrollStorytelling'
import AppleProductReveal from '@/components/home/AppleProductReveal'
import ComparisonSlider from '@/components/home/ComparisonSlider'
import GuidesPreview from '@/components/home/GuidesPreview'
import DistributorCTA from '@/components/home/DistributorCTA'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Scroll Storytelling */}
      <ScrollStorytelling />

      {/* Featured Products - Apple Style Reveal */}
      <AppleProductReveal />

      {/* Comparison Slider */}
      <ComparisonSlider />

      {/* Guides Preview */}
      <GuidesPreview />

      {/* Distributor CTA */}
      <DistributorCTA />
    </>
  )
}
