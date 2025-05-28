"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, Trash2, User, Calendar, Clock } from "lucide-react"
import type { Task } from "@/lib/types"
import { useTaskStore } from "@/lib/task-store"
import { EditTaskDialog } from "@/components/edit-task-dialog"
import { format } from "date-fns"

interface TaskCardProps {
  task: Task
}

const priorityColors = {
  P1: "bg-red-500",
  P2: "bg-orange-500",
  P3: "bg-yellow-500",
  P4: "bg-green-500",
}

export function TaskCard({ task }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { updateTask, deleteTask } = useTaskStore()

  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed })
  }

  const handleDelete = () => {
    deleteTask(task.id)
  }

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed

  return (
    <>
      <Card
        className={`transition-all hover:shadow-md bg-white/80 backdrop-blur-sm border-slate-200/50 ${task.completed ? "opacity-60" : ""} ${isOverdue ? "border-red-200 bg-red-50/50" : ""}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 flex-1">
              <Checkbox checked={task.completed} onCheckedChange={handleToggleComplete} className="mt-1" />
              <div className="flex-1">
                <h4
                  className={`font-medium leading-tight text-slate-900 ${task.completed ? "line-through text-slate-500" : ""}`}
                >
                  {task.description}
                </h4>
              </div>
            </div>
            <Badge variant="secondary" className={`${priorityColors[task.priority]} text-white text-xs`}>
              {task.priority}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-2 text-sm text-slate-600">
            {task.assignee && (
              <div className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
            )}

            {task.deadline && (
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                  {format(new Date(task.deadline), "MMM d, yyyy")}
                </span>
                {task.deadline.includes("T") && (
                  <>
                    <Clock className="h-3 w-3 ml-2" />
                    <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                      {format(new Date(task.deadline), "h:mm a")}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-1 mt-4">
            <Button variant="ghost" size="sm" onClick={() => setIsEditOpen(true)} className="h-8 px-2 text-slate-600 hover:text-slate-900">
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 px-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditTaskDialog task={task} open={isEditOpen} onOpenChange={setIsEditOpen} />
    </>
  )
}
