"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Play, Sparkles } from "lucide-react"

const demoExamples = [
  {
    input: "Call Devansh tomorrow 4pm P2",
    output: {
      description: "Call Devansh",
      assignee: "Devansh",
      deadline: "Tomorrow 4:00 PM",
      priority: "P2",
    },
  },
  {
    input: "Review Sarah's design by Friday P1",
    output: {
      description: "Review design",
      assignee: "Sarah",
      deadline: "Friday",
      priority: "P1",
    },
  },
  {
    input: "Team standup meeting Monday 9am",
    output: {
      description: "Team standup meeting",
      assignee: null,
      deadline: "Monday 9:00 AM",
      priority: "P3",
    },
  },
]

export function AIDemoSection() {
  const [activeDemo, setActiveDemo] = useState(0)

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">See AI Parsing in Action</h2>
          <p className="text-muted-foreground">Watch how natural language gets transformed into structured tasks</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Input Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Try these examples:</h3>
            {demoExamples.map((example, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  activeDemo === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveDemo(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Natural Language Input</span>
                  </div>
                  <p className="font-mono text-sm bg-muted p-2 rounded">"{example.input}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Output Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Parsed Result:</h3>
            <Card className="border-2 border-dashed border-primary/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Play className="h-4 w-4 text-green-600" />
                  Structured Task
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Description:</span>
                  <p className="font-medium">{demoExamples[activeDemo].output.description}</p>
                </div>

                {demoExamples[activeDemo].output.assignee && (
                  <div>
                    <span className="text-sm text-muted-foreground">Assignee:</span>
                    <p className="font-medium">{demoExamples[activeDemo].output.assignee}</p>
                  </div>
                )}

                {demoExamples[activeDemo].output.deadline && (
                  <div>
                    <span className="text-sm text-muted-foreground">Deadline:</span>
                    <p className="font-medium">{demoExamples[activeDemo].output.deadline}</p>
                  </div>
                )}

                <div>
                  <span className="text-sm text-muted-foreground">Priority:</span>
                  <Badge variant="secondary" className="ml-2">
                    {demoExamples[activeDemo].output.priority}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
