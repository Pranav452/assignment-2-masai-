"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTaskStore } from "@/lib/task-store"
import { CheckCircle, Clock, AlertTriangle, Target } from "lucide-react"

export function DashboardStats() {
  const { tasks } = useTaskStore()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const highPriorityTasks = tasks.filter((task) => task.priority === "P1" && !task.completed).length
  const overdueTasks = tasks.filter((task) => {
    if (task.completed || !task.deadline) return false
    return new Date(task.deadline) < new Date()
  }).length

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: Target,
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: Clock,
      gradient: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      title: "High Priority",
      value: highPriorityTasks,
      icon: AlertTriangle,
      gradient: "from-red-500 to-rose-600",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="bg-white/60 backdrop-blur-sm border-slate-200/50 hover:shadow-lg transition-all duration-300"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</div>
            {stat.title === "Completed" && totalTasks > 0 && (
              <p className="text-xs text-slate-500 mt-1">
                {Math.round((completedTasks / totalTasks) * 100)}% completion rate
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
