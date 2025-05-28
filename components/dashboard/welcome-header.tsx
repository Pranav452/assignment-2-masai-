"use client"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card, CardContent } from "@/components/ui/card"
import { useTaskStore } from "@/lib/task-store"
import { CheckCircle, Clock, AlertTriangle, Target, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface WelcomeHeaderProps {
  userName: string
}

export function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  const { tasks } = useTaskStore()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const highPriorityTasks = tasks.filter((task) => task.priority === "P1" && !task.completed).length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: Target,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200/50",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200/50",
    },
    {
      title: "In Progress",
      value: pendingTasks,
      icon: Clock,
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200/50",
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      icon: AlertTriangle,
      gradient: "from-red-500 to-rose-600",
      bgGradient: "from-red-50 to-rose-50",
      borderColor: "border-red-200/50",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="bg-purple-50 border-none shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">
                  <span className="bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                    Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}
                    , {userName}!
                  </span>
                </h1>
                <p className="text-xl text-slate-600">
                  {completionRate > 80
                    ? "🎉 Excellent progress!"
                    : completionRate > 50
                      ? "💪 Keep up the great work!"
                      : "🚀 Let's get productive!"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-700">{completionRate}%</div>
                <div className="text-sm text-slate-500 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Completion Rate
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card
              className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm border ${stat.borderColor} hover:shadow-xl transition-all duration-300 group hover:scale-105`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">{stat.title}</CardTitle>
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                {stat.title === "Completed" && totalTasks > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-white/60 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
