"use client"

import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface AIDemoPreviewProps {
  onGetStarted: () => void
}

export function AIDemoPreview({ onGetStarted }: AIDemoPreviewProps) {
  return (
    <section className="py-32 px-6 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.3),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-blue-300" />
            <span className="text-sm font-medium">AI Technology</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">Watch AI in Action</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience the power of advanced natural language processing as it transforms your words into organized,
            actionable tasks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
            <div className="relative">
              <div className="bg-black/50 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <span className="ml-4 text-sm text-white/70">AI Processing</span>
                </div>

                <div className="space-y-4 text-left">
                  <div className="text-green-400 font-mono text-sm">
                    Input: "Team meeting tomorrow 2pm, John review designs by Friday P1, Sarah call client next week"
                  </div>

                  <div className="text-blue-400 font-mono text-sm">Processing with Gemini 1.5 Flash...</div>

                  <div className="text-yellow-400 font-mono text-sm">
                    ✓ Extracted 3 tasks
                    <br />✓ Identified assignees
                    <br />✓ Parsed deadlines
                    <br />✓ Determined priorities
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-slate-900 hover:bg-white/90 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl hover:scale-105"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
