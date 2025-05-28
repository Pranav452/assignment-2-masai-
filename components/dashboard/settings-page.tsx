"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Palette, Database, Download, Upload, Trash2 } from "lucide-react"
import { useState } from "react"
import { useTaskStore } from "@/lib/task-store"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface SettingsPageProps {
  userName: string
}

export function SettingsPage({ userName }: SettingsPageProps) {
  const { tasks, addTasks } = useTaskStore()
  const [newName, setNewName] = useState(userName)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const handleNameUpdate = () => {
    if (newName.trim() && newName !== userName) {
      localStorage.setItem("Flowtask Ai_user", newName.trim())
      toast.success("Name updated successfully!")
      setTimeout(() => window.location.reload(), 1000)
    }
  }

  const handleExportData = () => {
    const data = {
      user: userName,
      tasks: tasks,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Flowtask Ai-tasks-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Data exported successfully!")
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.tasks && Array.isArray(data.tasks)) {
          addTasks(data.tasks)  
          toast.success(`Imported ${data.tasks.length} tasks successfully!`)
        } else {
          toast.error("Invalid file format")
        }
      } catch (error) {
        toast.error("Error reading file")
      }
    }
    reader.readAsText(file)
  }

  const handleClearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.clear()
      toast.success("All data cleared successfully!")
      setTimeout(() => window.location.reload(), 1000)
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-purple-50 border-none shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-slate-600 rounded-3xl flex items-center justify-center shadow-lg">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Settings
                  </h1>
                  <p className="text-xl text-slate-600 mt-2">Customize your Flowtask Ai experience</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-600" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <div className="flex gap-2">
                    <Input
                      id="name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter your name"
                    />
                    <Button onClick={handleNameUpdate} disabled={!newName.trim() || newName === userName}>
                      Update
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">Notifications</Label>
                    <p className="text-sm text-slate-500">Receive task reminders and updates</p>
                  </div>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkmode">Dark Mode</Label>
                    <p className="text-sm text-slate-500">Switch to dark theme</p>
                  </div>
                  <Switch id="darkmode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-green-600" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700">{tasks.length}</div>
                    <div className="text-sm text-blue-600">Total Tasks</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="text-2xl font-bold text-green-700">
                      {Math.round((JSON.stringify(tasks).length / 1024) * 100) / 100}KB
                    </div>
                    <div className="text-sm text-green-600">Data Size</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button onClick={handleExportData} className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>

                  <div>
                    <input type="file" accept=".json" onChange={handleImportData} className="hidden" id="import-file" />
                    <Button
                      onClick={() => document.getElementById("import-file")?.click()}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import Data
                    </Button>
                  </div>

                  <Button onClick={handleClearAllData} variant="destructive" className="w-full justify-start">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-purple-600" />
                AI Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">AI Model</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Gemini 1.5 Flash
                      </Badge>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">API Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? "Connected" : "Fallback Mode"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Processing Speed</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Fast
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Accuracy</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        High Precision
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
