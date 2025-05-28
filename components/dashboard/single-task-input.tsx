"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Loader2, Sparkles } from "lucide-react"
import { useTaskStore } from "@/lib/task-store"
import { parseTaskWithAI } from "@/lib/ai-parser"
import { toast } from "sonner"

export function SingleTaskInput() {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 'Call Devansh tomorrow 4pm P2' or 'Review designs by Friday'"
            className="pr-10"
            disabled={isLoading}
          />
          <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        </Button>
      </div>

      <div className="text-sm text-slate-500">
        <strong>Try:</strong> "Team meeting tomorrow 2pm", "Call client by Friday P1", "Review Sarah's design"
      </div>
    </form>
  )
}
