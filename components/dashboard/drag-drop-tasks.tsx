"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTaskStore } from "@/lib/task-store"
import { GripVertical, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { motion, Reorder } from "framer-motion"
import type { Task } from "@/lib/types"
import { Button } from "@/components/ui/button"

export function DragDropTasks() {
  const { tasks, updateTask } = useTaskStore()
  const [reorderableTasks, setReorderableTasks] = useState(tasks)
  const [showAll, setShowAll] = useState(false)

  const ITEMS_PER_PAGE = 8

  const handleReorder = (newOrder: Task[]) => {
    setReorderableTasks(newOrder)
    // Update task order in store if needed
  }

  const toggleComplete = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      updateTask(taskId, { completed: !task.completed })
      setReorderableTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)))
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "P1":
        return "bg-red-500"
      case "P2":
        return "bg-orange-500"
      case "P3":
        return "bg-yellow-500"
      case "P4":
        return "bg-green-500"
      default:
        return "bg-slate-500"
    }
  }

  const getStatusIcon = (completed: boolean, priority: string) => {
    if (completed) return CheckCircle
    if (priority === "P1") return AlertTriangle
    return Clock
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-3 text-slate-900">
          <GripVertical className="h-6 w-6 text-purple-600" />
          Drag & Drop Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Reorder.Group axis="y" values={reorderableTasks} onReorder={handleReorder} className="space-y-3">
          {(showAll ? reorderableTasks : reorderableTasks.slice(0, ITEMS_PER_PAGE)).map((task) => {
            const StatusIcon = getStatusIcon(task.completed, task.priority)

            return (
              <Reorder.Item key={task.id} value={task} className="cursor-grab active:cursor-grabbing">
                <motion.div
                  layout
                  whileHover={{ scale: 1.02 }}
                  whileDrag={{ scale: 1.05, rotate: 2 }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    task.completed
                      ? "bg-slate-50 border-slate-200 opacity-60"
                      : "bg-gradient-to-r from-white to-blue-50/30 border-blue-200/50 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <GripVertical className="h-5 w-5 text-slate-400 flex-shrink-0" />

                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        task.completed ? "bg-green-500 border-green-500" : "border-slate-300 hover:border-blue-500"
                      }`}
                    >
                      {task.completed && <CheckCircle className="h-4 w-4 text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h4
                          className={`font-medium truncate ${
                            task.completed ? "line-through text-slate-500" : "text-slate-900"
                          }`}
                        >
                          {task.description}
                        </h4>
                        <Badge variant="secondary" className={`${getPriorityColor(task.priority)} text-white text-xs`}>
                          {task.priority}
                        </Badge>
                      </div>

                      {(task.assignee || task.deadline) && (
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          {task.assignee && <span>👤 {task.assignee}</span>}
                          {task.deadline && <span>📅 {new Date(task.deadline).toLocaleDateString()}</span>}
                        </div>
                      )}
                    </div>

                    <StatusIcon
                      className={`h-5 w-5 ${
                        task.completed ? "text-green-500" : task.priority === "P1" ? "text-red-500" : "text-orange-500"
                      }`}
                    />
                  </div>
                </motion.div>
              </Reorder.Item>
            )
          })}
        </Reorder.Group>
        
        {/* View More Button */}
        {reorderableTasks.length > ITEMS_PER_PAGE && !showAll && (
          <div className="flex justify-center mt-6 pt-4 border-t border-slate-200">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100 text-purple-700 hover:text-purple-800"
            >
              View More ({reorderableTasks.length - ITEMS_PER_PAGE} more tasks)
            </Button>
          </div>
        )}
        
        {/* Show Less Button */}
        {showAll && reorderableTasks.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-6 pt-4 border-t border-slate-200">
            <Button
              onClick={() => setShowAll(false)}
              variant="outline"
              className="bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200 hover:from-slate-100 hover:to-gray-100 text-slate-700 hover:text-slate-800"
            >
              Show Less
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
