"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, BarChart3, Settings, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function QuickActions() {
  const actions = [
    {
      title: "Add Single Task",
      description: "Create a task with natural language",
      icon: Plus,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      action: () => {
        // Navigate to add tasks page
        const event = new CustomEvent("navigate", { detail: "add-tasks" })
        window.dispatchEvent(event)
      },
    },
    {
      title: "Parse Transcript",
      description: "Extract tasks from meeting notes",
      icon: FileText,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      action: () => {
        const event = new CustomEvent("navigate", { detail: "add-tasks" })
        window.dispatchEvent(event)
      },
    },
    {
      title: "View Analytics",
      description: "Check your productivity insights",
      icon: BarChart3,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      action: () => {
        document.getElementById("analytics")?.scrollIntoView({ behavior: "smooth" })
      },
    },
    {
      title: "Manage Tasks",
      description: "Organize and filter your tasks",
      icon: Settings,
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-50 to-amber-50",
      action: () => {
        const event = new CustomEvent("navigate", { detail: "tasks" })
        window.dispatchEvent(event)
      },
    },
  ]

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-3">
          <Zap className="h-6 w-6 text-yellow-500" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Button
                onClick={action.action}
                variant="ghost"
                className={`h-auto p-6 w-full bg-gradient-to-br ${action.bgGradient} hover:shadow-lg transition-all duration-300 group border border-slate-200/50 hover:scale-105`}
              >
                <div className="text-center space-y-3">
                  <div
                    className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{action.title}</div>
                    <div className="text-sm text-slate-600">{action.description}</div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
