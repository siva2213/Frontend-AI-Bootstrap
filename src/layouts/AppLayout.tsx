import React, { memo, useMemo, useCallback, useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Navbar } from '@components/common/Navbar';
import { Sidebar } from '@components/layout/Sidebar';

/**
 * AppLayout Component
 * 
 * Follows: docs/rules/component-standards.md
 * - Performance: Memoized with React.memo, uses useMemo/useCallback
 * - Responsiveness: Mobile-first design with Material UI breakpoints
 * - Accessibility: Proper layout structure and ARIA landmarks
 * 
 * Features:
 * - Combines Navbar and Sidebar
 * - Handles responsive layout logic
 * - Manages sidebar state (open/closed on mobile)
 * - Uses Material UI Box/Grid for layout structure
 */

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = memo<AppLayoutProps>(({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarMenuOpen, setNavbarMenuOpen] = useState(false);

  // Handle sidebar toggle for mobile/tablet
  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Handle sidebar close
  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Handle navbar menu toggle (separate from sidebar)
  const handleNavbarMenuToggle = useCallback(() => {
    setNavbarMenuOpen((prev) => !prev);
  }, []);

  // Memoized layout structure
  const layoutContent = useMemo(
    () => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: 'background.default',
          overflow: 'hidden',
        }}
      >
        {/* Navbar */}
        <Box
          component="header"
          role="banner"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: theme.zIndex.appBar,
            flexShrink: 0,
          }}
        >
          <Navbar 
            onMenuClick={isMobile ? handleNavbarMenuToggle : undefined}
            menuOpen={navbarMenuOpen}
          />
        </Box>

        {/* Main Content Area */}
        <Box
          component="main"
          role="main"
          sx={{
            display: 'flex',
            flex: 1,
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Desktop Sidebar - Full Height */}
          <Box
            component="aside"
            role="complementary"
            aria-label="Sidebar navigation"
            sx={{
              display: { xs: 'none', md: 'block' },
              flexShrink: 0,
            }}
          >
            <Sidebar variant="permanent" />
          </Box>

          {/* Mobile/Tablet Sidebar - Floating */}
          <Sidebar
            variant="temporary"
            open={sidebarOpen}
            onClose={handleSidebarClose}
            onToggle={handleSidebarToggle}
          />

          {/* Page Content */}
          <Box
            component="section"
            sx={{
              flexGrow: 1,
              padding: { xs: 2, sm: 3, md: 4 },
              width: { xs: '100%', md: `calc(100% - 240px)` },
              maxWidth: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              height: '100%',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    ),
    [
      children,
      isMobile,
      sidebarOpen,
      navbarMenuOpen,
      handleSidebarToggle,
      handleSidebarClose,
      handleNavbarMenuToggle,
      theme.zIndex.appBar,
    ]
  );

  return layoutContent;
});

AppLayout.displayName = 'AppLayout';

