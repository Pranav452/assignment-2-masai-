"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTaskStore } from "@/lib/task-store"
import { LayoutTemplateIcon as Template, Plus, Briefcase, Users, Code, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

const taskTemplates = [
  {
    id: "daily-standup",
    name: "Daily Standup",
    icon: Users,
    category: "Meeting",
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    tasks: [
      { description: "Prepare standup updates", priority: "P3" as const },
      { description: "Review yesterday's progress", priority: "P3" as const },
      { description: "Plan today's priorities", priority: "P2" as const },
      { description: "Identify blockers", priority: "P1" as const },
    ],
  },
  {
    id: "project-kickoff",
    name: "Project Kickoff",
    icon: Briefcase,
    category: "Project",
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
    tasks: [
      { description: "Define project scope", priority: "P1" as const },
      { description: "Set up project repository", priority: "P2" as const },
      { description: "Create project timeline", priority: "P2" as const },
      { description: "Assign team roles", priority: "P1" as const },
      { description: "Schedule kickoff meeting", priority: "P2" as const },
    ],
  },
  {
    id: "code-review",
    name: "Code Review",
    icon: Code,
    category: "Development",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-50 to-pink-50",
    tasks: [
      { description: "Review pull request", priority: "P2" as const },
      { description: "Test functionality", priority: "P1" as const },
      { description: "Check code standards", priority: "P3" as const },
      { description: "Provide feedback", priority: "P2" as const },
    ],
  },
  {
    id: "personal-wellness",
    name: "Personal Wellness",
    icon: Heart,
    category: "Personal",
    color: "from-rose-500 to-pink-600",
    bgColor: "from-rose-50 to-pink-50",
    tasks: [
      { description: "Morning meditation", priority: "P3" as const },
      { description: "Exercise routine", priority: "P2" as const },
      { description: "Healthy meal prep", priority: "P3" as const },
      { description: "Evening reflection", priority: "P3" as const },
    ],
  },
]

export function TaskTemplates() {
  const { addTasks } = useTaskStore()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleUseTemplate = (template: (typeof taskTemplates)[0]) => {
    const tasksToAdd = template.tasks.map((task) => ({
      ...task,
      assignee: undefined,
      deadline: undefined,
    }))

    addTasks(tasksToAdd)
    toast.success(`Added ${tasksToAdd.length} tasks from ${template.name} template!`)
    setSelectedTemplate(null)
  }

  return (
    <Card className="bg-purple-50 border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-3 text-slate-900">
          <Template className="h-6 w-6 text-purple-600" />
          Task Templates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {taskTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={`bg-gradient-to-br ${template.bgColor} border-slate-200/50 hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${template.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <template.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{template.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {template.tasks.slice(0, 3).map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center gap-2 text-sm">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            task.priority === "P1"
                              ? "bg-red-500"
                              : task.priority === "P2"
                                ? "bg-orange-500"
                                : task.priority === "P3"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                          }`}
                        />
                        <span className="text-slate-700 truncate">{task.description}</span>
                      </div>
                    ))}
                    {template.tasks.length > 3 && (
                      <div className="text-xs text-slate-500 ml-4">+{template.tasks.length - 3} more tasks</div>
                    )}
                  </div>

                  <Button
                    onClick={() => handleUseTemplate(template)}
                    className={`w-full bg-gradient-to-r ${template.color} hover:opacity-90 text-white`}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Use Template ({template.tasks.length} tasks)
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
