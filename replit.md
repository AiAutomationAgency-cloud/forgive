# Apology App - Project Documentation

## Overview
A fun interactive apology app featuring a monkey mascot that helps users make amends in a playful way. The app includes animations, confetti effects, and an "apology-o-meter" to track forgiveness levels.

## Project Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion for smooth animations
- **Effects**: Canvas Confetti for celebration effects
- **State Management**: React hooks for local state

### Backend (Express + Node.js)
- **Framework**: Express.js with TypeScript
- **Database**: In-memory storage (MemStorage) with Drizzle ORM structure
- **Development**: Vite for development server with HMR
- **Build**: ESBuild for production bundling

### Key Features
- Interactive monkey mascot with click animations
- Rotating apology messages
- Forgiveness level meter with progress animations
- Banana rain animation effect
- Sound effects (optional)
- Mobile-responsive design

## Recent Changes
- **2025-01-19**: Migrated from Bolt to Replit
- **2025-01-19**: Added canvas-confetti dependency
- **2025-01-19**: Created deployment configuration for Render
- **2025-01-19**: Set up environment configuration files

## Development Setup

### Local Development
```bash
npm install
npm run dev
```
The app runs on port 5000 with both frontend and backend.

### Build for Production
```bash
npm run build
npm start
```

## Deployment

### Render Deployment
- Uses `render.yaml` configuration
- Automatically builds and serves the application
- Environment variables managed through Render dashboard

### Environment Variables
- `NODE_ENV`: production/development
- `PORT`: Server port (defaults to 5000)
- `HOST`: Server host (defaults to 0.0.0.0)

## User Preferences
- None specified yet

## File Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   └── App.tsx        # Main application component
│   └── index.html         # HTML template
├── server/                # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # In-memory storage interface
│   └── vite.ts           # Vite development setup
├── shared/               # Shared types and schemas
│   └── schema.ts         # Drizzle schemas and types
├── package.json          # Dependencies and scripts
├── render.yaml           # Render deployment config
└── .env.example          # Environment variables template
```

## Security Considerations
- Client/server separation maintained
- No sensitive data in frontend
- Environment variables for configuration
- Input validation with Zod schemas

## Performance Notes
- Vite for fast development builds
- ESBuild for optimized production builds
- Lazy loading and code splitting ready
- Animations optimized with Framer Motion