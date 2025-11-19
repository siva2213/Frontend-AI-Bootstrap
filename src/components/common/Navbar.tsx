import React, { memo, useMemo, useCallback, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import type { NavLink } from '../../types/navigation';

/**
 * Navbar Component
 * 
 * Follows: docs/rules/component-standards.md
 * - Performance: Memoized with React.memo, uses useMemo/useCallback
 * - Responsiveness: Mobile-first design with Material UI breakpoints
 * - Accessibility: ARIA attributes, keyboard navigation, semantic HTML
 * 
 * Features:
 * - Horizontal navigation with Material UI AppBar
 * - Mobile hamburger menu for smaller screens
 * - LabCorp-inspired styling (blues/purples)
 */

interface NavbarProps {
  onMenuClick?: () => void;
  menuOpen?: boolean;
}

const NAVBAR_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
  { label: 'Login', path: '/login' },
];

export const Navbar = memo<NavbarProps>(({ onMenuClick, menuOpen: externalMenuOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [internalMenuAnchor, setInternalMenuAnchor] = useState<null | HTMLElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  // Use external menu state if provided, otherwise use internal state
  const isMenuOpen = externalMenuOpen !== undefined ? externalMenuOpen : Boolean(internalMenuAnchor);
  
  // Get the anchor element for the menu - prefer internal anchor, fallback to ref
  const mobileMenuAnchor = internalMenuAnchor || (isMenuOpen ? menuButtonRef.current : null);

  // Memoized navigation links
  const navLinks = useMemo(() => NAVBAR_LINKS, []);

  // Handle mobile menu open
  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (onMenuClick) {
      // Set anchor for external control
      if (!internalMenuAnchor) {
        setInternalMenuAnchor(event.currentTarget);
      }
      onMenuClick();
    } else {
      setInternalMenuAnchor(event.currentTarget);
    }
  }, [onMenuClick, internalMenuAnchor]);

  // Handle mobile menu close
  const handleMenuClose = useCallback(() => {
    if (onMenuClick) {
      setInternalMenuAnchor(null);
      onMenuClick();
    } else {
      setInternalMenuAnchor(null);
    }
  }, [onMenuClick]);

  // Handle navigation
  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      handleMenuClose();
    },
    [navigate, handleMenuClose]
  );

  // Handle keyboard navigation for menu button
  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onMenuClick) {
          onMenuClick();
        } else {
          handleMenuOpen(e as unknown as React.MouseEvent<HTMLElement>);
        }
      }
    },
    [onMenuClick, handleMenuOpen]
  );

  // Memoized desktop navigation items
  const desktopNavItems = useMemo(
    () =>
      navLinks.map((link) => (
        <Button
          key={link.path}
          component={Link}
          to={link.path}
          color="inherit"
          sx={{
            minHeight: 44,
            minWidth: 44,
            padding: { xs: '8px 12px', sm: '10px 16px' },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
          aria-label={`Navigate to ${link.label}`}
        >
          {link.label}
        </Button>
      )),
    [navLinks]
  );

  // Handle menu item click
  const handleMenuItemClick = useCallback(
    (path: string) => {
      handleNavigate(path);
    },
    [handleNavigate]
  );

  // Handle menu item keyboard
  const handleMenuItemKeyDown = useCallback(
    (path: string, e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNavigate(path);
      }
    },
    [handleNavigate]
  );

  // Memoized mobile menu items
  const mobileMenuItems = useMemo(
    () =>
      navLinks.map((link) => {
        const handleClick = () => handleMenuItemClick(link.path);
        const handleKeyDown = (e: React.KeyboardEvent) => handleMenuItemKeyDown(link.path, e);
        return (
          <MenuItem
            key={link.path}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            sx={{
              minHeight: 44,
              padding: '12px 16px',
            }}
            aria-label={`Navigate to ${link.label}`}
          >
            {link.label}
          </MenuItem>
        );
      }),
    [navLinks, handleMenuItemClick, handleMenuItemKeyDown]
  );

  return (
    <AppBar
      position="static"
      component="nav"
      role="navigation"
      aria-label="Main navigation"
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Toolbar
        sx={{
          padding: { xs: '8px 16px', sm: '12px 24px' },
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        {/* Logo/Brand */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: { xs: 1, md: 0 },
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
          }}
          aria-label="Healthcare App"
        >
          Healthcare
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              marginLeft: { md: 4, lg: 6 },
              flexGrow: 1,
            }}
            component="ul"
            role="list"
            aria-label="Navigation links"
          >
            {desktopNavItems}
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            ref={menuButtonRef}
            color="inherit"
            aria-label="Open navigation menu"
            aria-controls={isMenuOpen ? 'mobile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            onClick={onMenuClick ? onMenuClick : handleMenuOpen}
            onKeyDown={handleMenuKeyDown}
            sx={{
              marginLeft: 'auto',
              minHeight: 44,
              minWidth: 44,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Mobile Menu */}
        <Menu
          id="mobile-menu"
          anchorEl={mobileMenuAnchor}
          open={isMenuOpen}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'mobile-menu-button',
            role: 'menu',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {mobileMenuItems}
        </Menu>
      </Toolbar>
    </AppBar>
  );
});

Navbar.displayName = 'Navbar';

