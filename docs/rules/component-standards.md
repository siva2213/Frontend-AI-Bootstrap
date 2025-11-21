# Component Standards

## Overview

This document defines the standards for creating React components in this project. Every component must meet three core requirements: **Performance & Optimization**, **Responsiveness**, and **CSP & ADA Compliance**.

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

## Component Template Structure

Every component should follow this structure:

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
  // Memoized values
  // Callbacks
  // Effects

  return (
    <Box
      // Material UI responsive props
      sx={{
        // Responsive styles
      }}
      className="tailwind-classes"
      // Accessibility attributes
      role=""
      aria-label=""
    >
      {/* Component content */}
    </Box>
  );
});

Component.displayName = 'Component';
```

## Related Rules

- [Folder Structure](./folder-structure.md)
- [Testing Rules](./testing.md)
- [AI Tool Integration](./ai-tool-integration.md)
