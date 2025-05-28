"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTaskStore } from "@/lib/task-store"
import { TaskCard } from "@/components/task-card"
import { TaskListItem } from "@/components/dashboard/task-list-item"
import { Grid3X3, List } from "lucide-react"

interface TaskViewsProps {
  viewMode: "list" | "cards"
  onViewModeChange: (mode: "list" | "cards") => void
}

export function TaskViews({ viewMode, onViewModeChange }: TaskViewsProps) {
  const { tasks } = useTaskStore()

  if (tasks.length === 0) {
    return (
      <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
        <CardContent className="py-16 text-center">
          <div className="text-slate-400 mb-4">
            <Grid3X3 className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No tasks yet</h3>
          <p className="text-slate-500">Add your first task using the input above</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-900">Your Tasks ({tasks.length})</CardTitle>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("cards")}
              className="h-8"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="h-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {viewMode === "cards" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
