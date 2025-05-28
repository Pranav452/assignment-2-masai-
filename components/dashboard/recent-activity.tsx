"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTaskStore } from "@/lib/task-store"
import { Activity, CheckCircle, Plus, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { useState } from "react"

export function RecentActivity() {
  const { tasks } = useTaskStore()
  const [showAll, setShowAll] = useState(false)

  const ITEMS_PER_PAGE = 6

  // Generate recent activity from tasks
  const recentActivity = tasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20) // Get more items for pagination
    .map((task) => ({
      id: task.id,
      type: task.completed ? "completed" : "created",
      description: task.description,
      assignee: task.assignee,
      priority: task.priority,
      timestamp: task.createdAt,
    }))

  // Pagination for view more functionality
  const displayedActivity = showAll ? recentActivity : recentActivity.slice(0, ITEMS_PER_PAGE)
  const hasMoreActivity = recentActivity.length > ITEMS_PER_PAGE

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completed":
        return CheckCircle
      case "created":
        return Plus
      case "edited":
        return Edit
      case "deleted":
        return Trash2
      default:
        return Activity
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "completed":
        return "text-green-600 bg-green-100"
      case "created":
        return "text-blue-600 bg-blue-100"
      case "edited":
        return "text-orange-600 bg-orange-100"
      case "deleted":
        return "text-red-600 bg-red-100"
      default:
        return "text-slate-600 bg-slate-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "P1":
        return "bg-red-500"
      case "P2":
        return "bg-orange-500"
      case "P3":
        return "bg-yellow-500"
      case "P4":
        return "bg-green-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <Card id="analytics" className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-3 text-slate-900">
          <Activity className="h-6 w-6 text-indigo-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayedActivity.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedActivity.map((activity, index) => {
              const Icon = getActivityIcon(activity.type)
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200/50 hover:shadow-md transition-all duration-200"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-slate-900 truncate">
                        {activity.type === "completed" ? "Completed" : "Created"}: {activity.description}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`${getPriorityColor(activity.priority)} text-white text-xs`}
                      >
                        {activity.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      {activity.assignee && (
                        <>
                          <span>Assigned to {activity.assignee}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>{format(new Date(activity.timestamp), "MMM d, h:mm a")}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
        
        {/* View More Button */}
        {hasMoreActivity && !showAll && (
          <div className="flex justify-center mt-6 pt-4 border-t border-slate-200">
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 hover:from-indigo-100 hover:to-blue-100 text-indigo-700 hover:text-indigo-800"
            >
              View More ({recentActivity.length - ITEMS_PER_PAGE} more activities)
            </Button>
          </div>
        )}
        
        {/* Show Less Button */}
        {showAll && hasMoreActivity && (
          <div className="flex justify-center mt-6 pt-4 border-t border-slate-200">
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
  )
}
