# Frontend Rules Framework

Welcome to the Frontend Rules Framework documentation. This framework provides comprehensive guidelines for building React TypeScript applications with Material UI and Tailwind CSS.

## Overview

This rules framework is designed to be:

- **IDE-agnostic**: Works with any IDE (VS Code, Codium, Replit, Cursor, etc.)
- **AI-tool agnostic**: Compatible with any AI coding assistant (Claude, Copilot, ChatGPT, etc.)
- **Automatic Discovery**: AI tools automatically read configuration files - zero manual setup required
- **Comprehensive**: Covers all aspects of frontend development
- **Practical**: Includes templates, examples, and checklists

## Quick Start

**🎯 Zero Manual Setup Required!**

Simply open this project in your IDE (Cursor, VS Code, etc.), and AI tools will automatically apply all rules. No need to copy rules into prompts or configure anything manually.

### Automatic Rule Discovery

The project includes auto-discovery files that AI tools read automatically:

- **`.cursorrules`** - Cursor IDE automatically loads this
- **`.github/copilot-instructions.md`** - GitHub Copilot automatically reads this
- **`AI_INSTRUCTIONS.md`** - Universal file for any AI tool

Just start coding or asking AI to create components - all rules are already applied!

### Manual Reference (Optional)

If you need to reference rules manually:

1. **Read the Rules**: Start with the [Rule Format Standards](./rules/README.md) to understand how rules are structured
2. **Review Component Standards**: Check [Component Standards](./rules/component-standards.md) for the three core requirements
3. **Use Templates**: Reference templates in the `templates/` folder when creating new components
4. **Follow Checklists**: Use quick reference cards for quick verification

## Rule Documents

### Core Rules

1. **[Folder Structure](./rules/folder-structure.md)**
   - Type-based folder organization
   - Naming conventions
   - File organization patterns
   - Import path configuration

2. **[Component Standards](./rules/component-standards.md)**
   - Performance & Optimization
   - Responsiveness (Mobile-first)
   - CSP & ADA Compliance
   - Component structure and patterns

3. **[Routing](./rules/routing.md)**
   - Route structure and naming
   - Protected routes
   - Route parameters
   - Navigation patterns

4. **[State Management](./rules/state-management.md)**
   - Local vs global state decisions
   - State structure patterns
   - Async state handling
   - State persistence

5. **[API Integration](./rules/api-integration.md)**
   - Service layer structure
   - Error handling
   - Type definitions
   - Loading states and caching

6. **[Testing](./rules/testing.md)**
   - Jest and React Testing Library
   - Component testing patterns
   - Accessibility testing
   - API mocking strategies

7. **[AI Tool Integration](./rules/ai-tool-integration.md)**
   - How to use rules with AI tools
   - Prompt templates
   - IDE-specific instructions
   - Best practices

## Quick Reference

Quick reference cards for fast lookup:

- **[Component Checklist](./quick-reference/component-checklist.md)** - Quick checklist for component creation
- **[Folder Structure Diagram](./quick-reference/folder-structure-diagram.md)** - Visual folder structure reference
- **[Common Patterns](./quick-reference/common-patterns.md)** - Common code patterns and snippets

## Templates

Ready-to-use templates in the `templates/` folder (optional reference):

- `component.template.tsx` - Component boilerplate
- `route.template.tsx` - Route component template
- `store.template.ts` - State management template
- `api-service.template.ts` - API service template
- `component.test.template.tsx` - Test file template

_Note: With automatic rule discovery, templates are optional - AI will generate code following the rules automatically._

## Configuration Files

Project configuration files enforcing standards:

- `.cursorrules` - Cursor IDE auto-discovery rules
- `.github/copilot-instructions.md` - GitHub Copilot auto-discovery rules
- `AI_INSTRUCTIONS.md` - Universal AI tool instructions
- `.eslintrc.js` - ESLint rules
- `tsconfig.json` - TypeScript configuration
- `.prettierrc` - Code formatting
- `jest.config.js` - Jest testing configuration

## Component Standards Summary

Every component must meet three core requirements:

### 1. Performance & Optimization

- Use `React.memo` for expensive components
- Use `useMemo` for expensive calculations
- Use `useCallback` for function props
- Implement code splitting and lazy loading

### 2. Responsiveness

- Mobile-first approach
- Material UI breakpoints
- Tailwind responsive classes
- Test on multiple screen sizes

### 3. CSP & ADA Compliance

- No inline styles
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Color contrast compliance

## Using with AI Tools

### Automatic (Recommended)

**Zero manual intervention required!** Simply open the project in your IDE and start coding. AI tools automatically read:

- `.cursorrules` (Cursor)
- `.github/copilot-instructions.md` (GitHub Copilot)
- `AI_INSTRUCTIONS.md` (Other AI tools)

Just ask AI to create components - all rules are automatically applied!

### Manual Reference (Optional)

If you need to manually reference rules:

1. **Reference Rule Files**: Include rule file paths in your prompts
2. **Copy Checklists**: Paste checklists into prompts for verification
3. **Use Templates**: Start with templates and customize
4. **Follow Examples**: Reference examples from rule documents

See [AI Tool Integration Guide](./rules/ai-tool-integration.md) for detailed instructions.

## Workflow Example

### With Automatic Rule Discovery (Recommended)

1. **Open Project**: Open in your IDE (Cursor, VS Code, etc.)
2. **Ask AI**: Simply say "Create a Dashboard component that displays user statistics"
3. **AI Applies Rules**: All rules are automatically applied (performance, responsiveness, accessibility, etc.)
4. **Review**: Verify the generated code meets your requirements

### Manual Workflow (Optional)

1. **Identify Requirements**: What component/feature do you need?
2. **Reference Rules**: Which rule documents apply?
3. **Use Template**: Start with the appropriate template
4. **Follow Checklist**: Verify against relevant checklists
5. **Test**: Write tests following testing rules
6. **Review**: Verify compliance with all standards

## Contributing

When updating or adding rules:

1. Follow the [Rule Format Standards](./rules/README.md)
2. Keep rules IDE and AI-tool agnostic
3. Include examples and checklists
4. Update related rule documents if needed
5. Update this README if adding new sections

## Related Resources

- [Material UI Documentation](https://mui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Support

For questions or clarifications about the rules:

1. Review the relevant rule document
2. Check quick reference cards
3. Review examples in templates
4. Consult the AI Tool Integration guide

---

**Last Updated**: [Date will be added when rules are finalized]
