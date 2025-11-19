import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { AppLayout } from '@layouts/AppLayout';

/**
 * Route Configuration
 * 
 * Follows: docs/rules/routing.md
 * - Lazy loading for route-level components
 * - Suspense with loading fallback
 * - Centralized route configuration
 */

// Lazy load pages
const Home = lazy(() => import('@pages/Home').then((module) => ({ default: module.Home })));
const About = lazy(() => import('@pages/About').then((module) => ({ default: module.About })));
const Services = lazy(() =>
  import('@pages/Services').then((module) => ({ default: module.Services }))
);
const Contact = lazy(() =>
  import('@pages/Contact').then((module) => ({ default: module.Contact }))
);
const Login = lazy(() => import('@pages/Login').then((module) => ({ default: module.Login })));

// Loading fallback component
const LoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    role="status"
    aria-label="Loading"
  >
    <CircularProgress aria-label="Loading page" />
  </Box>
);

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/about"
            element={
              <AppLayout>
                <About />
              </AppLayout>
            }
          />
          <Route
            path="/services"
            element={
              <AppLayout>
                <Services />
              </AppLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <AppLayout>
                <Contact />
              </AppLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AppLayout>
                <Login />
              </AppLayout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

