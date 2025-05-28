"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Brain, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />
      
      {/* Subtle floating elements */}
      <motion.div
        animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-20 left-20 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl"
      />

      <div className="relative ">
        <div className="grid lg:grid-cols-2 gap-48 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Clean Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-white/90 backdrop-blur border border-blue-200 rounded-full px-4 py-2 shadow-sm"
            >
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">
                AI-Powered Task Intelligence
              </span>
              <Sparkles className="h-4 w-4 text-indigo-500" />
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                <span className="block text-slate-900 mb-2">Transform</span>
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Conversations
                </span>
                <span className="block text-slate-900">into Action</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-lg">
                Experience the future of productivity and task management with{" "}
                <span className="font-semibold text-blue-600">Flowtask Ai </span> 
                <span className="font-semibold text-blue-600">Smart TaskBoard</span>. Intelligently parse natural language into structured, actionable tasks.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <span className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:justify-self-center"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 w-[500px]">
              {/* Window controls */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="ml-3 text-sm font-medium text-slate-600">Flowtask Ai Smart TaskBoard</span>
              </div>

              <div className="space-y-6">
                {/* Input Section */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200"
                >
                  <div className="text-xs text-slate-500 mb-2 font-medium">Natural Language Input</div>
                  <div className="font-mono text-blue-700 font-semibold">
                    "Call Devansh tomorrow 4pm P2"
                  </div>
                </motion.div>

                {/* AI Processing Animation */}
                <div className="flex flex-col items-center py-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Brain className="h-5 w-5 text-blue-600" />
                    </motion.div>
                    <span className="text-sm font-medium text-slate-600">AI is parsing...</span>
                  </motion.div>
                  
                  {/* Shimmer Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5, delay: 1 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: [-100, 300] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Number.POSITIVE_INFINITY, 
                          ease: "easeInOut",
                          delay: 1
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Output Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
                >
                  <div className="text-xs text-slate-500 mb-3 font-medium">Structured Task</div>
                  <div className="space-y-2 text-sm">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.7 }}
                      className="flex justify-between"
                    >
                      <span className="font-medium text-slate-700">Task:</span>
                      <span className="text-slate-800">Call Devansh</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.9 }}
                      className="flex justify-between"
                    >
                      <span className="font-medium text-slate-700">Assignee:</span>
                      <span className="text-slate-800">Devansh</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 4.1 }}
                      className="flex justify-between"
                    >
                      <span className="font-medium text-slate-700">Deadline:</span>
                      <span className="text-slate-800">Tomorrow 4:00 PM</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 4.3 }}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium text-slate-700">Priority:</span>
                      <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                        P2
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
