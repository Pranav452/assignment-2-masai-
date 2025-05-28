"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SingleTaskInput } from "@/components/dashboard/single-task-input"
import { TranscriptInput } from "@/components/dashboard/transcript-input"
import { BulkTaskInput } from "@/components/dashboard/bulk-task-input"
import { Plus, FileText, List, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function AddTasksPage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-purple-50 border-none shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-lg">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-green-900 bg-clip-text text-transparent">
                    Add New Tasks
                  </h1>
                  <p className="text-xl text-slate-600 mt-2">
                    Create tasks using natural language, transcripts, or bulk import
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Task Input Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                <Sparkles className="h-6 w-6 text-green-600" />
                Choose Your Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="single" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-slate-100/80 backdrop-blur-sm h-14">
                  <TabsTrigger value="single" className="flex items-center gap-2 text-sm font-medium">
                    <Plus className="h-4 w-4" />
                    Single Task
                  </TabsTrigger>
                  <TabsTrigger value="transcript" className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="h-4 w-4" />
                    Transcript
                  </TabsTrigger>
                  <TabsTrigger value="bulk" className="flex items-center gap-2 text-sm font-medium">
                    <List className="h-4 w-4" />
                    Bulk Import
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="single" className="space-y-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-900">Natural Language Input</CardTitle>
                      <p className="text-blue-700">
                        Just type naturally and let AI parse your task with assignees, deadlines, and priorities
                      </p>
                    </CardHeader>
                    <CardContent>
                      <SingleTaskInput />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transcript" className="space-y-6">
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-900">Meeting Transcript Parser</CardTitle>
                      <p className="text-purple-700">
                        Paste meeting notes or conversations and extract multiple tasks automatically
                      </p>
                    </CardHeader>
                    <CardContent>
                      <TranscriptInput />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bulk" className="space-y-6">
                  <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-orange-900">Bulk Task Import</CardTitle>
                      <p className="text-orange-700">Import multiple tasks at once with structured format</p>
                    </CardHeader>
                    <CardContent>
                      <BulkTaskInput />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
