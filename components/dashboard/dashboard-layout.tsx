"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { AddTasksPage } from "@/components/dashboard/add-tasks-page"
import { TasksPage } from "@/components/dashboard/tasks-page"
import { SettingsPage } from "@/components/dashboard/settings-page"
import { GradientBackground } from "@/components/ui/gradient-background"

interface DashboardLayoutProps {
  userName: string
}

export type PageType = "overview" | "add-tasks" | "tasks" | "settings"

export function DashboardLayout({ userName }: DashboardLayoutProps) {
  const [currentPage, setCurrentPage] = useState<PageType>("overview")

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <DashboardOverview userName={userName} />
      case "add-tasks":
        return <AddTasksPage />
      case "tasks":
        return <TasksPage />
      case "settings":
        return <SettingsPage userName={userName} />
      default:
        return <DashboardOverview userName={userName} />
    }
  }

  return (
    <GradientBackground>
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} userName={userName} />
      <main className="ml-80 overflow-hidden">{renderPage()}</main>
    </GradientBackground>
  )
}
