"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { TaskInput } from "@/components/dashboard/task-input"
import { TaskViews } from "@/components/dashboard/task-views"
import { AnalyticsSection } from "@/components/dashboard/analytics-section"

interface DashboardProps {
  userName: string
}

export function Dashboard({ userName }: DashboardProps) {
  const [viewMode, setViewMode] = useState<"list" | "cards">("cards")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader userName={userName} />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <DashboardStats />
        <TaskInput />
        <TaskViews viewMode={viewMode} onViewModeChange={setViewMode} />
        <AnalyticsSection />
      </div>
    </div>
  )
}
