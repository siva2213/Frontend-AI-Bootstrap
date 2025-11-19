import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@styles/theme';
import { AppRoutes } from '@routes/index';
import '@styles/globals.css';

/**
 * Main App Component
 * 
 * Wraps the application with:
 * - Material UI ThemeProvider
 * - CssBaseline for consistent styling
 * - AppRoutes for routing
 */

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;

