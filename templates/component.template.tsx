import React, { memo, useMemo, useCallback } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * ComponentName Component
 * 
 * Follows: docs/rules/component-standards.md
 * - Performance: Memoized with React.memo, uses useMemo/useCallback where appropriate
 * - Responsiveness: Mobile-first design with Material UI breakpoints and Tailwind
 * - Accessibility: ARIA attributes, keyboard navigation, semantic HTML
 */

interface ComponentNameProps {
  // Define your props here
  title: string;
  onAction?: () => void;
}

export const ComponentName = memo<ComponentNameProps>(({ 
  title,
  onAction,
}) => {
  // Memoized values
  const computedValue = useMemo(() => {
    // Expensive calculation here
    return title.toUpperCase();
  }, [title]);

  // Memoized callbacks
  const handleClick = useCallback(() => {
    onAction?.();
  }, [onAction]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <Box
      component="section"
      role="region"
      aria-label={title}
      sx={{
        // Mobile-first responsive styles
        padding: { xs: 2, sm: 3, md: 4 },
        fontSize: { xs: '0.875rem', md: '1rem' },
      }}
      className="tailwind-responsive-classes"
    >
      <Typography
        variant="h2"
        component="h2"
        aria-label={`${title} heading`}
      >
        {computedValue}
      </Typography>
      
      {onAction && (
        <button
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-label={`${title} action button`}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Action
        </button>
      )}
    </Box>
  );
});

ComponentName.displayName = 'ComponentName';

