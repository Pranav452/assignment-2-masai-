"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTaskStore } from "@/lib/task-store"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns"
import { motion } from "framer-motion"

export function CalendarView() {
  const { tasks } = useTaskStore()
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getTasksForDay = (day: Date) => {
    return tasks.filter((task) => {
      if (!task.deadline) return false
      return isSameDay(new Date(task.deadline), day)
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "P1":
        return "bg-red-500 border-red-600"
      case "P2":
        return "bg-orange-500 border-orange-600"
      case "P3":
        return "bg-yellow-500 border-yellow-600"
      case "P4":
        return "bg-green-500 border-green-600"
      default:
        return "bg-slate-500 border-slate-600"
    }
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-3 text-slate-900">
            <Calendar className="h-6 w-6 text-blue-600" />
            Calendar View
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
              <ChevronLeft className="h-4 w-4 text-slate-700" />
            </Button>
            <div className="text-lg font-semibold min-w-48 text-center text-slate-900">{format(currentDate, "MMMM yyyy")}</div>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
              <ChevronRight className="h-4 w-4 text-slate-700" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold text-slate-700 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dayTasks = getTasksForDay(day)
            const isToday = isSameDay(day, new Date())

            return (
              <motion.div
                key={day.toISOString()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
                className={`min-h-16 p-2 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  isToday
                    ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300"
                    : isSameMonth(day, currentDate)
                      ? "bg-white border-slate-200 hover:border-slate-300"
                      : "bg-slate-50 border-slate-100"
                }`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    isToday ? "text-blue-700" : isSameMonth(day, currentDate) ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {format(day, "d")}
                </div>

                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.05 }}
                      className={`text-xs p-1 rounded border ${getPriorityColor(task.priority)} text-white truncate cursor-pointer`}
                      title={task.description}
                    >
                      {task.description}
                    </motion.div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-slate-500 text-center">+{dayTasks.length - 3} more</div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
