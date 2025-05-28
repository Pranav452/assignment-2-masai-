"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Keyboard, Command } from "lucide-react"
import { toast } from "sonner"

const shortcuts = [
  { key: "Ctrl + N", description: "Add new task", action: "new-task" },
  { key: "Ctrl + F", description: "Search tasks", action: "search" },
  { key: "Ctrl + 1", description: "Go to Overview", action: "overview" },
  { key: "Ctrl + 2", description: "Go to Add Tasks", action: "add-tasks" },
  { key: "Ctrl + 3", description: "Go to Your Tasks", action: "tasks" },
  { key: "Ctrl + 4", description: "Go to Settings", action: "settings" },
  { key: "Ctrl + K", description: "Command palette", action: "command" },
  { key: "Escape", description: "Close modals", action: "escape" },
]

export function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "n":
            event.preventDefault()
            toast.info("🚀 Navigate to Add Tasks page to create a new task!")
            break
          case "f":
            event.preventDefault()
            const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
            if (searchInput) {
              searchInput.focus()
              toast.success("🔍 Search activated!")
            }
            break
          case "1":
            event.preventDefault()
            window.dispatchEvent(new CustomEvent("navigate", { detail: "overview" }))
            toast.success("📊 Switched to Overview")
            break
          case "2":
            event.preventDefault()
            window.dispatchEvent(new CustomEvent("navigate", { detail: "add-tasks" }))
            toast.success("➕ Switched to Add Tasks")
            break
          case "3":
            event.preventDefault()
            window.dispatchEvent(new CustomEvent("navigate", { detail: "tasks" }))
            toast.success("✅ Switched to Your Tasks")
            break
          case "4":
            event.preventDefault()
            window.dispatchEvent(new CustomEvent("navigate", { detail: "settings" }))
            toast.success("⚙️ Switched to Settings")
            break
          case "k":
            event.preventDefault()
            toast.info("⌨️ Command palette coming soon!")
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-3">
          <Keyboard className="h-6 w-6 text-purple-600" />
          Keyboard Shortcuts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200/50 hover:shadow-md transition-all duration-200"
            >
              <span className="text-slate-700 font-medium">{shortcut.description}</span>
              <Badge variant="secondary" className="font-mono text-xs bg-slate-200 text-slate-800">
                {shortcut.key.replace("Ctrl", "⌘")}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
          <div className="flex items-center gap-2 mb-2">
            <Command className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-blue-900">Pro Tip</span>
          </div>
          <p className="text-sm text-blue-700">
            Use keyboard shortcuts to navigate faster and boost your productivity! All shortcuts are active and ready to
            use.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
