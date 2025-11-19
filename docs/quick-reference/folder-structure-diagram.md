# Folder Structure Diagram

Visual reference for the type-based folder structure.

## Complete Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common/shared components
│   ├── forms/          # Form-specific components
│   └── feedback/       # Feedback components
│
├── pages/              # Page-level components (route components)
│
├── layouts/            # Layout components
│
├── hooks/              # Custom React hooks
│   ├── api/           # API-related hooks
│   ├── ui/            # UI-related hooks
│   └── utils/         # Utility hooks
│
├── utils/              # Utility functions
│   ├── validators/    # Validation functions
│   ├── formatters/    # Data formatting
│   └── constants/     # Application constants
│
├── types/              # TypeScript type definitions
│   ├── api/           # API-related types
│   ├── components/    # Component prop types
│   └── common/        # Common/shared types
│
├── services/           # API service layer
│   ├── api/           # API client and base services
│   └── endpoints/     # Specific API endpoint services
│
├── store/              # State management
│   ├── slices/        # Redux slices (if using Redux)
│   ├── contexts/      # React contexts
│   └── selectors/     # State selectors
│
├── routes/             # Routing configuration
│   ├── index.tsx      # Route definitions
│   └── guards/        # Route guards
│
├── styles/             # Global styles and theme
│   ├── theme.ts       # Material UI theme
│   └── globals.css    # Global CSS/Tailwind
│
└── __tests__/          # Test files (if separate)
    ├── components/
    ├── hooks/
    ├── utils/
    └── services/
```

## Naming Conventions

### Files
- **Components**: `ComponentName.tsx` (PascalCase)
- **Hooks**: `useHookName.ts` (camelCase, `use` prefix)
- **Utils**: `utilityName.ts` (camelCase)
- **Types**: `TypeName.ts` (PascalCase)
- **Services**: `serviceName.ts` (camelCase)
- **Pages**: `PageName.tsx` (PascalCase)
- **Layouts**: `LayoutName.tsx` (PascalCase)

### Folders
- Use lowercase with hyphens: `user-profile/`, `api-client/`
- Standard plural names: `components/`, `pages/`, `hooks/`

## Import Path Aliases

Configured in `tsconfig.json`:

```typescript
// Absolute imports using aliases
import { Button } from '@components/common/Button';
import { useAuth } from '@hooks/useAuth';
import { formatDate } from '@utils/formatters/formatDate';
import { User } from '@types/api/user';
import { userService } from '@services/endpoints/userService';
```

## Component File Structure

### Simple Component
```
components/
└── Button.tsx
```

### Complex Component (with multiple files)
```
components/
└── UserCard/
    ├── UserCard.tsx
    ├── UserCard.test.tsx
    ├── UserCard.styles.ts (if needed)
    └── index.ts (export)
```

## Test File Organization

### Option 1: Co-located
```
components/
├── Button.tsx
└── Button.test.tsx
```

### Option 2: Separate
```
__tests__/
└── components/
    └── Button.test.tsx
```

**Choose one approach and maintain consistency.**

## Quick Reference

**Where to place files:**

- **UI Components** → `src/components/`
- **Page Components** → `src/pages/`
- **Layouts** → `src/layouts/`
- **Custom Hooks** → `src/hooks/`
- **Utility Functions** → `src/utils/`
- **Type Definitions** → `src/types/`
- **API Services** → `src/services/`
- **State Management** → `src/store/`
- **Route Config** → `src/routes/`
- **Global Styles** → `src/styles/`
- **Test Files** → Co-located or `src/__tests__/`

---

**Quick Copy for AI Prompts:**

```
Folder Structure:
- Components: src/components/[category]/
- Pages: src/pages/
- Hooks: src/hooks/
- Utils: src/utils/
- Types: src/types/
- Services: src/services/
- Store: src/store/
- Routes: src/routes/
- Styles: src/styles/
```

