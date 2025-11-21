# Folder Structure Rules

## Overview

This document defines the type-based folder structure for React TypeScript applications using Material UI and Tailwind CSS. This structure ensures consistency, maintainability, and scalability across the project.

## Core Principles

- **Type-based organization**: Files are organized by their type/function rather than by feature
- **Clear separation of concerns**: Each folder has a specific purpose
- **Scalability**: Structure supports growth without reorganization
- **Discoverability**: Easy to locate files based on their purpose

## Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common/shared components (Button, Input, etc.)
│   ├── forms/          # Form-specific components
│   └── feedback/       # Feedback components (Toast, Modal, etc.)
├── pages/              # Page-level components (route components)
├── layouts/            # Layout components (AppLayout, AuthLayout, etc.)
├── hooks/              # Custom React hooks
│   ├── api/           # API-related hooks
│   ├── ui/            # UI-related hooks
│   └── utils/         # Utility hooks
├── utils/              # Utility functions and helpers
│   ├── validators/    # Validation functions
│   ├── formatters/    # Data formatting functions
│   └── constants/     # Application constants
├── types/              # TypeScript type definitions
│   ├── api/           # API-related types
│   ├── components/    # Component prop types
│   └── common/        # Common/shared types
├── services/           # API service layer
│   ├── api/           # API client and base services
│   └── endpoints/     # Specific API endpoint services
├── store/              # State management
│   ├── slices/        # Redux slices (if using Redux)
│   ├── contexts/      # React contexts
│   └── selectors/     # State selectors
├── routes/             # Routing configuration
│   ├── index.tsx      # Route definitions
│   └── guards/        # Route guards (auth, permissions)
├── styles/             # Global styles and theme
│   ├── theme.ts       # Material UI theme configuration
│   └── globals.css    # Global CSS/Tailwind imports
└── __tests__/          # Test files (co-located or separate)
    ├── components/
    ├── hooks/
    ├── utils/
    └── services/
```

## Naming Conventions

### Files and Folders

- **Components**: PascalCase (e.g., `UserProfile.tsx`, `Button.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`, `useApi.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`, `validateEmail.ts`)
- **Types**: PascalCase (e.g., `User.ts`, `ApiResponse.ts`)
- **Services**: camelCase (e.g., `userService.ts`, `authService.ts`)
- **Pages**: PascalCase (e.g., `Dashboard.tsx`, `Login.tsx`)
- **Layouts**: PascalCase with `Layout` suffix (e.g., `AppLayout.tsx`, `AuthLayout.tsx`)

### Folders

- Use lowercase with hyphens for multi-word folders (e.g., `user-profile/`, `api-client/`)
- Use singular form for folder names (e.g., `component/` not `components/`)
- Exception: Standard plural names like `components/`, `pages/`, `hooks/` are acceptable

## File Organization Patterns

### Component Files

Each component should have its own folder if it includes multiple files:

```
components/
└── UserCard/
    ├── UserCard.tsx
    ├── UserCard.test.tsx
    ├── UserCard.styles.ts (if needed)
    └── index.ts (export)
```

For simple components, a single file is acceptable:

```
components/
└── Button.tsx
```

### Index Files

Use `index.ts` or `index.tsx` files for:

- Re-exporting components from a folder
- Simplifying imports
- Example: `components/common/index.ts` exports all common components

### Barrel Exports

Create barrel exports for related files:

```typescript
// hooks/index.ts
export { useAuth } from './useAuth';
export { useApi } from './useApi';
export { useLocalStorage } from './useLocalStorage';
```

## Import Paths

### Absolute Imports

Configure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@components/*": ["components/*"],
      "@hooks/*": ["hooks/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"],
      "@services/*": ["services/*"],
      "@store/*": ["store/*"]
    }
  }
}
```

### Import Examples

```typescript
// Good: Using path aliases
import { Button } from '@components/common/Button';
import { useAuth } from '@hooks/useAuth';
import { formatDate } from '@utils/formatters/formatDate';

// Acceptable: Relative imports for closely related files
import { UserCard } from './UserCard';
```

## Special Cases

### Shared Components

Components used across multiple features should be in `components/common/`:

- Buttons, Inputs, Cards
- Loading indicators
- Error boundaries
- Layout wrappers

### Feature-Specific Components

Components specific to a feature can be co-located with the feature or in a feature folder:

```
pages/
└── Dashboard/
    ├── Dashboard.tsx
    ├── DashboardStats.tsx
    └── DashboardChart.tsx
```

### Test Files

Two approaches are acceptable:

1. **Co-located**: Test file next to source file

   ```
   components/
   ├── Button.tsx
   └── Button.test.tsx
   ```

2. **Separate**: Test files in `__tests__/` mirroring source structure
   ```
   __tests__/
   └── components/
       └── Button.test.tsx
   ```

Choose one approach and maintain consistency.

## Checklist

When creating or organizing files, ensure:

- [ ] File is in the correct folder based on its type
- [ ] File follows naming conventions
- [ ] Related files are grouped logically
- [ ] Index files are used for clean exports
- [ ] Path aliases are configured and used
- [ ] Test files follow the chosen co-location strategy
- [ ] Folder structure is consistent across the project

## Related Rules

- [Component Standards](./component-standards.md)
- [Testing Rules](./testing.md)
