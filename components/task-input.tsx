"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Loader2 } from "lucide-react"
import { useTaskStore } from "@/lib/task-store"
import { parseTaskWithAI } from "@/lib/ai-parser"
import { toast } from "sonner"

export function TaskInput() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { addTask } = useTaskStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const parsedTask = await parseTaskWithAI(input)
      addTask(parsedTask)
      setInput("")
      toast.success("Task added successfully!")
    } catch (error) {
      toast.error("Couldn't parse task. Please rephrase and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl mx-auto">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g., 'Call Devansh tomorrow 4pm P2' or 'Finish homepage by tonight'"
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !input.trim()}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Add Task
      </Button>
    </form>
  )
}
