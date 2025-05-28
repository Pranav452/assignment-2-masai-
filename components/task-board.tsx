"use client"

import { useTaskStore } from "@/lib/task-store"
import { TaskCard } from "@/components/task-card"
import { EmptyState } from "@/components/empty-state"

export function TaskBoard() {
  const { tasks } = useTaskStore()

  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Your Tasks ({tasks.length})</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
