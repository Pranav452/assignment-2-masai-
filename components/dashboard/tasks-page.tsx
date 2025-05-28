"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useTaskStore } from "@/lib/task-store"
import { TaskCard } from "@/components/task-card"
import { TaskListItem } from "@/components/dashboard/task-list-item"
import { Grid3X3, List, Search, Filter, CheckSquare, Clock, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

export function TasksPage() {
  const { tasks } = useTaskStore()
  const [viewMode, setViewMode] = useState<"list" | "cards">("cards")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("created")
  const [showAll, setShowAll] = useState(false)

  const ITEMS_PER_PAGE = 12

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.assignee && task.assignee.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "completed" && task.completed) ||
        (filterStatus === "pending" && !task.completed)
      return matchesSearch && matchesPriority && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { P1: 4, P2: 3, P3: 2, P4: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case "deadline":
          if (!a.deadline && !b.deadline) return 0
          if (!a.deadline) return 1
          if (!b.deadline) return -1
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        case "created":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const pendingTasks = filteredTasks.filter((task) => !task.completed).length
  const completedTasks = filteredTasks.filter((task) => task.completed).length
  const highPriorityTasks = filteredTasks.filter((task) => task.priority === "P1" && !task.completed).length

  // Pagination for view more functionality
  const displayedTasks = showAll ? filteredTasks : filteredTasks.slice(0, ITEMS_PER_PAGE)
  const hasMoreTasks = filteredTasks.length > ITEMS_PER_PAGE

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-purple-50 border-none shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-lg">
                    <CheckSquare className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
                      Your Tasks
                    </h1>
                    <p className="text-xl text-slate-600 mt-2">Manage and organize your tasks efficiently</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-700">{tasks.length}</div>
                  <div className="text-sm text-slate-500">Total Tasks</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Pending Tasks</p>
                  <p className="text-3xl font-bold text-blue-900">{pendingTasks}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Completed</p>
                  <p className="text-3xl font-bold text-green-900">{completedTasks}</p>
                </div>
                <CheckSquare className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700">High Priority</p>
                  <p className="text-3xl font-bold text-red-900">{highPriorityTasks}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-3 text-slate-900">
                <Filter className="h-5 w-5 text-slate-700" />
                Filters & View Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search tasks or assignees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Priority Filter */}
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="P1">P1 - Critical</SelectItem>
                    <SelectItem value="P2">P2 - High</SelectItem>
                    <SelectItem value="P3">P3 - Medium</SelectItem>
                    <SelectItem value="P4">P4 - Low</SelectItem>
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">Date Created</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    variant={viewMode === "cards" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("cards")}
                    className="h-9"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-9"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              {(searchQuery || filterPriority !== "all" || filterStatus !== "all") && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
                  <span className="text-sm text-slate-600">Active filters:</span>
                  {searchQuery && (
                    <Badge variant="secondary" className="gap-1">
                      Search: {searchQuery}
                      <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-red-600">
                        ×
                      </button>
                    </Badge>
                  )}
                  {filterPriority !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      Priority: {filterPriority}
                      <button onClick={() => setFilterPriority("all")} className="ml-1 hover:text-red-600">
                        ×
                      </button>
                    </Badge>
                  )}
                  {filterStatus !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      Status: {filterStatus}
                      <button onClick={() => setFilterStatus("all")} className="ml-1 hover:text-red-600">
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Tasks Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">
                {showAll || !hasMoreTasks 
                  ? `${filteredTasks.length} ${filteredTasks.length === 1 ? "Task" : "Tasks"}`
                  : `Showing ${displayedTasks.length} of ${filteredTasks.length} Tasks`
                }
                {filteredTasks.length !== tasks.length && (
                  <span className="text-slate-500 font-normal"> (filtered from {tasks.length})</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTasks.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-slate-400 mb-4">
                    <CheckSquare className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">No tasks found</h3>
                  <p className="text-slate-500">
                    {tasks.length === 0
                      ? "Add your first task to get started"
                      : "Try adjusting your filters or search query"}
                  </p>
                </div>
              ) : viewMode === "cards" ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {displayedTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <TaskCard task={task} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {displayedTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                    >
                      <TaskListItem task={task} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* View More Button */}
              {hasMoreTasks && !showAll && (
                <div className="flex justify-center mt-8 pt-6 border-t border-slate-200">
                  <Button
                    onClick={() => setShowAll(true)}
                    variant="outline"
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 text-blue-700 hover:text-blue-800"
                  >
                    View More ({filteredTasks.length - ITEMS_PER_PAGE} more tasks)
                  </Button>
                </div>
              )}
              
              {/* Show Less Button */}
              {showAll && hasMoreTasks && (
                <div className="flex justify-center mt-8 pt-6 border-t border-slate-200">
                  <Button
                    onClick={() => setShowAll(false)}
                    variant="outline"
                    className="bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200 hover:from-slate-100 hover:to-gray-100 text-slate-700 hover:text-slate-800"
                  >
                    Show Less
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
