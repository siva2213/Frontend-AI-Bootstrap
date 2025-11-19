import React, { memo, useMemo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import type { Patient, PatientStatus } from '@/types/common/Patient';

/**
 * PatientTable Component
 *
 * Follows: docs/rules/component-standards.md
 * - Performance: Memoized with React.memo, uses useMemo/useCallback
 * - Responsiveness: Mobile-first design with Material UI breakpoints
 * - Accessibility: ARIA attributes, keyboard navigation, semantic HTML
 *
 * Features:
 * - Displays patient data in a responsive table
 * - Status badges with color coding
 * - Mobile-responsive layout
 * - Full keyboard navigation support
 */

interface PatientTableProps {
  patients: Patient[];
  onRowClick?: (patient: Patient) => void;
}

const STATUS_COLORS: Record<
  PatientStatus,
  'success' | 'warning' | 'info' | 'error'
> = {
  active: 'success',
  pending: 'warning',
  completed: 'info',
  cancelled: 'error',
};

const STATUS_LABELS: Record<PatientStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const PatientTable = memo<PatientTableProps>(
  ({ patients, onRowClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Memoized table headers
    const tableHeaders = useMemo(
      () => [
        'Patient Name',
        'Status',
        'Date of Birth',
        'Email',
        'Phone',
        'Last Visit',
        'Next Appointment',
        'Primary Physician',
      ],
      []
    );

    // Handle row click
    const handleRowClick = useCallback(
      (patient: Patient) => {
        onRowClick?.(patient);
      },
      [onRowClick]
    );

    // Handle row keyboard navigation
    const handleRowKeyDown = useCallback(
      (patient: Patient, e: React.KeyboardEvent<HTMLTableRowElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRowClick(patient);
        }
      },
      [handleRowClick]
    );

    // Format date helper
    const formatDate = useCallback((dateString: string) => {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } catch {
        return dateString;
      }
    }, []);

    // Memoized table rows
    const tableRows = useMemo(
      () =>
        patients.map(patient => {
          const handleClick = () => handleRowClick(patient);
          const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) =>
            handleRowKeyDown(patient, e);

          return (
            <TableRow
              key={patient.id}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              sx={{
                cursor: onRowClick ? 'pointer' : 'default',
                minHeight: { xs: 44, sm: 48 },
                '&:hover': onRowClick
                  ? {
                      backgroundColor: 'action.hover',
                    }
                  : {},
                '&:focus': onRowClick
                  ? {
                      backgroundColor: 'action.focus',
                      outline: `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: '-2px',
                    }
                  : {},
              }}
              role={onRowClick ? 'button' : 'row'}
              tabIndex={onRowClick ? 0 : undefined}
              aria-label={`Patient ${patient.name}, Status: ${STATUS_LABELS[patient.status]}`}
            >
              <TableCell
                component="td"
                sx={{
                  padding: { xs: '8px 4px', sm: '12px 8px', md: '16px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {patient.name}
                </Typography>
              </TableCell>
              <TableCell
                component="td"
                sx={{
                  padding: { xs: '8px 4px', sm: '12px 8px', md: '16px' },
                }}
              >
                <Chip
                  label={STATUS_LABELS[patient.status]}
                  color={STATUS_COLORS[patient.status]}
                  size="small"
                  sx={{
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    height: { xs: 20, sm: 24 },
                  }}
                  aria-label={`Status: ${STATUS_LABELS[patient.status]}`}
                />
              </TableCell>
              <TableCell
                component="td"
                sx={{
                  padding: { xs: '8px 4px', sm: '12px 8px', md: '16px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', md: 'table-cell' },
                }}
              >
                {formatDate(patient.dateOfBirth)}
              </TableCell>
              <TableCell
                component="td"
                sx={{
                  padding: { xs: '8px 4px', sm: '12px 8px', md: '16px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', lg: 'table-cell' },
                }}
              >
                {patient.email}
              </TableCell>
              <TableCell
                component="td"
                sx={{
                  padding: { xs: '8px 4px', sm: '12px 8px', md: '16px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', sm: 'table-cell' },
                }}
              >
                {patient.phone}
              </TableCell>
              <TableCell
                component="td"
                sx={{
                  padding: { xs: '8px 4px', sm: '12px 8px', md: '16px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                {formatDate(patient.lastVisit)}
              </TableCell>
              <TableCell
                component="td"
                sx={{
                  padding: { xs: '8px 4px', sm: '12px 8px', md: '16px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', lg: 'table-cell' },
                }}
              >
                {patient.nextAppointment
                  ? formatDate(patient.nextAppointment)
                  : 'N/A'}
              </TableCell>
              <TableCell
                component="td"
                sx={{
                  padding: { xs: '8px 4px', sm: '12px 8px', md: '16px' },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  display: { xs: 'none', md: 'table-cell' },
                }}
              >
                {patient.primaryPhysician}
              </TableCell>
            </TableRow>
          );
        }),
      [
        patients,
        handleRowClick,
        handleRowKeyDown,
        formatDate,
        onRowClick,
        theme,
      ]
    );

    // Memoized table header cells
    const headerCells = useMemo(
      () =>
        tableHeaders.map(header => {
          const isHiddenOnMobile =
            (header === 'Date of Birth' && isMobile) ||
            (header === 'Email' && isMobile) ||
            (header === 'Phone' && isMobile) ||
            (header === 'Next Appointment' && isMobile) ||
            (header === 'Primary Physician' && isMobile);

          return (
            <TableCell
              key={header}
              component="th"
              scope="col"
              sx={{
                padding: { xs: '8px 4px', sm: '12px 8px', md: '16px' },
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                display: isHiddenOnMobile ? 'none' : 'table-cell',
              }}
              aria-label={header}
            >
              {header}
            </TableCell>
          );
        }),
      [tableHeaders, isMobile]
    );

    if (patients.length === 0) {
      return (
        <Box
          sx={{
            padding: { xs: 3, sm: 4 },
            textAlign: 'center',
          }}
          role="status"
          aria-label="No patients found"
        >
          <Typography variant="body1" color="text.secondary">
            No patients found
          </Typography>
        </Box>
      );
    }

    return (
      <TableContainer
        component={Paper}
        sx={{
          marginTop: { xs: 2, sm: 3 },
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'action.disabled',
            borderRadius: 4,
          },
        }}
        role="region"
        aria-label="Patient data table"
      >
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="Patient information table"
          role="table"
        >
          <TableHead>
            <TableRow role="row">{headerCells}</TableRow>
          </TableHead>
          <TableBody role="rowgroup">{tableRows}</TableBody>
        </Table>
      </TableContainer>
    );
  }
);

PatientTable.displayName = 'PatientTable';
