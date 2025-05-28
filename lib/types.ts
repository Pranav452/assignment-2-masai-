export interface Task {
  id: string
  description: string
  assignee?: string
  deadline?: string // ISO string
  priority: "P1" | "P2" | "P3" | "P4"
  completed: boolean
  createdAt: string
}

export interface ParsedTask {
  description: string
  assignee?: string
  deadline?: string
  priority: "P1" | "P2" | "P3" | "P4"
}
