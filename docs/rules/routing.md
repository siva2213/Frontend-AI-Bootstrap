# Routing Rules

## Overview

This document defines the standards for implementing routing in React applications. It covers route structure, naming conventions, protected routes, and navigation patterns.

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

## Related Rules

- [Component Standards](./component-standards.md)
- [State Management](./state-management.md)
- [Folder Structure](./folder-structure.md)
