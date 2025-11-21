# API Integration Rules

## Overview

This document defines the standards for API integration in React applications. It covers service layer structure, error handling, type definitions, loading states, and API client configuration.

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

## Related Rules

- [State Management](./state-management.md)
- [Component Standards](./component-standards.md)
- [Testing Rules](./testing.md)
