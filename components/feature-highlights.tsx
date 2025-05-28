import { MessageSquare, Brain, HardDrive, Edit3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Input",
    description: "Just type or speak naturally. 'Call John tomorrow at 3pm P1' becomes a structured task instantly.",
  },
  {
    icon: Brain,
    title: "AI Transcript Parsing",
    description: "Paste meeting notes or conversations. AI extracts multiple tasks with assignees and deadlines.",
  },
  {
    icon: HardDrive,
    title: "Offline-First Storage",
    description: "Everything saves locally. No internet required after initial load. Your data stays private.",
  },
  {
    icon: Edit3,
    title: "Editable Task Cards",
    description: "Click to edit any task. Drag to reorder. Mark complete. Full control over your workflow.",
  },
]

export function FeatureHighlights() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Task Management</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powered by AI, designed for humans. Transform the way you capture and organize work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
