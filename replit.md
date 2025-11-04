# AI Tutor with Live2D Avatar

## Overview

An interactive educational web application that combines AI-powered tutoring with an animated Live2D avatar companion. The system provides personalized learning assistance for Math, Physics, Chemistry, and Biology through a conversational chat interface, enhanced with visual engagement through an animated character that responds to interaction states.

The application features a split-screen layout: a Live2D avatar display panel that shows the tutor's current state (idle, listening, thinking, speaking) and a chat interface where students can ask questions and receive educational guidance. The design emphasizes creating a welcoming, distraction-free learning environment where the avatar serves as an engaging companion without overwhelming the educational content.

## Recent Changes

**Date:** November 4, 2025

**Replit Environment Setup:**
- Installed all npm dependencies
- Configured Vite development server for Replit proxy support (host: 0.0.0.0, HMR via WSS on port 443)
- Added GEMINI_API_KEY to environment secrets for AI functionality
- Downgraded Pixi.js from v8.14.0 to v7.4.2 for better compatibility
- Set up workflow to run on port 5000 with webview output
- Configured deployment for autoscale with build and production start scripts

**Known Issue - Live2D Avatar Rendering:**
- Pixi.js cannot initialize in the Replit environment due to lack of WebGL support
- Error: "Unable to auto-detect a suitable renderer"
- Root cause: Replit's hosted browser preview lacks hardware-accelerated WebGL/Canvas rendering (runs in headless iframe without GPU access)
- The Shizuku Live2D model files are properly installed in `client/public/models/shizuku/`
- The application gracefully handles this by displaying a placeholder in the avatar panel
- **Core AI chat functionality with Gemini AI works perfectly**

**Solutions for Live2D Avatar:**
1. **Run locally**: Clone this repo and run `npm install && npm run dev` on your local machine with WebGL support
2. **Deploy to WebGL-enabled host**: Deploy to Vercel, Netlify, or similar platforms that support WebGL
3. **Use Replit deployment**: After publishing, the deployed version may have better WebGL support than the preview
4. **Alternative**: Replace Live2D with pre-rendered animations, GIFs, or CSS animations as fallback

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for component-based UI development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS with shadcn/ui component library for styling

**Design System:**
- Custom theme using CSS variables for light/dark mode support
- Typography: Inter (primary) and Fredoka (accent/display) fonts from Google Fonts
- Color system: Neutral base with semantic color tokens for UI states
- Spacing system: Tailwind units (4, 6, 8, 12, 16) for consistent rhythm
- Component library: Full shadcn/ui integration with Radix UI primitives

**Layout Strategy:**
- Desktop: Split-screen design (40% avatar panel, 60% chat interface)
- Mobile/Tablet: Stacked layout with collapsible avatar section
- Responsive breakpoint: 768px (mobile threshold)

**Key Frontend Components:**
- `AvatarPanel`: Manages Live2D avatar display, status indicators, and volume controls
- `ChatInterface`: Handles message display, scrolling, and quick topic suggestions
- `Live2DAvatar`: Integrates Pixi.js and pixi-live2d-display for avatar rendering
- `MessageInput`: Provides text input with keyboard shortcuts and voice input placeholder

**State Management:**
- Local component state for UI interactions (messages, loading states)
- React Query for API request caching and synchronization
- Custom hooks for Live2D avatar lifecycle management

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js server
- TypeScript for type-safe server code
- ESM module system

**API Design:**
- RESTful endpoints with JSON request/response format
- `/api/chat`: POST endpoint for AI tutor conversations
- `/api/tts`: POST endpoint (placeholder) for text-to-speech generation
- Request validation using Zod schemas from shared types

**Server Structure:**
- `server/index.ts`: Express app initialization and middleware setup
- `server/routes.ts`: API route definitions and HTTP server creation
- `server/gemini.ts`: Google Gemini AI integration for generating tutor responses
- `server/storage.ts`: In-memory data storage implementation (MemStorage class)
- `server/vite.ts`: Vite development server integration and static file serving

**Middleware Stack:**
- JSON body parsing with raw body preservation
- URL-encoded body parsing
- Request logging with timing and response capture
- Development-only: Vite middleware, error overlay, Replit integrations

### Database & Data Storage

**Current Implementation:**
- In-memory storage using Map-based data structures
- User schema defined with Drizzle ORM types
- Database configuration prepared for PostgreSQL (via Neon serverless)

**Database Schema:**
- `users` table: id (UUID), username (unique), password
- Prepared for future expansion with conversation history, user preferences

**Migration Strategy:**
- Drizzle Kit configured for schema migrations
- Migration files stored in `/migrations` directory
- Connection via DATABASE_URL environment variable

**Storage Interface:**
- `IStorage` interface defines CRUD operations
- `MemStorage` class provides in-memory implementation
- Designed for easy swap to PostgreSQL implementation using Drizzle ORM

### External Dependencies

**AI/ML Services:**
- **Google Gemini AI** (@google/genai): Powers the AI tutor's conversational capabilities
  - Model: gemini-2.0-flash-exp
  - Configured with system instruction for educational focus
  - Handles natural language understanding and response generation
  - API key authentication via GEMINI_API_KEY environment variable

**Graphics & Animation:**
- **Pixi.js**: WebGL rendering engine for 2D graphics
- **pixi-live2d-display**: Live2D model rendering integration
  - Supports .model3.json format models
  - Provides animation and interaction capabilities
  - Canvas-based avatar display with mouth movement synchronization

**Database:**
- **Neon Serverless PostgreSQL** (@neondatabase/serverless): Serverless PostgreSQL database
  - Connection via DATABASE_URL environment variable
  - Configured for use with Drizzle ORM
  - Currently prepared but not actively used (in-memory storage active)

**Form Management:**
- **React Hook Form**: Form state and validation
- **Zod**: Runtime type validation and schema definition
- **@hookform/resolvers**: Zod integration for form validation

**UI Component Library:**
- **Radix UI**: Unstyled, accessible component primitives
  - Accordion, Dialog, Dropdown Menu, Popover, Tabs, Toast, etc.
  - 20+ component primitives for building the interface
- **shadcn/ui**: Pre-styled component collection built on Radix UI
- **Lucide React**: Icon library for UI elements

**Development Tools:**
- **Vite Plugins**:
  - @vitejs/plugin-react: React Fast Refresh and JSX transform
  - @replit/vite-plugin-runtime-error-modal: Enhanced error display
  - @replit/vite-plugin-cartographer: Development mode code navigation
  - @replit/vite-plugin-dev-banner: Development environment indicators

**Session & Authentication (Prepared):**
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- Currently unused but configured for future authentication implementation

**Type Safety:**
- Shared schema definitions between client and server (`shared/schema.ts`)
- Zod schemas for runtime validation
- TypeScript for compile-time type checking
- Path aliases configured for clean imports (@/, @shared/, @assets/)