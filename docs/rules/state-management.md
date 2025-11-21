# State Management Rules

## Overview

This document defines the standards for state management in React applications. It covers when to use local vs global state, state structure, update patterns, and async state handling.

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

## Related Rules

- [Component Standards](./component-standards.md)
- [API Integration](./api-integration.md)
- [Folder Structure](./folder-structure.md)
