"use client"

import { HeroSection } from "@/components/landing/hero-section"
import { FeatureShowcase } from "@/components/landing/feature-showcase"
import { CustomerTestimonials } from "@/components/landing/customer-testimonials"
import { ProductDescription } from "@/components/landing/product-description"
import { AIDemoPreview } from "@/components/landing/ai-demo-preview"
import { FinalCTA } from "@/components/landing/final-cta"
import { Navigation } from "@/components/landing/navigation"
import { GradientBackground } from "@/components/ui/gradient-background"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <GradientBackground>
      <Navigation onGetStarted={onGetStarted} />
      <HeroSection onGetStarted={onGetStarted} />
      <FeatureShowcase onGetStarted={onGetStarted} />
      <CustomerTestimonials onGetStarted={onGetStarted} />
      <ProductDescription onGetStarted={onGetStarted} />
      <AIDemoPreview onGetStarted={onGetStarted} />
      <FinalCTA onGetStarted={onGetStarted} />
    </GradientBackground>
  )
}
