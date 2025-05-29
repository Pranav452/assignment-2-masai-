"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Task } from "@/lib/types"
import { useTaskStore } from "@/lib/task-store"
import { format } from "date-fns"

interface EditTaskDialogProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  const [description, setDescription] = useState(task.description)
  const [assignee, setAssignee] = useState(task.assignee || "")
  const [deadline, setDeadline] = useState(task.deadline ? format(new Date(task.deadline), "yyyy-MM-dd'T'HH:mm") : "")
  const [priority, setPriority] = useState(task.priority)

  const { updateTask } = useTaskStore()

  const handleSave = () => {
    updateTask(task.id, {
      description,
      assignee: assignee || undefined,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      priority,
    })
    onOpenChange(false)
  }

  const handleCancel = () => {
    // Reset form
    setDescription(task.description)
    setAssignee(task.assignee || "")
    setDeadline(task.deadline ? format(new Date(task.deadline), "yyyy-MM-dd'T'HH:mm") : "")
    setPriority(task.priority)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-w-[90vw] mx-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg sm:text-xl">Edit Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-5">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Task Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee" className="text-sm font-medium">Assignee</Label>
            <Input
              id="assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Enter assignee name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-sm font-medium">Deadline</Label>
            <Input 
              id="deadline" 
              type="datetime-local" 
              value={deadline} 
              onChange={(e) => setDeadline(e.target.value)} 
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
            <Select value={priority} onValueChange={(value: "P1" | "P2" | "P3" | "P4") => setPriority(value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="P1">P1 - Critical</SelectItem>
                <SelectItem value="P2">P2 - High</SelectItem>
                <SelectItem value="P3">P3 - Medium</SelectItem>
                <SelectItem value="P4">P4 - Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1 w-full sm:w-auto">
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex-1 w-full sm:w-auto">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
