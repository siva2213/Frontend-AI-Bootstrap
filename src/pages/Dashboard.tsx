import React, { memo, useMemo, useCallback } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { PatientTable } from '@components/common/PatientTable';
import type { Patient } from '../types/common/Patient';

/**
 * Dashboard Page Component
 *
 * Follows: docs/rules/component-standards.md
 * - Performance: Memoized with React.memo, uses useMemo/useCallback
 * - Responsiveness: Mobile-first responsive layout
 * - Accessibility: Full ARIA attributes, semantic HTML
 *
 * Features:
 * - Displays patient data in a table
 * - Responsive design for all screen sizes
 * - Accessible table with keyboard navigation
 */

// Dummy patient data
const DUMMY_PATIENTS: Patient[] = [
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
  {
    id: '3',
    name: 'Robert Williams',
    status: 'completed',
    dateOfBirth: '1978-11-08',
    email: 'robert.williams@example.com',
    phone: '(555) 345-6789',
    lastVisit: '2024-01-20',
    primaryPhysician: 'Dr. Emily Davis',
  },
  {
    id: '4',
    name: 'Maria Garcia',
    status: 'active',
    dateOfBirth: '1992-05-30',
    email: 'maria.garcia@example.com',
    phone: '(555) 456-7890',
    lastVisit: '2024-01-18',
    nextAppointment: '2024-02-25',
    primaryPhysician: 'Dr. Sarah Johnson',
  },
  {
    id: '5',
    name: 'David Brown',
    status: 'cancelled',
    dateOfBirth: '1987-09-14',
    email: 'david.brown@example.com',
    phone: '(555) 567-8901',
    lastVisit: '2023-12-05',
    primaryPhysician: 'Dr. Michael Chen',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    status: 'active',
    dateOfBirth: '1995-02-28',
    email: 'lisa.anderson@example.com',
    phone: '(555) 678-9012',
    lastVisit: '2024-01-22',
    nextAppointment: '2024-03-01',
    primaryPhysician: 'Dr. Emily Davis',
  },
  {
    id: '7',
    name: 'James Wilson',
    status: 'pending',
    dateOfBirth: '1983-12-10',
    email: 'james.wilson@example.com',
    phone: '(555) 789-0123',
    lastVisit: '2024-01-12',
    nextAppointment: '2024-02-18',
    primaryPhysician: 'Dr. Sarah Johnson',
  },
  {
    id: '8',
    name: 'Patricia Martinez',
    status: 'completed',
    dateOfBirth: '1991-06-18',
    email: 'patricia.martinez@example.com',
    phone: '(555) 890-1234',
    lastVisit: '2024-01-25',
    primaryPhysician: 'Dr. Michael Chen',
  },
];

export const Dashboard = memo(() => {
  // Memoized patients data
  const patients = useMemo(() => DUMMY_PATIENTS, []);

  // Handle patient row click
  const handlePatientClick = useCallback((patient: Patient) => {
    // In a real application, this would navigate to patient details
    // Example: navigate(`/patients/${patient.id}`);
    // For now, this is a placeholder for future navigation implementation
    void patient; // Acknowledge parameter usage
  }, []);

  return (
    <Box
      component="main"
      role="main"
      aria-label="Dashboard page"
      sx={{
        minHeight: '100%',
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box
          component="section"
          role="region"
          aria-label="Dashboard header"
          sx={{
            marginBottom: { xs: 3, sm: 4 },
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 700,
              marginBottom: 1,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              color: 'text.primary',
            }}
            aria-label="Dashboard heading"
          >
            Patient Dashboard
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            View and manage patient information
          </Typography>
        </Box>

        {/* Patient Table */}
        <Box
          component="section"
          role="region"
          aria-label="Patient data table section"
        >
          <PatientTable patients={patients} onRowClick={handlePatientClick} />
        </Box>
      </Container>
    </Box>
  );
});

Dashboard.displayName = 'Dashboard';
