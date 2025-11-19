# Healthcare Application

A modern healthcare application built with React, TypeScript, Material UI, and Vite.

## Features

- 🏥 Healthcare-focused UI inspired by LabCorp design
- 📱 Fully responsive (mobile-first design)
- ♿ WCAG AA accessibility compliant
- ⚡ Optimized performance with React.memo, useMemo, and useCallback
- 🎨 Material UI with custom LabCorp-inspired theme
- 🧪 Comprehensive test coverage

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Link the ESLint plugin (required for linting):
```bash
npm run link-plugin
```

### Development

Start the development server:
```bash
npm run dev
```

This will:
- Start Vite dev server on `http://localhost:3000`
- Automatically open the browser
- Enable hot module replacement (HMR)

### Building for Production

Build the application:
```bash
npm run build
```

This will:
- Type-check the code
- Build optimized production bundles
- Output to the `dist/` directory

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

or

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Alias for `npm run preview`
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/      # Common components (Navbar, etc.)
│   └── layout/      # Layout components (Sidebar, etc.)
├── pages/           # Page-level components
├── layouts/         # Layout wrappers
├── routes/          # Route configuration
├── styles/          # Global styles and theme
├── types/           # TypeScript type definitions
└── index.tsx         # Application entry point
```

## Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Material UI v7** - Component library
- **React Router v7** - Routing
- **Vite** - Build tool and dev server
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved

