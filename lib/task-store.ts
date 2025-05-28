"use client"

import { create } from "zustand"
import type { Task, ParsedTask } from "./types"

interface TaskStore {
  tasks: Task[]
  addTask: (parsedTask: ParsedTask) => void
  addTasks: (parsedTasks: ParsedTask[]) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  loadTasks: () => void
}

const STORAGE_KEY = "Flowtask Ai_tasks"

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  addTask: (parsedTask) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...parsedTask,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    const updatedTasks = [...get().tasks, newTask]
    set({ tasks: updatedTasks })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
  },

  addTasks: (parsedTasks) => {
    const newTasks: Task[] = parsedTasks.map((parsedTask) => ({
      id: crypto.randomUUID(),
      ...parsedTask,
      completed: false,
      createdAt: new Date().toISOString(),
    }))

    const updatedTasks = [...get().tasks, ...newTasks]
    set({ tasks: updatedTasks })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
  },

  updateTask: (id, updates) => {
    const updatedTasks = get().tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    set({ tasks: updatedTasks })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
  },

  deleteTask: (id) => {
    const updatedTasks = get().tasks.filter((task) => task.id !== id)
    set({ tasks: updatedTasks })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
  },

  loadTasks: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const tasks = JSON.parse(stored)
          set({ tasks })
        } catch (error) {
          console.error("Failed to load tasks from localStorage:", error)
        }
      }
    }
  },
}))
