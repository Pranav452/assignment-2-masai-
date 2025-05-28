"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Loader2, Sparkles } from "lucide-react"
import { useTaskStore } from "@/lib/task-store"
import { parseTranscriptWithAI } from "@/lib/ai-parser"
import { toast } from "sonner"

export function TranscriptInput() {
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { addTasks } = useTaskStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!transcript.trim()) return

    setIsLoading(true)
    try {
      const parsedTasks = await parseTranscriptWithAI(transcript)
      if (parsedTasks.length > 0) {
        addTasks(parsedTasks)
        setTranscript("")
        toast.success(`Added ${parsedTasks.length} tasks from transcript!`)
      } else {
        toast.warning("No tasks found in the transcript.")
      }
    } catch (error) {
      toast.error("Couldn't parse transcript. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = () => {
    setTranscript(`Team meeting tomorrow 2pm with John and Sarah.
John needs to finish the homepage by Friday P1.
Sarah should call the client next week about pricing.
Review the new designs by Thursday.
Schedule follow-up meeting for next Monday.`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste meeting notes or conversation here..."
          className="min-h-32 pr-10"
          disabled={isLoading}
        />
        <Sparkles className="absolute right-3 top-3 h-4 w-4 text-blue-500" />
      </div>

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" size="sm" onClick={handleExampleClick} className="text-xs">
          Try Example
        </Button>

        <Button
          type="submit"
          disabled={isLoading || !transcript.trim()}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              Parse Transcript
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
