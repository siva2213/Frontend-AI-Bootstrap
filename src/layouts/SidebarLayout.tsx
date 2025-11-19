import React, { memo, useMemo, useCallback } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Fab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import type { SidebarLink } from '@/types/navigation';

/**
 * SidebarLayout Component
 *
 * Follows: docs/rules/component-standards.md
 * - Performance: Memoized with React.memo, uses useMemo/useCallback
 * - Responsiveness: Always visible on desktop (md+), collapsible drawer on mobile
 * - Accessibility: ARIA attributes, keyboard navigation, semantic HTML
 *
 * Features:
 * - Always visible on desktop (md+)
 * - Collapsible drawer on mobile (xs-sm)
 * - Icons for each link
 * - Active link highlighting
 */

interface SidebarLayoutProps {
  open?: boolean;
  onClose?: () => void;
  onToggle?: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
}

const SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    label: 'Patients',
    path: '/patients',
    icon: <PeopleIcon />,
  },
  {
    label: 'Appointments',
    path: '/appointments',
    icon: <CalendarTodayIcon />,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <SettingsIcon />,
  },
];

const DRAWER_WIDTH = 240;

export const SidebarLayout = memo<SidebarLayoutProps>(
  ({ open = true, onClose, onToggle, variant }) => {
    const theme = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Determine drawer variant based on screen size
    const drawerVariant = useMemo(() => {
      if (variant) return variant;
      return isMobile ? 'temporary' : 'permanent';
    }, [isMobile, variant]);

    // Memoized sidebar links
    const sidebarLinks = useMemo(() => SIDEBAR_LINKS, []);

    // Handle navigation click
    const handleNavigateClick = useCallback(() => {
      if (isMobile && onClose) {
        onClose();
      }
    }, [isMobile, onClose]);

    // Handle navigation keyboard
    const handleNavigateKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (isMobile && onClose) {
            onClose();
          }
        }
      },
      [isMobile, onClose]
    );

    // Handle toggle button keyboard
    const handleToggleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onToggle) {
            onToggle();
          }
        }
      },
      [onToggle]
    );

    // Memoized list items
    const listItems = useMemo(
      () =>
        sidebarLinks.map(link => {
          const isActive = location.pathname === link.path;

          const handleClick = handleNavigateClick;
          const handleKeyDown = handleNavigateKeyDown;

          return (
            <ListItem key={link.path} disablePadding>
              <ListItemButton
                component={Link}
                to={link.path}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                selected={isActive}
                sx={{
                  minHeight: 44,
                  padding: { xs: '12px 16px', sm: '14px 20px' },
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: -2,
                  },
                }}
                aria-label={`Navigate to ${link.label}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? 'primary.contrastText' : 'text.primary',
                  }}
                  aria-hidden="true"
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        }),
      [
        sidebarLinks,
        location.pathname,
        handleNavigateClick,
        handleNavigateKeyDown,
        theme.palette,
      ]
    );

    const drawerContent = (
      <Box
        component="nav"
        role="navigation"
        aria-label="Sidebar navigation"
        sx={{
          width: { xs: DRAWER_WIDTH, sm: DRAWER_WIDTH },
          flexShrink: 0,
          height: { xs: '100%', sm: '100%' },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column' },
        }}
      >
        <List
          component="ul"
          role="list"
          aria-label="Sidebar links"
          sx={{
            padding: { xs: '8px 0', sm: '16px 0' },
            flexGrow: 1,
            overflowY: 'auto',
          }}
        >
          {listItems}
        </List>
      </Box>
    );

    if (drawerVariant === 'permanent') {
      return (
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              position: 'relative',
              height: '100vh',
              borderRight: 'none',
              top: 0,
              left: 0,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      );
    }

    return (
      <>
        {/* Floating Action Button for Mobile/Tablet */}
        {onToggle && (
          <Fab
            color="primary"
            aria-label="Toggle sidebar"
            onClick={onToggle}
            onKeyDown={handleToggleKeyDown}
            sx={{
              position: 'fixed',
              bottom: 24,
              left: 24,
              zIndex: theme.zIndex.speedDial,
              display: { xs: 'flex', md: 'none' },
              minWidth: 56,
              minHeight: 56,
            }}
          >
            <MenuIcon />
          </Fab>
        )}

        {/* Temporary Drawer for Mobile/Tablet */}
        <Drawer
          variant={drawerVariant}
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              height: '100%',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </>
    );
  }
);

SidebarLayout.displayName = 'SidebarLayout';
