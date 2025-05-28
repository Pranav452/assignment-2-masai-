# Gemini AI Integration Setup

## Getting Your API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Setting Up the Environment Variable

1. Create a `.env.local` file in the root of your project
2. Add the following line to the file:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with the API key you copied from Google AI Studio

## Example .env.local file:
```
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
```

## Features Enabled with Gemini API

When the API key is properly configured, you'll get:

### ✅ AI-Powered Task Parsing
- Natural language input: "Call John tomorrow at 3pm P1"
- Automatic extraction of:
  - Task description
  - Assignee names
  - Deadlines and times
  - Priority levels

### ✅ Meeting Transcript Processing
- Upload meeting transcripts
- Automatic extraction of action items
- Smart assignment detection
- Priority inference from context

### ✅ Fallback Mode
- If no API key is provided, the app will use basic regex parsing
- You'll see "Fallback Mode" indicators in the UI
- Core functionality still works, just without AI enhancement

## Verification

After setting up your API key:

1. Restart your development server (`npm run dev` or `pnpm dev`)
2. Look for "Gemini AI Active" in the sidebar
3. The bottom-right status indicator should show "Gemini AI Active"
4. Try adding a task with natural language like "Email Sarah about the meeting tomorrow at 2pm P1"

## Troubleshooting

- **Still seeing "Fallback Mode"?** 
  - Make sure your `.env.local` file is in the project root
  - Restart your development server
  - Check that your API key doesn't have extra spaces

- **API calls failing?**
  - Verify your API key is valid at Google AI Studio
  - Check browser console for error messages
  - Ensure you have internet connectivity

## Cost Information

- Gemini 1.5 Flash has a generous free tier
- Current usage is very light (small prompts for task parsing)
- Monitor your usage at [Google AI Studio](https://aistudio.google.com) 