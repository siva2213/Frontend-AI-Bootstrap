# Testing Rules

## Overview

This document defines the standards for testing React applications using Jest and React Testing Library. It covers component testing, hook testing, API mocking, accessibility testing, and test organization.

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
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
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
        data: [
          { id: '1', name: 'User 1' },
        ],
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

## Related Rules

- [Component Standards](./component-standards.md)
- [API Integration](./api-integration.md)
- [Folder Structure](./folder-structure.md)

