# Flowtask Ai Smart TaskBoard

Transform conversations into action with AI-powered task management.

## Features

- 🤖 **AI-Powered Task Parsing** - Natural language input like "Call John tomorrow at 3pm P1"
- 📋 **Meeting Transcript Processing** - Extract action items from meeting notes
- ⚡ **Smart Priority Detection** - Automatic priority assignment (P1-P4)
- 👥 **Assignee Recognition** - Detect person names from task descriptions
- 📅 **Deadline Extraction** - Parse dates and times from natural language
- 🎯 **Fallback Mode** - Works without AI for basic task management

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set up Gemini AI (Optional but recommended):**
   - Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a `.env.local` file in the root directory:
     ```
     NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
     ```
   - See [GEMINI_SETUP.md](./GEMINI_SETUP.md) for detailed instructions

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Usage Examples

### Natural Language Task Input
```
"Email Sarah about the project timeline tomorrow at 2pm P1"
"Review John's proposal by Friday"
"Schedule team meeting next week P2"
```

### Meeting Transcript Processing
Paste meeting notes and extract action items automatically:
```
Team standup notes:
- John needs to finish the homepage by Friday P1
- Sarah should call the client about pricing
- Review designs by Thursday
- Schedule follow-up meeting for Monday
```

## AI Status

The app shows your AI status in two places:
- **Sidebar**: "AI Status" section shows current configuration
- **Bottom Right**: Status indicator shows "Gemini AI Active" or "Fallback Mode"

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom gradients
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand
- **AI Integration**: Google Gemini 1.5 Flash
- **TypeScript**: Full type safety

## Development

The project is structured for easy development:
- `/app` - Next.js app directory
- `/components` - Reusable UI components
- `/lib` - Utilities and stores
- `/hooks` - Custom React hooks

All features work in fallback mode without AI integration.

## License

MIT License - feel free to use this project as a starting point for your own task management solutions. 