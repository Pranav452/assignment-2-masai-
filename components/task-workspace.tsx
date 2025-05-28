"use client"
import { TaskInput } from "@/components/task-input"
import { TranscriptInput } from "@/components/transcript-input"
import { TaskBoard } from "@/components/task-board"
import { useTaskStore } from "@/lib/task-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TaskWorkspace() {
  const { tasks } = useTaskStore()

  return (
    <section id="workspace" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Smart Workspace</h2>
          <p className="text-muted-foreground">Add tasks naturally or parse meeting transcripts with AI</p>
        </div>

        <div className="space-y-8">
          {/* Input Section */}
          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="single">Single Task</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="mt-6">
              <TaskInput />
            </TabsContent>

            <TabsContent value="transcript" className="mt-6">
              <TranscriptInput />
            </TabsContent>
          </Tabs>

          {/* Task Board */}
          <TaskBoard />
        </div>
      </div>
    </section>
  )
}
