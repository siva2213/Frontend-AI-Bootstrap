# Replit AI Instructions

**⚠️ IMPORTANT: This file is auto-generated from `AI_INSTRUCTIONS.md` and `docs/rules/*.md`. Do not edit manually.**

**Rules Version:** 1.0.0  
**Last Updated:** 2024-01-15T00:00:00Z

This project follows strict development standards. **ALWAYS follow these rules when:**

- Creating new components, features, or code
- Modifying or enhancing existing code
- Refactoring existing implementations
- Fixing bugs or adding features to existing components
- Updating or improving any part of the codebase

These standards apply universally to all code changes, ensuring consistency and quality across the entire project.

## Core Standards

### Component Creation Requirements

Every component must meet three core requirements:

1. **Performance & Optimization**
   - Use `React.memo` for expensive components or components rendered in lists
   - Use `useMemo` for expensive calculations, derived state, filtering/sorting large arrays
   - Use `useCallback` for function props passed to memoized children
   - Implement code splitting with `React.lazy` for route-level components
   - Optimize images and implement lazy loading

2. **Responsiveness (Mobile-First)**
   - Design mobile-first, then enhance for larger screens
   - Use Material UI breakpoints: `xs`, `sm`, `md`, `lg`, `xl`
   - Combine Material UI `sx` prop with Tailwind responsive classes
   - Test on mobile (320px+), tablet (768px+), and desktop (1024px+)
   - Ensure touch targets are at least 44x44px

3. **CSP & ADA Compliance**
   - ❌ **Never use inline styles** - Use Material UI `sx` prop or Tailwind classes
   - ❌ **Never use inline event handlers** - Use function references
   - ✅ Use semantic HTML elements (`nav`, `main`, `article`, `section`)
   - ✅ Add ARIA attributes (`aria-label`, `aria-describedby`, `role`)
   - ✅ Ensure keyboard navigation for all interactive elements
   - ✅ Implement focus management for modals and dialogs
   - ✅ Provide screen reader text and alt text for images
   - ✅ Ensure color contrast meets WCAG AA standards (4.5:1 for text, 3:1 for large text)

### File Organization

- **Components**: `src/components/{common|forms|feedback}/` - Use PascalCase
- **Pages**: `src/pages/` - Route-level components, PascalCase
- **Layouts**: `src/layouts/` - Layout wrappers, PascalCase
- **Hooks**: `src/hooks/{api|ui|utils}/` - Custom hooks, camelCase with `use` prefix
- **Utils**: `src/utils/{validators|formatters|constants}/` - Utility functions, camelCase
- **Types**: `src/types/{api|components|common}/` - TypeScript types, PascalCase
- **Services**: `src/services/{api|endpoints}/` - API services, camelCase
- **Store**: `src/store/{slices|contexts|selectors}/` - State management

### Component Template

```typescript
import React, { memo, useMemo, useCallback } from 'react';
import { Box } from '@mui/material';

interface ComponentProps {
  // Define props
}

export const Component = memo<ComponentProps>(({
  // Destructure props
}) => {
  // Hooks
  // Memoized values with useMemo
  // Callbacks with useCallback
  // Effects

  return (
    <Box
      sx={{
        // Responsive Material UI styles (mobile-first)
        padding: { xs: 2, sm: 3, md: 4 },
      }}
      className="tailwind-classes"
      role=""
      aria-label=""
    >
      {/* Component content */}
    </Box>
  );
});

Component.displayName = 'Component';
```

### Essential Checklists

**Performance Checklist:**

- [ ] Components are memoized when appropriate
- [ ] Expensive calculations use `useMemo`
- [ ] Function props use `useCallback`
- [ ] Large components are code-split
- [ ] Unnecessary re-renders are prevented

**Responsive Checklist:**

- [ ] Component tested on mobile (320px+)
- [ ] Component tested on tablet (768px+)
- [ ] Component tested on desktop (1024px+)
- [ ] Touch targets are at least 44x44px
- [ ] Layout doesn't break at any breakpoint

**Accessibility Checklist:**

- [ ] No inline styles used
- [ ] No inline event handlers
- [ ] Semantic HTML elements used
- [ ] ARIA attributes added where needed
- [ ] All interactive elements keyboard accessible
- [ ] Focus management implemented
- [ ] Color contrast meets WCAG AA standards

<!-- INCLUDE_RULES:START -->

## Detailed UI Standards

### Component Standards

## Core Principles

1. **Performance First**: Components should be optimized for rendering and re-rendering
2. **Mobile-First Responsive Design**: Components must work seamlessly across all device sizes
3. **Accessibility & Security**: Components must be accessible and comply with Content Security Policy

## 1. Performance & Optimization

### React.memo Usage

Use `React.memo` for components that:

- Receive props that don't change frequently
- Are expensive to render
- Are rendered multiple times in lists

```typescript
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button = React.memo<ButtonProps>(({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
});
```

### useMemo for Expensive Calculations

Use `useMemo` for:

- Complex calculations
- Derived state computations
- Filtering/sorting large arrays

```typescript
import { useMemo } from 'react';

const ExpensiveComponent = ({ items, filter }) => {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  return <div>{/* render filteredItems */}</div>;
};
```

### useCallback for Function Props

Use `useCallback` when passing functions as props to memoized children:

```typescript
import { useCallback, useState } from 'react';

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return <MemoizedChild onClick={handleClick} />;
};
```

### Code Splitting & Lazy Loading

Use `React.lazy` for route-level components:

```typescript
import { lazy, Suspense } from 'react';
import { CircularProgress } from '@mui/material';

const Dashboard = lazy(() => import('@pages/Dashboard'));

const App = () => (
  <Suspense fallback={<CircularProgress />}>
    <Dashboard />
  </Suspense>
);
```

### Performance Checklist

- [ ] Components are memoized when appropriate
- [ ] Expensive calculations use `useMemo`
- [ ] Function props use `useCallback`
- [ ] Large components are code-split
- [ ] Unnecessary re-renders are prevented
- [ ] Images are optimized and lazy-loaded

**Key Patterns:**

Use `React.memo` for components that receive props that don't change frequently, are expensive to render, or are rendered multiple times in lists.

Use `useMemo` for complex calculations, derived state computations, and filtering/sorting large arrays.

Use `useCallback` when passing functions as props to memoized children.

Use `React.lazy` for route-level components with Suspense fallback.

## 2. Responsiveness

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```typescript
import { Box } from '@mui/material';

const ResponsiveComponent = () => {
  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 }, // Mobile first
        fontSize: { xs: '0.875rem', md: '1rem' },
      }}
    >
      Content
    </Box>
  );
};
```

### Material UI Breakpoints

Use Material UI's breakpoint system:

```typescript
import { useTheme, useMediaQuery } from '@mui/material';

const ResponsiveComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box>
      {isMobile ? <MobileView /> : <DesktopView />}
    </Box>
  );
};
```

### Tailwind Responsive Classes

Combine Material UI with Tailwind responsive utilities:

```typescript
import { Box } from '@mui/material';

const HybridComponent = () => {
  return (
    <Box className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Grid items */}
      </div>
    </Box>
  );
};
```

### Material UI Grid System

Use Material UI Grid for responsive layouts:

```typescript
import { Grid } from '@mui/material';

const GridComponent = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        Item 1
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        Item 2
      </Grid>
    </Grid>
  );
};
```

### Responsive Checklist

- [ ] Component tested on mobile (320px+)
- [ ] Component tested on tablet (768px+)
- [ ] Component tested on desktop (1024px+)
- [ ] Touch targets are at least 44x44px
- [ ] Text is readable without zooming
- [ ] Layout doesn't break at any breakpoint
- [ ] Images scale appropriately
- [ ] Navigation is accessible on all screen sizes

**Key Patterns:**

Always design mobile-first, then enhance for larger screens using Material UI breakpoints (`xs`, `sm`, `md`, `lg`, `xl`).

Combine Material UI `sx` prop with Tailwind responsive classes for hybrid styling.

## 3. CSP & ADA Compliance

### Content Security Policy (CSP)

#### Avoid Inline Styles

❌ **Don't:**

```typescript
<div style={{ color: 'red' }}>Content</div>
```

✅ **Do:**

```typescript
import { Box } from '@mui/material';

<Box sx={{ color: 'red' }}>Content</Box>
// or
<div className="text-red-500">Content</div>
```

#### Avoid Inline Event Handlers

❌ **Don't:**

```typescript
<div onClick="handleClick()">Content</div>
```

✅ **Do:**

```typescript
<div onClick={handleClick}>Content</div>
```

#### External Resources

- Use `rel="preconnect"` for external domains
- Load external scripts via npm packages when possible
- Configure CSP headers in server configuration

### ADA (Accessibility) Compliance

#### Semantic HTML

Use semantic HTML elements:

```typescript
// Good
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
  </ul>
</nav>

// Avoid
<div onClick={goHome}>Home</div>
```

#### ARIA Attributes

Use ARIA attributes when semantic HTML isn't sufficient:

```typescript
import { Button } from '@mui/material';

<Button
  aria-label="Close dialog"
  aria-describedby="dialog-description"
  onClick={handleClose}
>
  <CloseIcon />
</Button>
```

#### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```typescript
const AccessibleButton = ({ onClick, children }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};
```

#### Focus Management

Manage focus for accessibility:

```typescript
import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </div>
  );
};
```

#### Screen Reader Support

Provide text alternatives and descriptions:

```typescript
import { IconButton, Tooltip } from '@mui/material';

<IconButton
  aria-label="Delete item"
  aria-describedby="delete-tooltip"
>
  <DeleteIcon />
</IconButton>
<Tooltip id="delete-tooltip">
  Click to delete this item permanently
</Tooltip>
```

#### Color Contrast

Ensure sufficient color contrast (WCAG AA minimum):

- Text: 4.5:1 for normal text, 3:1 for large text
- Use Material UI theme colors (they meet contrast requirements)
- Test with tools like WebAIM Contrast Checker

#### Form Accessibility

```typescript
import { TextField } from '@mui/material';

<TextField
  label="Email"
  type="email"
  required
  aria-required="true"
  error={hasError}
  helperText={errorMessage}
  aria-describedby="email-error"
  id="email-input"
/>
```

### CSP & ADA Checklist

- [ ] No inline styles used
- [ ] No inline event handlers
- [ ] Semantic HTML elements used
- [ ] ARIA attributes added where needed
- [ ] All interactive elements keyboard accessible
- [ ] Focus management implemented
- [ ] Screen reader text provided
- [ ] Color contrast meets WCAG AA standards
- [ ] Forms have proper labels and error messages
- [ ] Images have alt text
- [ ] Component tested with screen reader
- [ ] Component tested with keyboard only navigation

**Do's and Don'ts:**

❌ **Don't:** Use inline styles (`style={{ color: 'red' }}`) or inline event handlers  
✅ **Do:** Use Material UI `sx` prop, Tailwind classes, or function references

❌ **Don't:** Use generic `div` elements for navigation or interactive elements  
✅ **Do:** Use semantic HTML (`nav`, `main`, `article`, `section`) and proper ARIA attributes

❌ **Don't:** Create interactive elements without keyboard support  
✅ **Do:** Ensure all interactive elements are keyboard accessible with proper `tabIndex` and keyboard event handlers

---

### Folder Structure Rules

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

**Key Requirements:**

- Components: `src/components/{common|forms|feedback}/` - Use PascalCase
- Pages: `src/pages/` - Route-level components, PascalCase
- Hooks: `src/hooks/{api|ui|utils}/` - camelCase with `use` prefix
- Utils: `src/utils/{validators|formatters|constants}/` - camelCase
- Types: `src/types/{api|components|common}/` - PascalCase
- Services: `src/services/{api|endpoints}/` - camelCase
- Store: `src/store/{slices|contexts|selectors}/` - State management

**Import Paths:** Use absolute imports with path aliases (`@components`, `@hooks`, `@utils`, etc.)

---

### Testing Rules

## Core Principles

- **User-Centric Testing**: Test from the user's perspective, not implementation details
- **Accessibility First**: Include accessibility testing in all component tests
- **Comprehensive Coverage**: Test user interactions, edge cases, and error states
- **Maintainable Tests**: Write tests that are easy to read and maintain
- **Fast Execution**: Tests should run quickly and efficiently

## Jest Configuration

### Basic Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*): '<rootDir>/src/$1',
    '^@components/(.*): '<rootDir>/src/components/$1',
    '^@hooks/(.*): '<rootDir>/src/hooks/$1',
    '^@utils/(.*): '<rootDir>/src/utils/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/index.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Setup File

```typescript
// src/setupTests.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

## Component Testing

### Basic Component Test

```typescript
// components/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Testing with Material UI

```typescript
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@styles/theme';
import { Button } from '@mui/material';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('MaterialUIButton', () => {
  it('renders with Material UI theme', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormComponent } from './FormComponent';

describe('FormComponent', () => {
  it('submits form with user input', async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();

    render(<FormComponent onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });
  });
});
```

## Accessibility Testing

### Testing ARIA Attributes

```typescript
import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('has proper ARIA attributes', () => {
    render(<Modal isOpen={true} title="Test Modal" />);

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby');
  });

  it('traps focus within modal', async () => {
    const user = userEvent.setup();
    render(<Modal isOpen={true} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toHaveFocus();
  });
});
```

### Testing Keyboard Navigation

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from './Menu';

describe('Menu', () => {
  it('navigates with keyboard', async () => {
    const user = userEvent.setup();
    render(<Menu items={['Item 1', 'Item 2', 'Item 3']} />);

    const firstItem = screen.getByRole('menuitem', { name: /item 1/i });
    firstItem.focus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: /item 2/i })).toHaveFocus();
  });
});
```

### Using jest-axe for Accessibility

```typescript
// Install: npm install --save-dev jest-axe
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Hook Testing

### Testing Custom Hooks

```typescript
// hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('resets count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(0);
  });
});
```

### Testing Hooks with Context

```typescript
import { renderHook } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from './useTheme';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('useTheme', () => {
  it('returns theme from context', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBeDefined();
  });
});
```

## API Mocking

### Mocking API Services

```typescript
// __mocks__/services/userService.ts
import { userService } from '@services/endpoints/userService';

jest.mock('@services/endpoints/userService');

describe('UserComponent', () => {
  beforeEach(() => {
    (userService.getUsers as jest.Mock).mockResolvedValue({
      data: [
        { id: '1', name: 'User 1' },
        { id: '2', name: 'User 2' },
      ],
    });
  });

  it('displays users from API', async () => {
    render(<UserComponent />);

    expect(await screen.findByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });
});
```

### Mocking Fetch/Axios

```typescript
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  it('fetches data successfully', async () => {
    const mockData = { id: '1', name: 'Test' };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await userService.getUserById('1');

    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith('/users/1');
  });
});
```

### Using MSW (Mock Service Worker)

```typescript
// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [{ id: '1', name: 'User 1' }],
      })
    );
  }),
];

// src/setupTests.ts
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Test Organization

### File Naming

- Test files: `ComponentName.test.tsx` or `ComponentName.spec.tsx`
- Co-located with component or in `__tests__/` folder
- Maintain consistency across the project

### Test Structure

```typescript
describe('ComponentName', () => {
  // Setup
  beforeEach(() => {
    // Common setup
  });

  // Happy path tests
  describe('when rendering', () => {
    it('renders correctly', () => {
      // Test
    });
  });

  // Interaction tests
  describe('when user interacts', () => {
    it('handles click', () => {
      // Test
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('handles empty state', () => {
      // Test
    });
  });

  // Error states
  describe('error handling', () => {
    it('displays error message', () => {
      // Test
    });
  });
});
```

## Testing Async Operations

### Testing Async Components

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { DataComponent } from './DataComponent';

describe('DataComponent', () => {
  it('loads and displays data', async () => {
    render(<DataComponent />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/data loaded/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
```

## Snapshot Testing

### When to Use Snapshots

Use snapshots sparingly for:

- Stable UI components
- Configuration objects
- Error messages

```typescript
it('matches snapshot', () => {
  const { container } = render(<Button>Click me</Button>);
  expect(container).toMatchSnapshot();
});
```

## Coverage Requirements

### Coverage Goals

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### Excluding Files from Coverage

```javascript
// jest.config.js
collectCoverageFrom: [
  'src/**/*.{ts,tsx}',
  '!src/**/*.d.ts',
  '!src/index.tsx',
  '!src/**/*.stories.tsx',
],
```

## Checklist

When writing tests, ensure:

- [ ] Tests are written from user's perspective
- [ ] All user interactions are tested
- [ ] Accessibility is tested (ARIA, keyboard navigation)
- [ ] Error states are tested
- [ ] Loading states are tested
- [ ] Edge cases are covered
- [ ] API calls are mocked
- [ ] Tests are fast and independent
- [ ] Test names are descriptive
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Coverage meets minimum thresholds
- [ ] Tests are maintainable and readable

**Key Requirements:** Use Jest and React Testing Library. Test from user's perspective, not implementation details. Include accessibility testing in all component tests.

---

### Routing Rules

## Core Principles

- **Centralized Configuration**: All routes defined in a single location
- **Type Safety**: Routes are type-safe with TypeScript
- **Protected Routes**: Authentication and authorization handled consistently
- **Lazy Loading**: Routes are code-split for performance
- **Clear Navigation Patterns**: Consistent navigation throughout the app

## Route Structure

### Folder Organization

```
src/
├── routes/
│   ├── index.tsx           # Main route configuration
│   ├── routes.config.ts    # Route definitions and metadata
│   └── guards/
│       ├── AuthGuard.tsx   # Authentication guard
│       └── RoleGuard.tsx   # Role-based access guard
└── pages/
    ├── Dashboard.tsx
    ├── Login.tsx
    └── Profile.tsx
```

### Route Configuration

Define routes in a centralized configuration:

```typescript
// routes/routes.config.ts
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  isProtected?: boolean;
  requiredRoles?: string[];
  title?: string;
  exact?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    title: 'Home',
  },
  {
    path: '/dashboard',
    component: Dashboard,
    isProtected: true,
    title: 'Dashboard',
  },
  {
    path: '/admin',
    component: AdminPanel,
    isProtected: true,
    requiredRoles: ['admin'],
    title: 'Admin Panel',
  },
];
```

## Route Naming Conventions

### Path Naming

- Use **kebab-case** for URLs: `/user-profile`, `/order-history`
- Use **lowercase** for consistency
- Use **plural** for list pages: `/users`, `/orders`
- Use **singular** for detail pages: `/user/:id`, `/order/:id`

### Component Naming

- Use **PascalCase** for route components: `UserProfile.tsx`, `OrderHistory.tsx`
- Match component name to route purpose
- Use descriptive names that indicate the page function

### Route Examples

```typescript
// Good
/users              → UsersPage
/users/:id          → UserDetailPage
/users/:id/edit     → UserEditPage
/settings/profile   → ProfileSettingsPage

// Avoid
/userList           → Use /users
/user_detail        → Use /users/:id
```

## Route Implementation

### Using React Router

```typescript
// routes/index.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import { AuthGuard } from './guards/AuthGuard';
import { RoleGuard } from './guards/RoleGuard';

// Lazy load pages
const HomePage = lazy(() => import('@pages/Home'));
const Dashboard = lazy(() => import('@pages/Dashboard'));
const Login = lazy(() => import('@pages/Login'));
const AdminPanel = lazy(() => import('@pages/AdminPanel'));

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
);

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />

          <Route
            path="/admin"
            element={
              <AuthGuard>
                <RoleGuard requiredRoles={['admin']}>
                  <AdminPanel />
                </RoleGuard>
              </AuthGuard>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

## Protected Routes

### Authentication Guard

```typescript
// routes/guards/AuthGuard.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { CircularProgress, Box } from '@mui/material';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

### Role-Based Guard

```typescript
// routes/guards/RoleGuard.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRoles: string[];
}

export const RoleGuard = ({ children, requiredRoles }: RoleGuardProps) => {
  const { user } = useAuth();

  if (!user || !requiredRoles.some(role => user.roles?.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
```

## Route Parameters

### Type-Safe Route Params

```typescript
// types/routes.ts
export interface RouteParams {
  '/users/:id': { id: string };
  '/orders/:orderId': { orderId: string };
  '/users/:userId/posts/:postId': { userId: string; postId: string };
}

// Usage in component
import { useParams } from 'react-router-dom';

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // Use id safely
  return <div>User ID: {id}</div>;
};
```

### Query Parameters

```typescript
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const updateQuery = (newQuery: string) => {
    setSearchParams({ q: newQuery, page: '1' });
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
      />
    </div>
  );
};
```

## Navigation Patterns

### Programmatic Navigation

```typescript
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await submitForm();
      navigate('/success', { replace: true });
    } catch (error) {
      navigate('/error', { state: { error } });
    }
  };

  return <button onClick={handleSubmit}>Submit</button>;
};
```

### Link Components

```typescript
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

// Material UI Button as Link
<Button component={Link} to="/dashboard">
  Go to Dashboard
</Button>

// Standard Link
<Link to="/users/123">View User</Link>
```

### Navigation with State

```typescript
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleLogin = () => {
    // ... login logic
    navigate(from, { replace: true });
  };

  return <button onClick={handleLogin}>Login</button>;
};
```

## Route Metadata

### Document Title Updates

```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - My App`;
  }, [title]);
};

const Dashboard = () => {
  useDocumentTitle('Dashboard');
  return <div>Dashboard Content</div>;
};
```

### Breadcrumbs

```typescript
// hooks/useBreadcrumbs.ts
import { useLocation } from 'react-router-dom';

export const useBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    return {
      label: value.charAt(0).toUpperCase() + value.slice(1),
      to,
    };
  });
};
```

## Error Handling

### 404 Page

```typescript
// pages/NotFound.tsx
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h5">Page Not Found</Typography>
      <Button component={Link} to="/" sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Box>
  );
};
```

### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={4}>
          <Typography variant="h5">Something went wrong</Typography>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
```

## Checklist

When implementing routing, ensure:

- [ ] Routes are defined in a centralized configuration
- [ ] Routes use kebab-case for URLs
- [ ] Route components are lazy-loaded
- [ ] Protected routes use guards
- [ ] Route parameters are type-safe
- [ ] Navigation is consistent throughout the app
- [ ] 404 page is implemented
- [ ] Error boundaries are in place
- [ ] Document titles update with route changes
- [ ] Query parameters are handled properly
- [ ] Redirects preserve intended destination

**Key Requirements:** Use kebab-case for URLs (`/user-profile`). Route components must be lazy-loaded. Protected routes must use guards.

---

### State Management Rules

## Core Principles

- **Local State First**: Use local state unless state needs to be shared
- **Single Source of Truth**: Avoid duplicating state across components
- **Immutable Updates**: Always update state immutably
- **Type Safety**: All state should be typed with TypeScript
- **Predictable Updates**: State updates should follow consistent patterns

## State Management Decision Tree

### When to Use Local State

Use local state (`useState`, `useReducer`) when:

- State is only needed within a single component
- State doesn't need to be shared with siblings
- State is component-specific UI state (e.g., form inputs, modals, toggles)

```typescript
import { useState } from 'react';

const FormComponent = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local state is appropriate here
  return (
    <form>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </form>
  );
};
```

### When to Use Global State

Use global state (Context, Redux, Zustand, etc.) when:

- State needs to be shared across multiple components
- State needs to persist across route changes
- State represents application-level data (user, theme, settings)
- State is fetched from API and used in multiple places

```typescript
// Store user data globally
const UserContext = createContext<User | null>(null);

// Use in multiple components
const Header = () => {
  const user = useContext(UserContext);
  return <div>Welcome, {user?.name}</div>;
};
```

## State Structure

### Flat State Structure

Prefer flat state structures over nested:

```typescript
// Good: Flat structure
interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

// Avoid: Deeply nested
interface AppState {
  app: {
    user: {
      profile: {
        name: string;
      };
    };
  };
}
```

### Normalized State

Normalize data structures for better performance:

```typescript
// Good: Normalized
interface State {
  users: {
    byId: Record<string, User>;
    allIds: string[];
  };
  posts: {
    byId: Record<string, Post>;
    allIds: string[];
  };
}

// Usage
const getUser = (state: State, id: string) => state.users.byId[id];
const getAllUsers = (state: State) =>
  state.users.allIds.map(id => state.users.byId[id]);
```

## State Update Patterns

### Immutable Updates

Always update state immutably:

```typescript
// Good: Immutable update
setUsers([...users, newUser]);
setUser({ ...user, name: 'New Name' });

// Avoid: Mutating state
users.push(newUser); // ❌
user.name = 'New Name'; // ❌
```

### useReducer for Complex State

Use `useReducer` for complex state logic:

```typescript
interface State {
  count: number;
  step: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return { ...state, count: 0 };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div>
      <button onClick={() => dispatch({ type: 'increment' })}>
        Increment
      </button>
    </div>
  );
};
```

## Async State Handling

### Loading States

Always handle loading states:

```typescript
import { useState, useEffect } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useAsyncData = <T>(fetchFn: () => Promise<T>) => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchFn()
      .then(data => {
        setState({ data, loading: false, error: null });
      })
      .catch(error => {
        setState({ data: null, loading: false, error });
      });
  }, [fetchFn]);

  return state;
};
```

### Error Handling

Handle errors gracefully:

```typescript
const DataComponent = () => {
  const { data, loading, error } = useAsyncData(() => fetchData());

  if (loading) return <CircularProgress />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;

  return <DataDisplay data={data} />;
};
```

### Optimistic Updates

Use optimistic updates for better UX:

```typescript
const useOptimisticUpdate = () => {
  const [state, setState] = useState<Data[]>([]);

  const updateItem = async (id: string, updates: Partial<Data>) => {
    // Optimistic update
    setState(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );

    try {
      await api.updateItem(id, updates);
    } catch (error) {
      // Rollback on error
      setState(prev =>
        prev.map(item => (item.id === id ? { ...item, ...updates } : item))
      );
      throw error;
    }
  };

  return { state, updateItem };
};
```

## Context API Patterns

### Context with Custom Hook

```typescript
// store/contexts/ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Context Splitting

Split contexts by concern to avoid unnecessary re-renders:

```typescript
// Separate contexts for different concerns
const UserContext = createContext<User | null>(null);
const ThemeContext = createContext<Theme>('light');
const NotificationContext = createContext<Notification[]>([]);
```

## State Persistence

### Local Storage

Persist state to localStorage:

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};
```

### Session Storage

Use sessionStorage for temporary state:

```typescript
const useSessionStorage = <T>(key: string, initialValue: T) => {
  // Similar to useLocalStorage but uses sessionStorage
};
```

## State Selectors

### Memoized Selectors

Use memoized selectors for derived state:

```typescript
import { useMemo } from 'react';

const UserList = ({ users, filter }) => {
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);

  return (
    <div>
      {filteredUsers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
```

## State Management Libraries

### Redux Toolkit (if using Redux)

```typescript
// store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
```

### Zustand (Alternative)

```typescript
// store/userStore.ts
import create from 'zustand';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
}));
```

## Checklist

When managing state, ensure:

- [ ] Chose appropriate state management solution (local vs global)
- [ ] State structure is flat and normalized
- [ ] State updates are immutable
- [ ] Loading and error states are handled
- [ ] State is properly typed with TypeScript
- [ ] State persistence is implemented where needed
- [ ] Selectors are memoized for performance
- [ ] Contexts are split by concern
- [ ] Async operations are handled correctly
- [ ] State doesn't cause unnecessary re-renders

**Key Requirements:** Use local state first. Use global state only when state needs to be shared. Always update state immutably. Keep state structure flat.

---

### API Integration Rules

## Core Principles

- **Centralized API Client**: Single API client instance for consistency
- **Type Safety**: All API requests and responses are typed
- **Error Handling**: Consistent error handling across all API calls
- **Loading States**: Proper loading state management
- **Retry Logic**: Implement retry for failed requests
- **Caching**: Cache responses when appropriate

## Service Layer Structure

### Folder Organization

```
src/
├── services/
│   ├── api/
│   │   ├── client.ts          # API client configuration
│   │   ├── interceptors.ts    # Request/response interceptors
│   │   └── types.ts           # API types
│   └── endpoints/
│       ├── userService.ts
│       ├── authService.ts
│       └── productService.ts
```

### API Client Setup

```typescript
// services/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://api.example.com';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      config => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(
      url,
      data,
      config
    );
    return response.data;
  }
}

export const apiClient = new ApiClient();
```

## Type Definitions

### Request/Response Types

```typescript
// services/api/types.ts

// Base API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Error response
export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
  status: number;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Request parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

### Endpoint-Specific Types

```typescript
// types/api/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}
```

## Service Implementation

### Service Pattern

```typescript
// services/endpoints/userService.ts
import { apiClient } from '../api/client';
import { ApiResponse, PaginatedResponse, PaginationParams } from '../api/types';
import { User, CreateUserRequest, UpdateUserRequest } from '@types/api/user';

export const userService = {
  // Get all users with pagination
  getUsers: async (
    params?: PaginationParams
  ): Promise<PaginatedResponse<User>> => {
    return apiClient.get<PaginatedResponse<User>>('/users', { params });
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    return apiClient.get<User>(`/users/${id}`);
  },

  // Create user
  createUser: async (data: CreateUserRequest): Promise<User> => {
    return apiClient.post<User>('/users', data);
  },

  // Update user
  updateUser: async (id: string, data: UpdateUserRequest): Promise<User> => {
    return apiClient.put<User>(`/users/${id}`, data);
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/users/${id}`);
  },
};
```

## Error Handling

### Error Handling Utility

```typescript
// utils/errorHandler.ts
import { AxiosError } from 'axios';
import { ApiError } from '@services/api/types';

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError;

    if (apiError?.message) {
      return apiError.message;
    }

    if (apiError?.errors) {
      return Object.values(apiError.errors).flat().join(', ');
    }

    return error.message || 'An error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};
```

### Error Handling in Components

```typescript
import { useState } from 'react';
import { userService } from '@services/endpoints/userService';
import { handleApiError } from '@utils/errorHandler';
import { Alert, Snackbar } from '@mui/material';

const UserComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      setError(null);
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  return (
    <>
      {/* Component content */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};
```

## Loading States Management

### Custom Hook for API Calls

```typescript
// hooks/useApi.ts
import { useState, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>() => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });

    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
      return { data, error: null };
    } catch (error) {
      const errorMessage = handleApiError(error);
      setState({ data: null, loading: false, error: errorMessage });
      return { data: null, error: errorMessage };
    }
  }, []);

  return {
    ...state,
    execute,
  };
};

// Usage
const UserList = () => {
  const { data: users, loading, error, execute } = useApi<User[]>();

  const fetchUsers = () => {
    execute(() => userService.getUsers());
  };

  if (loading) return <CircularProgress />;
  if (error) return <ErrorMessage message={error} />;

  return <div>{/* Render users */}</div>;
};
```

## Retry Logic

### Retry Utility

```typescript
// utils/retry.ts
export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay * 2); // Exponential backoff
    }
    throw error;
  }
};

// Usage
const fetchData = async () => {
  return retry(() => userService.getUsers(), 3, 1000);
};
```

## Caching Strategies

### Simple Cache Implementation

```typescript
// utils/cache.ts
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class Cache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cache = new Cache();
```

### Cached API Service

```typescript
// services/endpoints/cachedUserService.ts
import { userService } from './userService';
import { cache } from '@utils/cache';

export const cachedUserService = {
  getUsers: async (params?: PaginationParams) => {
    const cacheKey = `users-${JSON.stringify(params)}`;
    const cached = cache.get<PaginatedResponse<User>>(cacheKey);

    if (cached) {
      return cached;
    }

    const data = await userService.getUsers(params);
    cache.set(cacheKey, data, 5 * 60 * 1000); // 5 minutes

    return data;
  },
};
```

## Request Cancellation

### AbortController Usage

```typescript
// hooks/useCancellableApi.ts
import { useEffect, useRef } from 'react';

export const useCancellableApi = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const makeRequest = async <T>(
    apiCall: (signal: AbortSignal) => Promise<T>
  ) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    return apiCall(abortControllerRef.current.signal);
  };

  return { makeRequest };
};
```

## Environment Configuration

### Environment Variables

```typescript
// config/env.ts
export const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '',
  apiTimeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000', 10),
  enableRetry: process.env.REACT_APP_ENABLE_RETRY === 'true',
  cacheEnabled: process.env.REACT_APP_CACHE_ENABLED === 'true',
};
```

## Checklist

When integrating APIs, ensure:

- [ ] API client is centralized and configured
- [ ] All requests and responses are typed
- [ ] Error handling is consistent across all API calls
- [ ] Loading states are properly managed
- [ ] Retry logic is implemented for critical requests
- [ ] Caching is used where appropriate
- [ ] Request cancellation is implemented for cleanup
- [ ] Authentication tokens are handled securely
- [ ] API interceptors are set up correctly
- [ ] Environment variables are used for configuration
- [ ] Error messages are user-friendly

**Key Requirements:** Use centralized API client. All requests/responses must be typed. Implement consistent error handling and loading states.

---

<!-- INCLUDE_RULES:END -->

## Quick Reference

- Component Standards: docs/rules/component-standards.md
- Folder Structure: docs/rules/folder-structure.md
- Testing: docs/rules/testing.md
- Routing: docs/rules/routing.md
- State Management: docs/rules/state-management.md
- API Integration: docs/rules/api-integration.md
- Full Rules: docs/README.md

## When in Doubt

Read the detailed rules in docs/rules/ directory.

## Single Source of Truth

For the complete and authoritative rules, always refer to **`AI_INSTRUCTIONS.md`** at the project root. This file ensures consistency across all AI tools and IDEs.
