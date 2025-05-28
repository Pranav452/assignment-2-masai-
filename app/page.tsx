"use client"

import { useState, useEffect } from "react"
import { LandingPage } from "@/components/landing-page"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { OnboardingModal } from "@/components/onboarding-modal"

export default function Home() {
  const [user, setUser] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("Flowtask Ai_user")
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const handleGetStarted = () => {
    if (!user) {
      setShowOnboarding(true)
    }
  }

  const handleUserSetup = (name: string) => {
    localStorage.setItem("Flowtask Ai_user", name)
    setUser(name)
    setShowOnboarding(false)
  }

  if (user) {
    return <DashboardLayout userName={user} />
  }

  return (
    <>
      <LandingPage onGetStarted={handleGetStarted} />
      <OnboardingModal open={showOnboarding} onOpenChange={setShowOnboarding} onComplete={handleUserSetup} />
    </>
  )
}
