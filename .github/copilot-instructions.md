# GitHub Copilot Instructions

Follow these rules for ALL code suggestions:

## Component Creation
- Use React.memo, useMemo, useCallback for performance
- Mobile-first responsive design (Material UI + Tailwind)
- ARIA attributes, keyboard navigation, semantic HTML
- No inline styles or inline event handlers
- TypeScript strict mode with proper interfaces

## File Organization
- Components: src/components/[category]/
- Pages: src/pages/
- Hooks: src/hooks/
- Utils: src/utils/
- Types: src/types/
- Services: src/services/endpoints/
- Store: src/store/contexts/

## Always Include
- TypeScript types for all props
- Tests for components
- Error handling for API calls
- Loading states
- Accessibility features

## Reference
See docs/rules/ for detailed standards.

