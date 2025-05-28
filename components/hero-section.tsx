"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Brain, ArrowDown } from "lucide-react"

export function HeroSection() {
  const scrollToWorkspace = () => {
    document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Flowtask Ai: Smart TaskBoard</span>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium">U</span>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
          {/* Hero Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Transform Conversations into Action
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              AI-powered task management from natural language & meeting transcripts. Turn chaos into clarity with
              intelligent parsing.
            </p>
            <Button size="lg" onClick={scrollToWorkspace} className="text-lg px-8 py-6 rounded-full">
              Get Started
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Demo Preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <div className="bg-card border rounded-lg p-6 shadow-lg">
                <div className="text-sm text-muted-foreground mb-2">Try saying:</div>
                <div className="font-mono text-sm bg-muted p-3 rounded">
                  "Call Devansh tomorrow 4pm P2" → 📞 Call Devansh | 👤 Devansh | 🗓️ Tomorrow 4:00 PM | ⚡ P2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
