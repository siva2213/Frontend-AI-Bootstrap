# Component Checklist

Quick reference checklist for creating components. Use this when creating new components or reviewing existing ones.

## Performance & Optimization

- [ ] Component is memoized with `React.memo` (if appropriate)
- [ ] Expensive calculations use `useMemo`
- [ ] Function props use `useCallback`
- [ ] Large components are code-split with `React.lazy`
- [ ] Images are optimized and lazy-loaded
- [ ] Unnecessary re-renders are prevented
- [ ] Dependencies in hooks are correctly specified

## Responsiveness

- [ ] Component tested on mobile (320px+)
- [ ] Component tested on tablet (768px+)
- [ ] Component tested on desktop (1024px+)
- [ ] Mobile-first approach used
- [ ] Material UI breakpoints implemented
- [ ] Tailwind responsive classes used appropriately
- [ ] Touch targets are at least 44x44px
- [ ] Text is readable without zooming
- [ ] Layout doesn't break at any breakpoint
- [ ] Images scale appropriately
- [ ] Navigation is accessible on all screen sizes

## CSP & ADA Compliance

- [ ] No inline styles used
- [ ] No inline event handlers
- [ ] Semantic HTML elements used
- [ ] ARIA attributes added where needed
- [ ] All interactive elements keyboard accessible
- [ ] Focus management implemented
- [ ] Screen reader text provided
- [ ] Color contrast meets WCAG AA standards
- [ ] Forms have proper labels and error messages
- [ ] Images have alt text
- [ ] Component tested with screen reader
- [ ] Component tested with keyboard only navigation
- [ ] Focus indicators are visible

## TypeScript

- [ ] Props interface is defined
- [ ] All props are typed
- [ ] Optional props are marked with `?`
- [ ] Types are exported if used externally
- [ ] No `any` types used
- [ ] Strict TypeScript mode enabled

## Code Quality

- [ ] Component follows folder structure rules
- [ ] File naming follows conventions (PascalCase)
- [ ] Code is formatted with Prettier
- [ ] ESLint rules are followed
- [ ] Comments explain complex logic
- [ ] Component is self-contained
- [ ] Dependencies are minimal

## Testing

- [ ] Test file created
- [ ] Component renders correctly
- [ ] User interactions are tested
- [ ] Accessibility is tested
- [ ] Edge cases are covered
- [ ] Error states are tested
- [ ] Loading states are tested (if applicable)

## Documentation

- [ ] Component has JSDoc comments
- [ ] Props are documented
- [ ] Usage examples provided (if complex)
- [ ] Related components referenced

---

**Quick Copy for AI Prompts:**

```
Component Checklist:
- Performance: React.memo, useMemo, useCallback
- Responsiveness: Mobile-first, tested on all breakpoints
- Accessibility: ARIA, keyboard nav, semantic HTML, CSP compliant
- TypeScript: Proper types, no any
- Testing: User-centric tests, accessibility tests
```

