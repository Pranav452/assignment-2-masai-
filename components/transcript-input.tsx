"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Loader2 } from "lucide-react"
import { useTaskStore } from "@/lib/task-store"
import { parseTranscriptWithAI } from "@/lib/ai-parser"
import { TranscriptExamples } from "@/components/transcript-examples"
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
        toast.warning("No tasks found in the transcript. Try adding more specific action items.")
      }
    } catch (error) {
      toast.error("Couldn't parse transcript. Please check the format and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectExample = (content: string) => {
    setTranscript(content)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Input */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste meeting notes or conversation here...&#10;&#10;Example:&#10;Aman finish homepage by tonight.&#10;Rajeev meet client Tuesday 11am.&#10;Sarah review designs by Friday P1."
              className="min-h-40"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !transcript.trim()} className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
              Parse Transcript
            </Button>
          </form>
        </div>

        {/* Examples Sidebar */}
        <div className="md:col-span-1">
          <TranscriptExamples onSelectExample={handleSelectExample} />
        </div>
      </div>
    </div>
  )
}
