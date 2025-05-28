"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, ArrowRight, Sparkles, User } from "lucide-react"
import { motion } from "framer-motion"

interface OnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (name: string) => void
}

export function OnboardingModal({ open, onOpenChange, onComplete }: OnboardingModalProps) {
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onComplete(name.trim())
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-0 p-0 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative p-8"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-xl"
          />

          <div className="relative text-center space-y-8">
            {/* Logo Section */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"
                />
                <Brain className="h-10 w-10 text-white relative z-10" />
              </div>
             
            </motion.div>

            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-full px-4 py-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Welcome to the Future
                </span>
              </div>

              <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Join Flowtask Ai
                </span>
              </h2>

              <p className="text-slate-900 leading-relaxed max-w-sm mx-auto">
                Let's personalize your experience with our intelligent task management system
              </p>
            </motion.div>

            {/* Form Section */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-3">
                <Label htmlFor="name" className="text-left block text-slate-800 font-medium">
                  What should we call you?
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className=" h-12 text-lg bg-white/80 backdrop-blur-sm border-slate-200/60 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl text-slate-800"
                    autoFocus
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!name.trim()}
                className="w-fit bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white h-14 rounded-xl text-sm font-bold transition-all duration-500 shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] group relative overflow-hidden"
              >
            
                <span className="relative flex items-center justify-center gap-3">
                  Continue Your Journey
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.form>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xs text-slate-900 text-center"
            >
              Your data is stored locally and never shared
            </motion.p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
