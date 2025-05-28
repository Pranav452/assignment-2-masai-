"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTaskStore } from "@/lib/task-store"

interface Notification {
  id: string
  type: "success" | "warning" | "info"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export function NotificationCenter() {
  const { tasks } = useTaskStore()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Generate notifications based on tasks
    const newNotifications: Notification[] = []

    // Overdue tasks
    const overdueTasks = tasks.filter((task) => {
      if (task.completed || !task.deadline) return false
      return new Date(task.deadline) < new Date()
    })

    if (overdueTasks.length > 0) {
      newNotifications.push({
        id: "overdue",
        type: "warning",
        title: "Overdue Tasks",
        message: `You have ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? "s" : ""}`,
        timestamp: new Date(),
        read: false,
      })
    }

    // High priority tasks
    const highPriorityPending = tasks.filter((task) => !task.completed && task.priority === "P1")

    if (highPriorityPending.length > 0) {
      newNotifications.push({
        id: "high-priority",
        type: "warning",
        title: "High Priority Tasks",
        message: `${highPriorityPending.length} critical task${highPriorityPending.length > 1 ? "s" : ""} need${highPriorityPending.length === 1 ? "s" : ""} attention`,
        timestamp: new Date(),
        read: false,
      })
    }

    // Completion milestone
    const completedToday = tasks.filter((task) => {
      if (!task.completed) return false
      const today = new Date()
      const taskDate = new Date(task.createdAt)
      return taskDate.toDateString() === today.toDateString()
    })

    if (completedToday.length >= 5) {
      newNotifications.push({
        id: "milestone",
        type: "success",
        title: "Great Progress!",
        message: `You've completed ${completedToday.length} tasks today! 🎉`,
        timestamp: new Date(),
        read: false,
      })
    }

    // Productivity tip
    if (tasks.length > 0) {
      newNotifications.push({
        id: "tip",
        type: "info",
        title: "Productivity Tip",
        message: "Try using keyboard shortcuts to navigate faster!",
        timestamp: new Date(),
        read: false,
      })
    }

    setNotifications(newNotifications)
  }, [tasks])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle
      case "warning":
        return AlertTriangle
      case "info":
        return Info
      default:
        return Bell
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-orange-600 bg-orange-100"
      case "info":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-slate-600 bg-slate-100"
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="h-5 w-5 text-slate-900 hover:bg-none hover:text-slate-900" />
        {/* {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white">{unreadCount}</Badge>
        )} */}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-72 z-50"
          >
            <Card className="bg-white/95 backdrop-blur-xl border-slate-200/50 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-slate-900">Notifications</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4 text-slate-900" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-500">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => {
                      const Icon = getIcon(notification.type)
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-4 border-b border-slate-200/50 hover:bg-slate-50/50 transition-colors ${
                            !notification.read ? "bg-blue-50/30" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${getColor(notification.type)}`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-slate-900 text-sm">{notification.title}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => dismissNotification(notification.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">
                                  {notification.timestamp.toLocaleTimeString()}
                                </span>
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-xs h-6"
                                  >
                                    Mark as read
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
