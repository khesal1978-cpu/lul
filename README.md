
# AI Tutor with Live2D Avatar

An interactive educational web application that combines AI-powered tutoring with an animated Live2D avatar companion. Students can ask questions about Math, Physics, Chemistry, and Biology through a conversational chat interface, enhanced with a responsive animated character.

## Features

- **AI-Powered Tutoring**: Leverages Google Gemini AI for natural, educational responses
- **Live2D Avatar**: Animated companion with state-based animations (idle, listening, thinking, speaking)
- **Subject Support**: Math, Physics, Chemistry, and Biology
- **Responsive Design**: Split-screen on desktop, stacked layout on mobile/tablet
- **Real-time Chat**: Instant AI responses with typing indicators
- **Quick Topics**: Pre-written question suggestions for easy engagement

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Tailwind CSS** with shadcn/ui components
- **Pixi.js** + **pixi-live2d-display** for avatar rendering

### Backend
- **Node.js** with **Express.js**
- **TypeScript** (ESM modules)
- **Google Gemini AI** (gemini-2.0-flash-exp model)
- **PostgreSQL** via Neon Serverless (configured, using in-memory storage currently)
- **Drizzle ORM** for database management

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and query client
│   │   ├── pages/       # Page components
│   │   └── App.tsx      # Main app component
│   └── index.html       # Entry HTML
├── server/              # Backend Express server
│   ├── gemini.ts        # AI integration
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Data storage interface
│   └── index.ts         # Server entry point
├── shared/              # Shared types and schemas
│   └── schema.ts        # Zod validation schemas
└── design_guidelines.md # UI/UX specifications
```

## Getting Started

### Prerequisites
- Node.js 20+
- npm or similar package manager
- Google Gemini API key

### Installation

1. Clone the repository or fork this Repl

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a secret named `GEMINI_API_KEY` with your Google Gemini API key
   - Optionally set `DATABASE_URL` for PostgreSQL connection

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://0.0.0.0:5000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes (Drizzle)

## API Endpoints

### POST `/api/chat`
Send a message to the AI tutor.

**Request Body:**
```json
{
  "message": "Explain quadratic equations"
}
```

**Response:**
```json
{
  "response": "Quadratic equations are polynomial equations..."
}
```

### POST `/api/tts` (Placeholder)
Generate text-to-speech audio for avatar lip sync.

## Key Components

### Frontend Components

- **`Live2DAvatar`** - Renders and manages the Live2D character model
- **`AvatarPanel`** - Container for avatar display with status indicators
- **`ChatInterface`** - Message history display with auto-scroll
- **`MessageInput`** - Text input with send button and keyboard shortcuts
- **`ChatMessage`** - Individual message bubble component
- **`QuickTopicButton`** - Pre-written question suggestions
- **`StatusIndicator`** - Visual state indicator for avatar

### Backend Modules

- **`server/gemini.ts`** - Google Gemini AI client configuration and chat function
- **`server/storage.ts`** - In-memory storage implementation (ready for PostgreSQL migration)
- **`server/routes.ts`** - Express route definitions and HTTP server setup

## Development Guidelines

### Adding New Features

1. **New AI Capabilities**: Modify the system instruction in `server/gemini.ts`
2. **UI Components**: Follow shadcn/ui patterns, place in `client/src/components/`
3. **API Endpoints**: Add routes in `server/routes.ts`, validate with Zod schemas
4. **Database Changes**: Update schema in shared types, create migration with Drizzle Kit

### Code Style

- Use TypeScript for type safety
- Follow existing naming conventions (camelCase for variables/functions, PascalCase for components)
- Validate all API inputs with Zod schemas
- Keep components focused and composable
- Use Tailwind utility classes for styling

### Avatar States

The Live2D avatar responds to these states:
- **idle**: Default breathing animation
- **listening**: Active when user is typing
- **thinking**: Shown while AI generates response
- **speaking**: Plays when AI response is delivered (with mouth sync)

Modify states in `Live2DAvatar.tsx` component.

## Database Migration

Currently using in-memory storage. To migrate to PostgreSQL:

1. Set the `DATABASE_URL` environment variable
2. Update `server/storage.ts` to use Drizzle ORM instead of MemStorage
3. Run `npm run db:push` to apply schema
4. Update route handlers to use new storage implementation

## Deployment

Deploy to Replit for public hosting:

1. Click the **Release** button
2. Select **Deploy** option
3. Configure build and run commands:
   - Build: `npm run build`
   - Run: `npm run start`
4. Add `GEMINI_API_KEY` to deployment secrets
5. Deploy to `<app-name>.replit.app`

## Customization

### Change Avatar Model
1. Place new `.model3.json` file in `client/public/`
2. Update path in `Live2DAvatar.tsx` component
3. Adjust canvas size if needed

### Modify AI Behavior
Edit the system instruction in `server/gemini.ts`:
```typescript
systemInstruction: "Your custom instruction here..."
```

### Add New Subjects
Update quick topics in `ChatInterface.tsx` and adjust AI system instruction.

## Troubleshooting

**Avatar not loading:**
- Check browser console for CORS errors
- Verify model file path is correct
- Ensure Pixi.js canvas is properly sized

**AI responses failing:**
- Verify `GEMINI_API_KEY` is set correctly
- Check API quota limits
- Review server logs for detailed errors

**Build errors:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run check`

## Contributing

When contributing:
1. Follow existing code patterns
2. Add types for all new functions/components
3. Test on both desktop and mobile viewports
4. Update this README if adding new features

## License

MIT

## Support

For questions or issues specific to this implementation, check the console logs in the Replit workspace or review the design guidelines in `design_guidelines.md`.
