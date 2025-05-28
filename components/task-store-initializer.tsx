"use client"

import { useEffect } from "react"
import { useTaskStore } from "@/lib/task-store"

export function TaskStoreInitializer() {
  const loadTasks = useTaskStore((state) => state.loadTasks)

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  return null
}
