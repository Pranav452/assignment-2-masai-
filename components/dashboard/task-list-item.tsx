"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, Trash2, User, Calendar, Clock } from "lucide-react"
import type { Task } from "@/lib/types"
import { useTaskStore } from "@/lib/task-store"
import { EditTaskDialog } from "@/components/edit-task-dialog"
import { format } from "date-fns"

interface TaskListItemProps {
  task: Task
}

const priorityColors = {
  P1: "bg-red-500",
  P2: "bg-orange-500",
  P3: "bg-yellow-500",
  P4: "bg-green-500",
}

export function TaskListItem({ task }: TaskListItemProps) {
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
      <div
        className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-sm ${
          task.completed ? "bg-slate-50 opacity-60" : "bg-white"
        } ${isOverdue ? "border-red-200 bg-red-50/50" : "border-slate-200"}`}
      >
        <Checkbox checked={task.completed} onCheckedChange={handleToggleComplete} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className={`font-medium truncate ${task.completed ? "line-through text-slate-500" : "text-slate-900"}`}>
              {task.description}
            </h4>
            <Badge variant="secondary" className={`${priorityColors[task.priority]} text-white text-xs`}>
              {task.priority}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            {task.assignee && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
            )}

            {task.deadline && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                  {format(new Date(task.deadline), "MMM d, yyyy")}
                </span>
                {task.deadline.includes("T") && (
                  <>
                    <Clock className="h-3 w-3 ml-1" />
                    <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                      {format(new Date(task.deadline), "h:mm a")}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => setIsEditOpen(true)} className="h-8 w-8 p-0">
            <Edit2 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <EditTaskDialog task={task} open={isEditOpen} onOpenChange={setIsEditOpen} />
    </>
  )
}
