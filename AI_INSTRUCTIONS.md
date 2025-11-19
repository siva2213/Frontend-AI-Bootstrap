# AI Development Instructions

This project follows strict development standards. When generating or modifying code, ALWAYS follow these rules:

## Quick Reference
- Component Standards: docs/rules/component-standards.md
- Folder Structure: docs/rules/folder-structure.md
- Testing: docs/rules/testing.md
- Full Rules: docs/README.md

## Mandatory Requirements for ALL Code:

### Performance
- React.memo for components
- useMemo for calculations
- useCallback for function props

### Responsiveness
- Mobile-first design
- Material UI breakpoints: { xs: 2, sm: 3, md: 4 }
- Tailwind responsive classes

### Accessibility
- ARIA attributes
- Keyboard navigation
- Semantic HTML
- No inline styles

### TypeScript
- Strict mode
- Proper interfaces
- Path aliases (@components, @hooks, etc.)

### Testing
- Test files for all components
- Accessibility testing included
- User-centric tests

## File Locations
- Components: src/components/[category]/ComponentName.tsx
- Tests: Co-located or src/__tests__/
- Types: src/types/
- Services: src/services/endpoints/

## When in Doubt
Read the detailed rules in docs/rules/ directory.

