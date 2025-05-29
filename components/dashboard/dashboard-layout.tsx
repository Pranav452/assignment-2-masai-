"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { AddTasksPage } from "@/components/dashboard/add-tasks-page"
import { TasksPage } from "@/components/dashboard/tasks-page"
import { SettingsPage } from "@/components/dashboard/settings-page"
import { GradientBackground } from "@/components/ui/gradient-background"
import { useIsMobile } from "@/components/ui/use-mobile"

interface DashboardLayoutProps {
  userName: string
}

export type PageType = "overview" | "add-tasks" | "tasks" | "settings"

export function DashboardLayout({ userName }: DashboardLayoutProps) {
  const [currentPage, setCurrentPage] = useState<PageType>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()

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
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        userName={userName}
        isOpen={sidebarOpen}
        onOpenChange={setSidebarOpen}
        isMobile={isMobile}
      />
      <main className={`${isMobile ? 'ml-0' : 'ml-80'} overflow-hidden transition-all duration-300`}>
        {renderPage()}
      </main>
    </GradientBackground>
  )
}
