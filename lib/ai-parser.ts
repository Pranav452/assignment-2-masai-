import type { ParsedTask } from "./types"

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

// Check if API key is properly configured
function isApiKeyConfigured(): boolean {
  const isConfigured = !!(GEMINI_API_KEY && GEMINI_API_KEY !== "your_gemini_api_key_here" && GEMINI_API_KEY.length > 10)
  console.log("API Key Check:", {
    exists: !!GEMINI_API_KEY,
    isNotPlaceholder: GEMINI_API_KEY !== "your_gemini_api_key_here",
    hasCorrectLength: GEMINI_API_KEY && GEMINI_API_KEY.length > 10,
    finalResult: isConfigured
  })
  return isConfigured
}

export async function parseTaskWithAI(input: string): Promise<ParsedTask> {
  console.log("Starting AI parsing for input:", input)
  console.log("API key configured:", isApiKeyConfigured())
  console.log("API key length:", GEMINI_API_KEY?.length || 0)
  
  if (!isApiKeyConfigured()) {
    console.warn("Gemini API key not configured, using fallback parsing")
    return parseTaskFallback(input)
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Parse this natural language task into structured data. Return ONLY a valid JSON object with these exact fields:
            - description: string (the main task, clean and concise)
            - assignee: string or null (person's name if mentioned, null if not)
            - deadline: string or null (ISO date string if date/time mentioned, null if not)
            - priority: "P1" | "P2" | "P3" | "P4" (P1=Critical, P2=High, P3=Medium, P4=Low, default P3)

            Current date/time for reference: ${new Date().toISOString()}

            Input: "${input}"
            
            Examples:
            "Call John tomorrow 3pm P1" → {"description": "Call John", "assignee": "John", "deadline": "2024-01-15T15:00:00.000Z", "priority": "P1"}
            "Finish homepage by tonight" → {"description": "Finish homepage", "assignee": null, "deadline": "2024-01-14T23:59:59.000Z", "priority": "P3"}
            "Review Sarah's design P2" → {"description": "Review design", "assignee": "Sarah", "deadline": null, "priority": "P2"}
            
            Return only the JSON object, no other text.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 200,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Gemini API error (${response.status}):`, errorText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    console.log("Full API response:", JSON.stringify(data, null, 2))
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text

    console.log("Extracted content:", content)
    
    if (content) {
      console.log("AI Response content:", content.substring(0, 200) + (content.length > 200 ? "..." : ""))
      const cleanContent = content.trim().replace(/```json\n?|\n?```/g, "")
      console.log("Cleaned content:", cleanContent.substring(0, 200) + (cleanContent.length > 200 ? "..." : ""))
      
      // Try multiple approaches to extract valid JSON
      let parsed: any = null
      
      // First try: direct parsing if it looks like pure JSON
      try {
        if (cleanContent.startsWith('{') && cleanContent.endsWith('}')) {
          parsed = JSON.parse(cleanContent)
          console.log("Successfully parsed JSON (direct method)")
        }
      } catch (e) {
        console.log("Direct parsing failed:", e)
        // Continue to other methods
      }
      
      // Second try: extract JSON object using regex
      if (!parsed) {
        try {
          const jsonMatch = cleanContent.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0])
            console.log("Successfully parsed JSON (regex method)")
          }
        } catch (e) {
          console.log("Regex parsing failed:", e)
          // Continue to other methods
        }
      }
      
      // Third try: find first { and last } and extract between them
      if (!parsed) {
        try {
          const firstBrace = cleanContent.indexOf('{')
          const lastBrace = cleanContent.lastIndexOf('}')
          if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
            const jsonString = cleanContent.substring(firstBrace, lastBrace + 1)
            console.log("Attempting to parse extracted JSON:", jsonString.substring(0, 100) + "...")
            parsed = JSON.parse(jsonString)
            console.log("Successfully parsed JSON (extraction method)")
          }
        } catch (e) {
          console.log("Extraction parsing failed:", e)
          // Continue to fallback
        }
      }
      
      // Fourth try: clean up common AI formatting issues and try again
      if (!parsed) {
        try {
          let cleanedContent = cleanContent
            .replace(/```json|```/g, '') // Remove any remaining code blocks
            .replace(/^[^{]*/, '') // Remove any text before first {
            .replace(/[^}]*$/, '') // Remove any text after last }
            .replace(/\n/g, ' ') // Replace newlines with spaces
            .replace(/\s+/g, ' ') // Collapse multiple spaces
            .trim()
          
          if (cleanedContent.startsWith('{') && cleanedContent.endsWith('}')) {
            console.log("Attempting to parse cleaned JSON:", cleanedContent.substring(0, 100) + "...")
            parsed = JSON.parse(cleanedContent)
            console.log("Successfully parsed JSON (cleanup method)")
          }
        } catch (e) {
          console.log("Cleanup parsing failed:", e)
          // Continue to fallback
        }
      }

      if (parsed) {
        return {
          description: parsed.description || input.trim(),
          assignee: parsed.assignee || undefined,
          deadline: parsed.deadline || undefined,
          priority: ["P1", "P2", "P3", "P4"].includes(parsed.priority) ? parsed.priority : "P3",
        }
      }
    }

    console.warn("No valid content found in AI response, using fallback")
    return parseTaskFallback(input)
  } catch (error) {
    console.error("AI parsing failed, using fallback:", error)
    return parseTaskFallback(input)
  }
}

export async function parseTranscriptWithAI(transcript: string): Promise<ParsedTask[]> {
  if (!isApiKeyConfigured()) {
    console.warn("Gemini API key not configured, using fallback parsing")
    return parseTranscriptFallback(transcript)
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Extract all actionable tasks from this meeting transcript or conversation. Return ONLY a valid JSON array of task objects.

            Each task object must have these exact fields:
            - description: string (clear, actionable task description)
            - assignee: string or null (person's name if mentioned)
            - deadline: string or null (ISO date string if date/time mentioned)
            - priority: "P1" | "P2" | "P3" | "P4" (infer from urgency, default P3)

            Current date/time for reference: ${new Date().toISOString()}

            Look for:
            - Action items and assignments
            - Deadlines and due dates
            - Priority indicators (urgent, ASAP, etc.)
            - Names of people responsible

            Transcript: "${transcript}"
            
            Return only the JSON array, no other text. If no tasks found, return [].`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1000,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    console.log("Full API response:", JSON.stringify(data, null, 2))
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text

    console.log("Extracted content:", content)
    
    if (content) {
      const cleanContent = content.trim().replace(/```json\n?|\n?```/g, "")
      
      // Try multiple approaches to extract valid JSON array
      let parsed: any = null
      
      // First try: direct parsing if it looks like pure JSON array
      try {
        if (cleanContent.startsWith('[') && cleanContent.endsWith(']')) {
          parsed = JSON.parse(cleanContent)
        }
      } catch (e) {
        // Continue to other methods
      }
      
      // Second try: extract JSON array using regex
      if (!parsed) {
        try {
          const jsonMatch = cleanContent.match(/\[[\s\S]*\]/)
          if (jsonMatch) {
            parsed = JSON.parse(jsonMatch[0])
          }
        } catch (e) {
          // Continue to other methods
        }
      }
      
      // Third try: find first [ and last ] and extract between them
      if (!parsed) {
        try {
          const firstBracket = cleanContent.indexOf('[')
          const lastBracket = cleanContent.lastIndexOf(']')
          if (firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket) {
            const jsonString = cleanContent.substring(firstBracket, lastBracket + 1)
            parsed = JSON.parse(jsonString)
          }
        } catch (e) {
          // Continue to fallback
        }
      }

      if (parsed && Array.isArray(parsed)) {
        return parsed.map((task: any) => ({
          description: task.description || "Untitled task",
          assignee: task.assignee || undefined,
          deadline: task.deadline || undefined,
          priority: ["P1", "P2", "P3", "P4"].includes(task.priority) ? task.priority : "P3",
        }))
      }
    }

    throw new Error("No valid JSON array found in AI response")
  } catch (error) {
    console.error("AI transcript parsing failed, using fallback:", error)
    return parseTranscriptFallback(transcript)
  }
}

// Enhanced fallback parsing functions
function parseTaskFallback(input: string): ParsedTask {
  const priorityMatch = input.match(/P([1-4])/i)
  const priority = priorityMatch ? (`P${priorityMatch[1]}` as "P1" | "P2" | "P3" | "P4") : "P3"

  const nameMatches = input.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g)
  const assignee = nameMatches && nameMatches.length > 0 ? nameMatches[0] : undefined

  let deadline: string | undefined
  const timeMatch = input.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i)
  const dateMatch = input.match(/(today|tomorrow|tonight|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i)

  if (timeMatch || dateMatch) {
    const date = new Date()

    if (dateMatch) {
      const dateStr = dateMatch[1].toLowerCase()
      if (dateStr === "tomorrow") {
        date.setDate(date.getDate() + 1)
      } else if (dateStr === "tonight") {
        date.setHours(23, 59, 59)
      }
    }

    if (timeMatch) {
      const hour = Number.parseInt(timeMatch[1])
      const minute = timeMatch[2] ? Number.parseInt(timeMatch[2]) : 0
      const isPM = timeMatch[3].toLowerCase() === "pm"
      const adjustedHour = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour

      date.setHours(adjustedHour, minute, 0, 0)
    }

    deadline = date.toISOString()
  }

  let description = input
    .replace(/P[1-4]/gi, "")
    .replace(/\d{1,2}(?::\d{2})?\s*(am|pm)/gi, "")
    .replace(/(today|tomorrow|tonight|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi, "")
    .trim()

  if (assignee && description.toLowerCase().startsWith(assignee.toLowerCase())) {
    description = description.substring(assignee.length).trim()
  }

  return {
    description: description || input.trim(),
    assignee,
    deadline,
    priority,
  }
}

function parseTranscriptFallback(transcript: string): ParsedTask[] {
  const lines = transcript
    .split(/[.\n]/)
    .map((line) => line.trim())
    .filter((line) => line.length > 5)

  return lines.map((line) => parseTaskFallback(line))
}
