"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Brain, LayoutDashboard, Plus, CheckSquare, Settings, LogOut, Sparkles, TrendingUp, Zap, Menu, X } from "lucide-react"
import type { PageType } from "./dashboard-layout"
import { useTaskStore } from "@/lib/task-store"
import { NotificationCenter } from "./notification-center"

interface SidebarProps {
  currentPage: PageType
  onPageChange: (page: PageType) => void
  userName: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  isMobile?: boolean
}

export function Sidebar({ currentPage, onPageChange, userName, isOpen = false, onOpenChange, isMobile = false }: SidebarProps) {
  const { tasks } = useTaskStore()

  const pendingTasks = tasks.filter((task) => !task.completed).length
  const highPriorityTasks = tasks.filter((task) => task.priority === "P1" && !task.completed).length

  // Listen for navigation events from keyboard shortcuts
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      onPageChange(event.detail as PageType)
    }

    window.addEventListener("navigate" as any, handleNavigate)
    return () => window.removeEventListener("navigate" as any, handleNavigate)
  }, [onPageChange])

  const handleLogout = () => {
    localStorage.removeItem("Flowtask Ai_user")
    window.location.reload()
  }

  const handlePageChange = (page: PageType) => {
    onPageChange(page)
    if (isMobile && onOpenChange) {
      onOpenChange(false)
    }
  }

  const menuItems = [
    {
      id: "overview" as PageType,
      label: "Overview",
      icon: LayoutDashboard,
      badge: null,
      gradient: "from-blue-500 to-indigo-600",
      shortcut: "⌘1",
    },
    {
      id: "add-tasks" as PageType,
      label: "Add Tasks",
      icon: Plus,
      badge: null,
      gradient: "from-green-500 to-emerald-600",
      shortcut: "⌘2",
    },
    {
      id: "tasks" as PageType,
      label: "Your Tasks",
      icon: CheckSquare,
      badge: pendingTasks > 0 ? pendingTasks : null,
      gradient: "from-purple-500 to-pink-600",
      shortcut: "⌘3",
    },
  ]

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenChange?.(true)}
          className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-md shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
            <div className="fixed left-0 top-0 h-screen w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200/50 flex flex-col shadow-xl overflow-y-auto">
              {/* Mobile Close Button */}
              <div className="flex justify-end p-4">
                <Button variant="ghost" size="sm" onClick={() => onOpenChange?.(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Header */}
              <div className="p-6 border-b border-slate-200/50 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      <Brain className="h-7 w-7 text-white relative z-10" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                        Flowtask Ai
                      </h1>
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-slate-500 font-medium">Smart TaskBoard</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-6 border-b border-slate-200/50 flex-shrink-0">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200/50">
                    <div className="text-2xl font-bold text-green-700">{tasks.length}</div>
                    <div className="text-xs text-green-600 font-medium">Total Tasks</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200/50">
                    <div className="text-2xl font-bold text-orange-700">{highPriorityTasks}</div>
                    <div className="text-xs text-orange-600 font-medium">High Priority</div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex-1 p-6 overflow-y-auto">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "default" : "ghost"}
                      className={`w-full justify-between h-12 text-left font-medium transition-all duration-200 group ${
                        currentPage === item.id
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:shadow-xl`
                          : "hover:bg-slate-100/80 text-slate-700 hover:text-slate-900"
                      }`}
                      onClick={() => handlePageChange(item.id)}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        <span className="flex-1">{item.label}</span>
                      </div>
                    </Button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200/50 flex flex-col shadow-xl overflow-y-auto z-10">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/50 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <Brain className="h-7 w-7 text-white relative z-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Flowtask Ai
              </h1>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-slate-500 font-medium">Smart TaskBoard</span>
              </div>
            </div>
          </div>
          <NotificationCenter />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-b border-slate-200/50 flex-shrink-0">
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Quick Stats
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200/50">
            <div className="text-2xl font-bold text-green-700">{tasks.length}</div>
            <div className="text-xs text-green-600 font-medium">Total Tasks</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200/50">
            <div className="text-2xl font-bold text-orange-700">{highPriorityTasks}</div>
            <div className="text-xs text-orange-600 font-medium">High Priority</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-6 overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "default" : "ghost"}
              className={`w-full justify-between h-12 text-left font-medium transition-all duration-200 group ${
                currentPage === item.id
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:shadow-xl`
                  : "hover:bg-slate-100/80 text-slate-700 hover:text-slate-900"
              }`}
              onClick={() => handlePageChange(item.id)}
            >
              <div className="flex items-center">
                <item.icon className="h-5 w-5 mr-3" />
                <span className="flex-1">{item.label}</span>
              </div>
            </Button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-slate-200/50 flex-shrink-0">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200/50 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-semibold text-slate-700">AI Status</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {process.env.NEXT_PUBLIC_GEMINI_API_KEY && 
               process.env.NEXT_PUBLIC_GEMINI_API_KEY !== "your_gemini_api_key_here" ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-slate-600">Gemini 1.5 Flash Active</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-xs text-slate-600">Fallback Mode</span>
                </>
              )}
            </div>
            {(!process.env.NEXT_PUBLIC_GEMINI_API_KEY || 
              process.env.NEXT_PUBLIC_GEMINI_API_KEY === "your_gemini_api_key_here") && (
              <span className="text-xs text-orange-600 font-medium">Configure API</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
