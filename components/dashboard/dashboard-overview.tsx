"use client";
import { AdvancedAnalytics } from "@/components/dashboard/advanced-analytics";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { WelcomeHeader } from "@/components/dashboard/welcome-header";
import { TaskAnalyticsAdvanced } from "@/components/dashboard/task-analytics-advanced";
import { CalendarView } from "@/components/dashboard/calendar-view";
import { DragDropTasks } from "@/components/dashboard/drag-drop-tasks";
import { TaskTemplates } from "@/components/dashboard/task-templates";

interface DashboardOverviewProps {
  userName: string;
}

export function DashboardOverview({ userName }: DashboardOverviewProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-8 space-y-8">
        <WelcomeHeader userName={userName} />
        <TaskAnalyticsAdvanced />
        <CalendarView />
        <DragDropTasks />
      
        <AdvancedAnalytics />
        <TaskTemplates />
        <RecentActivity />
      </div>
    </div>
  );
}
