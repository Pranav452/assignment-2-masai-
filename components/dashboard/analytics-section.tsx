"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTaskStore } from "@/lib/task-store"
import { BarChart3, TrendingUp, Target } from "lucide-react"
import { format, subDays, startOfDay, endOfDay } from "date-fns"

export function AnalyticsSection() {
  const { tasks } = useTaskStore()

  // Calculate analytics
  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)

  // Priority distribution
  const priorityStats = {
    P1: tasks.filter((task) => task.priority === "P1").length,
    P2: tasks.filter((task) => task.priority === "P2").length,
    P3: tasks.filter((task) => task.priority === "P3").length,
    P4: tasks.filter((task) => task.priority === "P4").length,
  }

  // Weekly completion data (last 7 days)
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i)
    const dayStart = startOfDay(date)
    const dayEnd = endOfDay(date)

    const completed = completedTasks.filter((task) => {
      const createdDate = new Date(task.createdAt)
      return createdDate >= dayStart && createdDate <= dayEnd
    }).length

    return {
      date: format(date, "MMM d"),
      completed,
    }
  })

  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Completion Rate */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <Target className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{completionRate}%</div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {completedTasks.length} of {tasks.length} tasks completed
          </p>
        </CardContent>
      </Card>

      {/* Priority Distribution */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Priority Distribution</CardTitle>
          <BarChart3 className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(priorityStats).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      priority === "P1"
                        ? "bg-red-500"
                        : priority === "P2"
                          ? "bg-orange-500"
                          : priority === "P3"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                    }`}
                  />
                  <span className="text-sm font-medium">{priority}</span>
                </div>
                <span className="text-sm text-slate-600">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Activity</CardTitle>
          <TrendingUp className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{day.date}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(day.completed * 20, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-6">{day.completed}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
