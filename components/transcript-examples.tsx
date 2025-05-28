"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, FileText } from "lucide-react"
import { toast } from "sonner"

const transcriptExamples = [
  {
    title: "Team Meeting",
    content: `Aman needs to finish the homepage by tonight.
Rajeev should meet with the client Tuesday at 11am.
Sarah will review the new designs by Friday P1.
Dev team standup tomorrow 9am.`,
  },
  {
    title: "Project Planning",
    content: `John will handle the database migration by Wednesday P2.
Lisa needs to update the documentation this week.
Call the vendor about pricing tomorrow 2pm P1.
Schedule team retrospective for next Friday.`,
  },
  {
    title: "Client Call Notes",
    content: `Follow up with client about requirements by Monday.
Prepare demo for stakeholder meeting Thursday 3pm P1.
Update project timeline and send to team.
Review contract terms with legal team P2.`,
  },
]

interface TranscriptExamplesProps {
  onSelectExample: (content: string) => void
}

export function TranscriptExamples({ onSelectExample }: TranscriptExamplesProps) {
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Copied to clipboard!")
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-muted-foreground">Try these examples:</h4>
      <div className="grid gap-3">
        {transcriptExamples.map((example, index) => (
          <Card key={index} className="text-left">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-3 w-3" />
                {example.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground mb-3 line-clamp-3">{example.content}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onSelectExample(example.content)}
                  className="text-xs h-7"
                >
                  Use Example
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(example.content)}
                  className="text-xs h-7"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
