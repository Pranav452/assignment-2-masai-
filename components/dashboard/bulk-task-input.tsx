"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader2, Download, FileText } from "lucide-react"
import { useTaskStore } from "@/lib/task-store"
import { toast } from "sonner"

export function BulkTaskInput() {
  const [bulkText, setBulkText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { addTasks } = useTaskStore()

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bulkText.trim()) return

    setIsLoading(true)
    try {
      const lines = bulkText.split("\n").filter((line) => line.trim())
      const tasks = lines.map((line) => {
        const parts = line.split("|").map((p) => p.trim())
        return {
          description: parts[0] || line,
          assignee: parts[1] || undefined,
          deadline: parts[2] ? new Date(parts[2]).toISOString() : undefined,
          priority: (parts[3] as "P1" | "P2" | "P3" | "P4") || "P3",
        }
      })

      addTasks(tasks)
      setBulkText("")
      toast.success(`Added ${tasks.length} tasks successfully!`)
    } catch (error) {
      toast.error("Error processing bulk tasks. Please check the format.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = () => {
    setBulkText(`Review project proposal | John | 2024-12-31 | P1
Update documentation | Sarah | 2024-12-30 | P2
Team meeting preparation | | 2024-12-29 | P3
Client follow-up call | Mike | 2024-12-28 | P2`)
  }

  const downloadTemplate = () => {
    const template = `Task Description | Assignee | Deadline (YYYY-MM-DD) | Priority (P1-P4)
Review project proposal | John | 2024-12-31 | P1
Update documentation | Sarah | 2024-12-30 | P2
Team meeting preparation | | 2024-12-29 | P3`

    const blob = new Blob([template], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "task-template.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <form onSubmit={handleBulkSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-900">Bulk Task Format</h4>
            <p className="text-sm text-slate-600">Use format: Task | Assignee | Deadline | Priority (one per line)</p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={downloadTemplate}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Template
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExampleClick}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Example
            </Button>
          </div>
        </div>

        <Textarea
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
          placeholder="Task 1 | John | 2024-12-31 | P1&#10;Task 2 | Sarah | 2024-12-30 | P2&#10;Task 3 | | | P3"
          className="min-h-40 font-mono text-sm"
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading || !bulkText.trim()}
        className="w-full bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 h-12"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Processing Tasks...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Import Tasks
          </>
        )}
      </Button>
    </form>
  )
}
