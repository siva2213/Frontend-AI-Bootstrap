import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { AuthGuard } from '@routes/guards/AuthGuard';
import { RoleGuard } from '@routes/guards/RoleGuard';

/**
 * Route Component Template
 * 
 * Follows: docs/rules/routing.md
 * - Lazy loading for code splitting
 * - Protected routes with guards
 * - Suspense for loading states
 */

// Lazy load page components
const PageComponent = lazy(() => import('@pages/PageComponent'));

const LoadingFallback = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
    role="status"
    aria-label="Loading"
  >
    <CircularProgress aria-hidden="true" />
  </Box>
);

export const PageRoute = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Route */}
        <Route 
          path="/page" 
          element={<PageComponent />} 
        />
        
        {/* Protected Route */}
        <Route
          path="/protected-page"
          element={
            <AuthGuard>
              <PageComponent />
            </AuthGuard>
          }
        />
        
        {/* Role-Based Protected Route */}
        <Route
          path="/admin-page"
          element={
            <AuthGuard>
              <RoleGuard requiredRoles={['admin']}>
                <PageComponent />
              </RoleGuard>
            </AuthGuard>
          }
        />
      </Routes>
    </Suspense>
  );
};

