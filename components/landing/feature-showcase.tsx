"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, MessageSquare, Zap, Shield, BarChart3, Users } from "lucide-react"
import { motion } from "framer-motion"

interface FeatureShowcaseProps {
  onGetStarted: () => void
}

const features = [
  {
    icon: Brain,
    title: "AI-Powered Parsing",
    description: "Advanced natural language processing transforms conversations into structured tasks instantly.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: MessageSquare,
    title: "Meeting Transcripts",
    description: "Upload meeting notes and watch AI extract multiple tasks with assignees and deadlines.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant task creation and updates with real-time synchronization across all devices.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All data stored locally. Your sensitive information never leaves your device.",
    gradient: "from-pink-500 to-red-600",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Comprehensive insights into your productivity patterns and task completion rates.",
    gradient: "from-red-500 to-orange-600",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Assign tasks, track progress, and collaborate seamlessly with your team members.",
    gradient: "from-orange-500 to-yellow-600",
  },
]

export function FeatureShowcase({ onGetStarted }: FeatureShowcaseProps) {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Engineered for Excellence
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Every feature crafted with precision to deliver an unparalleled task management experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/60 backdrop-blur-sm border-slate-200/50 hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <CardContent className="p-6 sm:p-8">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-900">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-blue-500/25 hover:scale-105"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
