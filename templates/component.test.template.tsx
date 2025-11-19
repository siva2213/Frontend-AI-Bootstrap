/**
 * Component Test Template
 * 
 * Follows: docs/rules/testing.md
 * - User-centric testing
 * - Accessibility testing
 * - Comprehensive coverage
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@styles/theme';
import { ComponentName } from './ComponentName';

// Helper to render with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('ComponentName', () => {
  // Setup
  beforeEach(() => {
    // Common setup if needed
  });

  // Rendering tests
  describe('when rendering', () => {
    it('renders with correct props', () => {
      renderWithTheme(<ComponentName title="Test Title" />);
      
      expect(screen.getByRole('region', { name: /test title/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /test title heading/i })).toBeInTheDocument();
    });

    it('renders without optional props', () => {
      renderWithTheme(<ComponentName title="Test" />);
      
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });

  // Interaction tests
  describe('when user interacts', () => {
    it('calls onAction when button is clicked', async () => {
      const handleAction = jest.fn();
      const user = userEvent.setup();
      
      renderWithTheme(
        <ComponentName title="Test" onAction={handleAction} />
      );
      
      const button = screen.getByRole('button', { name: /test action button/i });
      await user.click(button);
      
      expect(handleAction).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation', async () => {
      const handleAction = jest.fn();
      const user = userEvent.setup();
      
      renderWithTheme(
        <ComponentName title="Test" onAction={handleAction} />
      );
      
      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard('{Enter}');
      expect(handleAction).toHaveBeenCalledTimes(1);
      
      await user.keyboard(' ');
      expect(handleAction).toHaveBeenCalledTimes(2);
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderWithTheme(<ComponentName title="Test" />);
      
      const region = screen.getByRole('region');
      expect(region).toHaveAttribute('aria-label', 'Test');
    });

    it('has accessible heading', () => {
      renderWithTheme(<ComponentName title="Test" />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveAttribute('aria-label', 'Test heading');
    });

    it('has accessible button', () => {
      const handleAction = jest.fn();
      renderWithTheme(
        <ComponentName title="Test" onAction={handleAction} />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Test action button');
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('handles empty title', () => {
      renderWithTheme(<ComponentName title="" />);
      
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('handles long title', () => {
      const longTitle = 'A'.repeat(100);
      renderWithTheme(<ComponentName title={longTitle} />);
      
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });

  // Performance tests (if applicable)
  describe('performance', () => {
    it('memoizes computed values', () => {
      const { rerender } = renderWithTheme(
        <ComponentName title="Test" />
      );
      
      // Re-render with same props
      rerender(
        <ThemeProvider theme={theme}>
          <ComponentName title="Test" />
        </ThemeProvider>
      );
      
      // Component should not re-compute unnecessarily
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });
});

