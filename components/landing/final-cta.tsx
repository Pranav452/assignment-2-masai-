"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface FinalCTAProps {
  onGetStarted: () => void
}

export function FinalCTA({ onGetStarted }: FinalCTAProps) {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-full px-3 sm:px-4 py-2">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-medium text-slate-700">Ready to Transform?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Start Your Journey
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Today</span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join the productivity revolution. Experience the future of task management with Flowtask Ai Smart TaskBoard.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="pt-2 sm:pt-4"
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 group"
            >
              Get Started
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <p className="text-xs sm:text-sm text-slate-500">No credit card required • Start in seconds • Privacy guaranteed</p>
        </motion.div>
      </div>
    </section>
  )
}
