# Git Hooks Setup Guide

This project uses Husky to enforce code quality and project standards through Git hooks.

## What Gets Validated

### Pre-commit Hook (Fast checks on staged files)

- ✅ **ESLint** - Code quality, CSP compliance, ADA compliance, mobile-friendly patterns
- ✅ **Prettier** - Code formatting
- ✅ **File Structure Validator** - Folder structure, naming conventions, import paths

### Pre-push Hook (Comprehensive checks)

- ✅ **TypeScript Type Checking** - Ensures all types are valid
- ✅ **Test Suite** - Runs all tests to ensure nothing is broken

## Setup Instructions

### 1. Initialize Git Repository (if not already done)

```bash
git init
```

### 2. Install Dependencies

```bash
npm install
# Or if you encounter peer dependency conflicts:
npm install --legacy-peer-deps
```

This will:

- Install all dependencies including the local ESLint plugin (via `file:` protocol)
- Automatically set up Husky hooks via the `prepare` script

### 3. Verify Setup

The `prepare` script runs automatically on `npm install` and sets up Husky hooks in `.husky/` directory.

You can verify everything is working:

```bash
# Test ESLint
npm run lint

# Test file structure validator
npm run validate-structure

# Test TypeScript
npm run type-check
```

## Rules Enforced

### CSP Compliance (Content Security Policy)

- ❌ No inline styles (`style={{...}}`)
- ❌ No inline event handlers (`onClick={() => ...}`)
- ✅ Use Material UI `sx` prop or Tailwind classes
- ✅ Use function references for event handlers

### ADA Compliance (Accessibility)

- ✅ ARIA labels for interactive elements without visible text
- ✅ Semantic HTML elements (nav, main, article, section)
- ✅ Keyboard event handlers for custom interactive elements
- ✅ Alt text for images
- ✅ Proper focus management

### Mobile-First Standards

- ✅ Responsive breakpoints in Material UI `sx` prop
- ✅ Touch target size (minimum 44x44px)
- ✅ Mobile-first responsive design patterns

### Performance Standards

- ⚠️ React.memo suggested for components with props
- ✅ useMemo for expensive calculations
- ✅ useCallback for function props

### Folder Structure & Naming

- ✅ Components in `src/components/{common|forms|feedback}/`
- ✅ Hooks in `src/hooks/{api|ui|utils}/`
- ✅ Pages in `src/pages/` with PascalCase
- ✅ Utils in `src/utils/{validators|formatters|constants}/`
- ✅ Types in `src/types/{api|components|common}/`
- ✅ Services in `src/services/{api|endpoints}/`
- ✅ File naming conventions (PascalCase for components, camelCase for hooks/utils)
- ✅ Path aliases usage (@components, @hooks, etc.)

## Bypassing Hooks (Not Recommended)

If you absolutely need to bypass hooks (not recommended):

```bash
# Skip pre-commit hook
git commit --no-verify -m "message"

# Skip pre-push hook
git push --no-verify
```

**Note:** CI/CD pipeline will still run all checks, so bypassing hooks locally won't allow bad code into the repository.

## Troubleshooting

### Husky not running

1. Ensure Git is initialized: `git init`
2. Run `npm run prepare` to reinstall Husky
3. Check `.husky/` directory exists

### ESLint plugin not found

1. Ensure `eslint-plugin-project-rules` directory exists
2. Check `.eslintrc.js` includes `'project-rules'` in plugins array
3. Check `package.json` includes `"eslint-plugin-project-rules": "file:./eslint-plugin-project-rules"` in devDependencies
4. Run `npm install` (or `npm install --legacy-peer-deps` if there are peer dependency conflicts)
5. The plugin is installed via the `file:` protocol, no npm link needed

### File structure validator not working

1. Ensure `scripts/validate-file-structure.js` exists and is executable
2. Check file has proper shebang: `#!/usr/bin/env node`
3. On Windows, Git Bash should handle it automatically

## Custom Rules Location

- **ESLint Custom Rules**: `eslint-plugin-project-rules/index.js`
- **File Structure Validator**: `scripts/validate-file-structure.js`
- **Project Rules Documentation**: `docs/rules/`

## IDE Integration

These hooks work with **any IDE**:

- ✅ VS Code
- ✅ Cursor
- ✅ IntelliJ/WebStorm
- ✅ Any Git client

The hooks run at the Git level, so they work regardless of your IDE or editor.

## Alignment with Project Rules

All validations are aligned with:

- `docs/rules/component-standards.md` - Component standards
- `docs/rules/folder-structure.md` - Folder structure rules
- `AI_INSTRUCTIONS.md` - Project requirements
- `tsconfig.json` - TypeScript path aliases
