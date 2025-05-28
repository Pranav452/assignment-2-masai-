"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SingleTaskInput } from "@/components/dashboard/single-task-input"
import { TranscriptInput } from "@/components/dashboard/transcript-input"
import { Plus, FileText } from "lucide-react"

export function TaskInput() {
  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">Add New Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="single" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Single Task
            </TabsTrigger>
            <TabsTrigger value="transcript" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Transcript
            </TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="mt-6">
            <SingleTaskInput />
          </TabsContent>

          <TabsContent value="transcript" className="mt-6">
            <TranscriptInput />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
