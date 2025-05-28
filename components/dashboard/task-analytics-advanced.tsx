"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTaskStore } from "@/lib/task-store"
import { TrendingUp, Target, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function TaskAnalyticsAdvanced() {
  const { tasks } = useTaskStore()

  // Advanced analytics calculations
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  // Productivity score based on completion rate and task priorities
  const highPriorityCompleted = tasks.filter((t) => t.completed && t.priority === "P1").length
  const highPriorityTotal = tasks.filter((t) => t.priority === "P1").length
  const productivityScore =
    highPriorityTotal > 0
      ? Math.round(((highPriorityCompleted / highPriorityTotal) * 0.6 + (completionRate / 100) * 0.4) * 100)
      : Math.round(completionRate)

  // Average completion time (mock calculation)
  const avgCompletionTime = Math.round(Math.random() * 24 + 12) // 12-36 hours

  // Task velocity (tasks completed per day)
  const tasksCompletedToday = tasks.filter((t) => {
    if (!t.completed) return false
    const today = new Date()
    const taskDate = new Date(t.createdAt)
    return taskDate.toDateString() === today.toDateString()
  }).length

  const metrics = [
    {
      title: "Productivity Score",
      value: `${productivityScore}%`,
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      description: "Based on priority completion",
      trend: productivityScore > 70 ? "↗️ Excellent" : productivityScore > 50 ? "→ Good" : "↘️ Needs Focus",
    },
    {
      title: "Completion Rate",
      value: `${Math.round(completionRate)}%`,
      icon: Target,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      description: "Overall task completion",
      trend: completionRate > 80 ? "🔥 On Fire" : completionRate > 60 ? "💪 Strong" : "🎯 Focus Mode",
    },
    {
      title: "Avg. Completion",
      value: `${avgCompletionTime}h`,
      icon: Clock,
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-50 to-amber-50",
      description: "Time to complete tasks",
      trend: avgCompletionTime < 24 ? "⚡ Fast" : avgCompletionTime < 48 ? "⏱️ Steady" : "🐌 Slow",
    },
    {
      title: "Today's Velocity",
      value: `${tasksCompletedToday}`,
      icon: Zap,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      description: "Tasks completed today",
      trend: tasksCompletedToday > 5 ? "🚀 Rocket" : tasksCompletedToday > 2 ? "✨ Active" : "🌱 Growing",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card
            className={`bg-gradient-to-br ${metric.bgGradient} border-slate-200/50 hover:shadow-xl transition-all duration-300 group overflow-hidden relative`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardHeader className="pb-2 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-700">{metric.title}</CardTitle>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <metric.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-600">{metric.description}</div>
                <div className="text-sm font-medium text-slate-800">{metric.trend}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
