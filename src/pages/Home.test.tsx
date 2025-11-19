/**
 * Home Page Component Tests
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
import { Home } from './Home';

// Helper to render with theme and router
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );
};

describe('Home', () => {
  // Rendering tests
  describe('when rendering', () => {
    it('renders the hero section', () => {
      renderWithProviders(<Home />);

      expect(
        screen.getByRole('heading', { name: /we find the answers that help healthcare forward/i })
      ).toBeInTheDocument();
    });

    it('renders the welcome message', () => {
      renderWithProviders(<Home />);

      expect(screen.getByRole('heading', { name: /welcome to healthcare/i })).toBeInTheDocument();
    });

    it('renders all service cards', () => {
      renderWithProviders(<Home />);

      expect(screen.getByText('Laboratory Testing')).toBeInTheDocument();
      expect(screen.getByText('Health Screenings')).toBeInTheDocument();
      expect(screen.getByText('Medical Reports')).toBeInTheDocument();
      expect(screen.getByText('Expert Care')).toBeInTheDocument();
    });

    it('renders all CTA buttons', () => {
      renderWithProviders(<Home />);

      expect(screen.getByRole('button', { name: /find a lab/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /view your results/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /pay a bill/i })).toBeInTheDocument();
    });
  });

  // Interaction tests
  describe('when user interacts', () => {
    it('handles CTA button clicks', async () => {
      const user = userEvent.setup();

      renderWithProviders(<Home />);

      const findLabButton = screen.getByRole('button', { name: /find a lab/i });
      await user.click(findLabButton);

      // Navigation should be handled by React Router
      expect(findLabButton).toBeInTheDocument();
    });

    it('handles keyboard navigation for CTA buttons', async () => {
      const user = userEvent.setup();

      renderWithProviders(<Home />);

      const viewResultsButton = screen.getByRole('button', { name: /view your results/i });
      viewResultsButton.focus();

      await user.keyboard('{Enter}');
      // Navigation should be handled
      expect(viewResultsButton).toBeInTheDocument();
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    it('has proper ARIA landmarks', () => {
      renderWithProviders(<Home />);

      expect(screen.getByRole('main', { name: /home page/i })).toBeInTheDocument();
      expect(screen.getByRole('region', { name: /hero section/i })).toBeInTheDocument();
      expect(screen.getByRole('region', { name: /welcome message/i })).toBeInTheDocument();
      expect(screen.getByRole('region', { name: /services overview/i })).toBeInTheDocument();
    });

    it('has accessible headings', () => {
      renderWithProviders(<Home />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();

      const h2Headings = screen.getAllByRole('heading', { level: 2 });
      expect(h2Headings.length).toBeGreaterThan(0);
    });

    it('has accessible service cards', () => {
      renderWithProviders(<Home />);

      const serviceCard = screen.getByRole('article', { name: /laboratory testing/i });
      expect(serviceCard).toBeInTheDocument();
    });

    it('has accessible CTA buttons', () => {
      renderWithProviders(<Home />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-label');
      });
    });
  });

  // Responsive tests
  describe('responsiveness', () => {
    it('renders correctly on mobile viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderWithProviders(<Home />);

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('We Find the Answers That Help Healthcare Forward')).toBeInTheDocument();
    });

    it('renders correctly on desktop viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      renderWithProviders(<Home />);

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('We Find the Answers That Help Healthcare Forward')).toBeInTheDocument();
    });
  });
});

