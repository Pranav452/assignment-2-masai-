"use client"

import { Badge } from "@/components/ui/badge"
import { Brain, Zap, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

export function AIStatusIndicator() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if API key is available and properly configured
    const checkApiKey = () => {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      setHasApiKey(!!(apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.length > 10))
      setIsLoading(false)
    }
    
    checkApiKey()
  }, [])

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
          <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          Loading...
        </Badge>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge 
        variant={hasApiKey ? "default" : "destructive"} 
        className={`flex items-center gap-2 px-3 py-2 ${
          hasApiKey 
            ? "bg-green-600 hover:bg-green-700 border-green-500" 
            : "bg-orange-600 hover:bg-orange-700 border-orange-500"
        }`}
      >
        {hasApiKey ? (
          <>
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
            <Brain className="h-4 w-4" />
            <span className="font-medium">Gemini AI Active</span>
          </>
        ) : (
          <>
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">Fallback Mode</span>
          </>
        )}
      </Badge>
    </div>
  )
}
