/**
 * PatientTable Component Tests
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
import { PatientTable } from '@components/common/PatientTable';
import type { Patient } from '@types/common/Patient';

// Helper to render with theme
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    status: 'active',
    dateOfBirth: '1985-03-15',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-20',
    primaryPhysician: 'Dr. Sarah Johnson',
  },
  {
    id: '2',
    name: 'Jane Smith',
    status: 'pending',
    dateOfBirth: '1990-07-22',
    email: 'jane.smith@example.com',
    phone: '(555) 234-5678',
    lastVisit: '2024-01-10',
    nextAppointment: '2024-02-15',
    primaryPhysician: 'Dr. Michael Chen',
  },
];

describe('PatientTable', () => {
  // Rendering tests
  describe('when rendering', () => {
    it('renders the table with patient data', () => {
      renderWithProviders(<PatientTable patients={mockPatients} />);

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('renders all table headers', () => {
      renderWithProviders(<PatientTable patients={mockPatients} />);

      expect(screen.getByText('Patient Name')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Date of Birth')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Phone')).toBeInTheDocument();
      expect(screen.getByText('Last Visit')).toBeInTheDocument();
      expect(screen.getByText('Next Appointment')).toBeInTheDocument();
      expect(screen.getByText('Primary Physician')).toBeInTheDocument();
    });

    it('displays status badges with correct labels', () => {
      renderWithProviders(<PatientTable patients={mockPatients} />);

      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    it('displays empty state when no patients provided', () => {
      renderWithProviders(<PatientTable patients={[]} />);

      expect(screen.getByText('No patients found')).toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  // Interaction tests
  describe('when user interacts', () => {
    it('calls onRowClick when row is clicked', async () => {
      const user = userEvent.setup();
      const handleRowClick = jest.fn();

      renderWithProviders(
        <PatientTable patients={mockPatients} onRowClick={handleRowClick} />
      );

      const firstRow = screen.getByRole('row', {
        name: /patient john doe/i,
      });
      await user.click(firstRow);

      expect(handleRowClick).toHaveBeenCalledTimes(1);
      expect(handleRowClick).toHaveBeenCalledWith(mockPatients[0]);
    });

    it('handles keyboard navigation for table rows', async () => {
      const user = userEvent.setup();
      const handleRowClick = jest.fn();

      renderWithProviders(
        <PatientTable patients={mockPatients} onRowClick={handleRowClick} />
      );

      const firstRow = screen.getByRole('row', {
        name: /patient john doe/i,
      });
      firstRow.focus();

      await user.keyboard('{Enter}');
      expect(handleRowClick).toHaveBeenCalledTimes(1);
      expect(handleRowClick).toHaveBeenCalledWith(mockPatients[0]);
    });

    it('handles space key for table rows', async () => {
      const user = userEvent.setup();
      const handleRowClick = jest.fn();

      renderWithProviders(
        <PatientTable patients={mockPatients} onRowClick={handleRowClick} />
      );

      const firstRow = screen.getByRole('row', {
        name: /patient john doe/i,
      });
      firstRow.focus();

      await user.keyboard(' ');
      expect(handleRowClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onRowClick when not provided', async () => {
      const user = userEvent.setup();

      renderWithProviders(<PatientTable patients={mockPatients} />);

      const firstRow = screen.getByRole('row', {
        name: /patient john doe/i,
      });
      await user.click(firstRow);

      // Should not throw error
      expect(firstRow).toBeInTheDocument();
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderWithProviders(<PatientTable patients={mockPatients} />);

      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('aria-label', 'Patient information table');

      const tableContainer = screen.getByRole('region', {
        name: /patient data table/i,
      });
      expect(tableContainer).toBeInTheDocument();
    });

    it('has accessible table headers', () => {
      renderWithProviders(<PatientTable patients={mockPatients} />);

      const headers = screen.getAllByRole('columnheader');
      expect(headers.length).toBeGreaterThan(0);
    });

    it('has accessible row labels', () => {
      renderWithProviders(<PatientTable patients={mockPatients} />);

      const firstRow = screen.getByRole('row', {
        name: /patient john doe/i,
      });
      expect(firstRow).toHaveAttribute('aria-label');
    });

    it('has accessible status badges', () => {
      renderWithProviders(<PatientTable patients={mockPatients} />);

      const activeStatus = screen.getByText('Active');
      expect(activeStatus).toHaveAttribute('aria-label', 'Status: Active');
    });

    it('has proper table structure with semantic HTML', () => {
      renderWithProviders(<PatientTable patients={mockPatients} />);

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();

      const tableHead = table.querySelector('thead');
      expect(tableHead).toBeInTheDocument();

      const tableBody = table.querySelector('tbody');
      expect(tableBody).toBeInTheDocument();
    });
  });

  // Data display tests
  describe('data display', () => {
    it('formats dates correctly', () => {
      renderWithProviders(<PatientTable patients={mockPatients} />);

      // Check if formatted date appears (format may vary by locale)
      expect(screen.getByText(/jan/i)).toBeInTheDocument();
    });

    it('displays patient information correctly', () => {
      renderWithProviders(<PatientTable patients={mockPatients} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
      expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument();
    });

    it('displays N/A for missing next appointment', () => {
      const patientWithoutAppointment: Patient = {
        ...mockPatients[0],
        nextAppointment: undefined,
      };

      renderWithProviders(
        <PatientTable patients={[patientWithoutAppointment]} />
      );

      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('handles invalid date strings gracefully', () => {
      const patientWithInvalidDate: Patient = {
        ...mockPatients[0],
        dateOfBirth: 'invalid-date',
        lastVisit: 'invalid-date',
      };

      renderWithProviders(<PatientTable patients={[patientWithInvalidDate]} />);

      expect(screen.getByText('invalid-date')).toBeInTheDocument();
    });

    it('handles large number of patients', () => {
      const manyPatients: Patient[] = Array.from({ length: 100 }, (_, i) => ({
        ...mockPatients[0],
        id: `patient-${i}`,
        name: `Patient ${i}`,
      }));

      renderWithProviders(<PatientTable patients={manyPatients} />);

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Patient 0')).toBeInTheDocument();
    });
  });
});
