# Common Patterns

Quick reference for common code patterns used throughout the project.

## Component Pattern

```typescript
import React, { memo, useMemo, useCallback } from 'react';
import { Box } from '@mui/material';

interface ComponentProps {
  // Props
}

export const Component = memo<ComponentProps>(({ 
  // Destructure props
}) => {
  // Memoized values
  const value = useMemo(() => {
    // Calculation
  }, [dependencies]);

  // Memoized callbacks
  const handleClick = useCallback(() => {
    // Handler
  }, [dependencies]);

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
      }}
      className="tailwind-classes"
      role="region"
      aria-label="Description"
    >
      {/* Content */}
    </Box>
  );
});

Component.displayName = 'Component';
```

## Custom Hook Pattern

```typescript
import { useState, useCallback } from 'react';

export const useCustomHook = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return { value, updateValue };
};
```

## API Service Pattern

```typescript
import { apiClient } from '@services/api/client';

export const entityService = {
  getEntity: async (id: string) => {
    return apiClient.get<Entity>(`/entities/${id}`);
  },
  
  createEntity: async (data: CreateRequest) => {
    return apiClient.post<Entity>('/entities', data);
  },
};
```

## Context Pattern

```typescript
import { createContext, useContext, useState, ReactNode } from 'react';

interface ContextType {
  value: string;
  setValue: (value: string) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState('');

  return (
    <Context.Provider value={{ value, setValue }}>
      {children}
    </Context.Provider>
  );
};

export const useContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useContext must be used within Provider');
  }
  return context;
};
```

## Form Pattern

```typescript
import { useState } from 'react';
import { TextField, Button } from '@mui/material';

const FormComponent = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation and submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={!!errors.email}
        helperText={errors.email}
        required
        aria-required="true"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

## Loading State Pattern

```typescript
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

const DataComponent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiService.getData();
      setData(result);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return <div>{/* Render data */}</div>;
};
```

## Responsive Pattern

```typescript
import { Box, useMediaQuery, useTheme } from '@mui/material';

const ResponsiveComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        fontSize: { xs: '0.875rem', md: '1rem' },
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {/* Content */}
    </Box>
  );
};
```

## Error Boundary Pattern

```typescript
import { Component, ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

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

## Route Guard Pattern

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <CircularProgress />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
```

## Test Pattern

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<Component />);
    
    await user.click(screen.getByRole('button'));
    // Assertions
  });
});
```

## Material UI + Tailwind Pattern

```typescript
import { Box, Button } from '@mui/material';

const HybridComponent = () => {
  return (
    <Box
      sx={{
        // Material UI responsive styles
        padding: { xs: 2, md: 4 },
      }}
      className="flex flex-col md:flex-row gap-4"
    >
      <Button className="w-full md:w-auto">
        Click me
      </Button>
    </Box>
  );
};
```

## Quick Reference

**Common Imports:**
```typescript
// React
import React, { memo, useState, useEffect, useMemo, useCallback } from 'react';

// Material UI
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material/styles';

// Testing
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Routing
import { useNavigate, useParams, Link } from 'react-router-dom';
```

---

**Quick Copy for AI Prompts:**

```
Use these common patterns:
- Component: memo, useMemo, useCallback, Material UI + Tailwind
- Hooks: useState, useEffect, custom hooks
- API: apiClient with typed requests/responses
- Forms: Controlled inputs, validation, error handling
- Loading: Loading states, error states, empty states
- Responsive: Material UI breakpoints + Tailwind classes
```

