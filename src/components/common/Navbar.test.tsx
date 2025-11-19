/**
 * Navbar Component Tests
 * 
 * Follows: docs/rules/testing.md
 * - User-centric testing
 * - Accessibility testing
 * - Comprehensive coverage
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '@styles/theme';
import { Navbar } from './Navbar';

// Helper to render with theme and router
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );
};

describe('Navbar', () => {
  // Rendering tests
  describe('when rendering', () => {
    it('renders the navbar with brand name', () => {
      renderWithProviders(<Navbar />);

      expect(screen.getByText('Healthcare')).toBeInTheDocument();
      expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    });

    it('renders all navigation links on desktop', () => {
      renderWithProviders(<Navbar />);

      expect(screen.getByRole('button', { name: /navigate to home/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /navigate to about/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /navigate to services/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /navigate to contact/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /navigate to login/i })).toBeInTheDocument();
    });

    it('renders mobile menu button on mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      renderWithProviders(<Navbar />);

      expect(screen.getByRole('button', { name: /open navigation menu/i })).toBeInTheDocument();
    });
  });

  // Interaction tests
  describe('when user interacts', () => {
    it('opens mobile menu when menu button is clicked', async () => {
      const user = userEvent.setup();
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      renderWithProviders(<Navbar />);

      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      await user.click(menuButton);

      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /home/i })).toBeInTheDocument();
    });

    it('closes mobile menu when menu item is clicked', async () => {
      const user = userEvent.setup();
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      renderWithProviders(<Navbar />);

      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      await user.click(menuButton);

      const homeMenuItem = screen.getByRole('menuitem', { name: /home/i });
      await user.click(homeMenuItem);

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('handles keyboard navigation for menu button', async () => {
      const user = userEvent.setup();
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      renderWithProviders(<Navbar />);

      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      menuButton.focus();

      await user.keyboard('{Enter}');
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderWithProviders(<Navbar />);

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('has accessible navigation links', () => {
      renderWithProviders(<Navbar />);

      const homeLink = screen.getByRole('button', { name: /navigate to home/i });
      expect(homeLink).toBeInTheDocument();
    });

    it('has accessible mobile menu button', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      renderWithProviders(<Navbar />);

      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      expect(menuButton).toHaveAttribute('aria-haspopup', 'true');
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('handles onMenuClick prop when provided', async () => {
      const user = userEvent.setup();
      const handleMenuClick = jest.fn();
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      });

      renderWithProviders(<Navbar onMenuClick={handleMenuClick} />);

      const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
      await user.click(menuButton);

      expect(handleMenuClick).toHaveBeenCalledTimes(1);
    });
  });
});

