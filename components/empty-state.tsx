import { Brain, Plus } from "lucide-react"

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <Brain className="h-12 w-12 text-slate-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-slate-900">No tasks yet</h3>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        Start by adding a task above. Try natural language like "Call John tomorrow at 3pm P1" or paste a meeting
        transcript to extract multiple tasks.
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
        <Plus className="h-4 w-4" />
        <span>Use the input above to get started</span>
      </div>
    </div>
  )
}
