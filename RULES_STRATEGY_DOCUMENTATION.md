# Rules Strategy Documentation
## How Rules Work Across IDEs and AI Tools

**Project**: Frontend Rules Framework  
**Version**: 1.0  
**Date**: 2024

---

## Table of Contents

1. [Rules Strategy Overview](#rules-strategy-overview)
2. [How Rules Work in Different IDEs](#how-rules-work-in-different-ides)
3. [How Rules Work with Different AI Tools](#how-rules-work-with-different-ai-tools)
4. [Rule Application Flow](#rule-application-flow)
5. [Use Case Request Examples](#use-case-request-examples)
6. [Entry Point Discovery Mechanism](#entry-point-discovery-mechanism)
7. [Rule Hierarchy and References](#rule-hierarchy-and-references)
8. [Ensuring Consistency](#ensuring-consistency)
9. [Troubleshooting](#troubleshooting)

---

## Rules Strategy Overview

### Core Concept

The rules framework uses **automatic discovery** - AI tools automatically find and read configuration files when you open the project. This eliminates the need for manual rule copying or configuration.

### Key Principles

1. **Multiple Entry Points**: Different files for different tools ensure universal coverage
2. **Automatic Discovery**: Tools scan for known file names and locations
3. **Reference System**: Entry points reference detailed rules for comprehensive coverage
4. **Self-Contained**: Each entry point contains essential rules plus references
5. **Version Controlled**: All rules in Git ensure team consistency

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTOMATIC DISCOVERY                       │
│                                                              │
│  When IDE/AI Tool Opens Project:                            │
│  1. Scans for known configuration files                     │
│  2. Reads entry point file automatically                    │
│  3. Loads rules into AI context                             │
│  4. Rules are ready for all code generation                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    ENTRY POINT FILES                         │
│                                                              │
│  .cursorrules ────────────────┐                             │
│  (Cursor IDE)                 │                             │
│                                │                             │
│  .github/copilot-instructions.md                            │
│  (GitHub Copilot)              │                             │
│                                │                             │
│  AI_INSTRUCTIONS.md ───────────┼───┐                        │
│  (Universal fallback)          │   │                        │
└────────────────────────────────┼───┼────────────────────────┘
                                  │   │
                                  ▼   ▼
                    ┌───────────────────────────┐
                    │   MANDATORY RULES LOADED   │
                    │   (In AI Context)          │
                    │                            │
                    │  • Performance            │
                    │  • Responsiveness         │
                    │  • Accessibility          │
                    │  • TypeScript             │
                    │  • Testing               │
                    │  • Folder Structure      │
                    └───────────────────────────┘
                                  │
                                  │ When needed
                                  ▼
                    ┌───────────────────────────┐
                    │   DETAILED RULES           │
                    │   docs/rules/*.md          │
                    │   (Referenced on demand)   │
                    └───────────────────────────┘
```

---

## How Rules Work in Different IDEs

### 1. Cursor IDE

#### Discovery Mechanism

**Entry Point**: `.cursorrules` (project root)

**How Discovery Works**:
1. When you open a project in Cursor, it automatically scans the project root
2. If `.cursorrules` exists, Cursor loads it into the AI context
3. The file content becomes part of every AI interaction
4. No manual configuration or setup required

**Discovery Flow**:
```
User opens project in Cursor
    ↓
Cursor scans project root directory
    ↓
Finds .cursorrules file
    ↓
Reads entire file content
    ↓
Loads into AI context automatically
    ↓
Rules are active for all AI interactions
```

#### Rule Application

When you request code generation:
1. Cursor AI already has `.cursorrules` in context
2. AI reads your request (e.g., "Create a Dashboard component")
3. AI applies all rules from `.cursorrules` automatically
4. AI references detailed rules from `docs/rules/` if needed
5. Generated code follows all standards

**Example Request Flow**:
```
User: "Create a Dashboard component"
    ↓
Cursor AI: (Has .cursorrules in context)
    ↓
AI applies rules:
  - Uses React.memo
  - Implements useMemo/useCallback
  - Mobile-first responsive design
  - ARIA attributes
  - TypeScript interfaces
  - Correct folder structure
  - Creates test file
    ↓
Generates compliant code
```

#### Configuration

- **File Location**: Project root (`.cursorrules`)
- **File Format**: Markdown/text
- **Auto-Load**: Yes, automatic on project open
- **Manual Setup**: None required

---

### 2. VS Code

#### Discovery Mechanism

**Entry Points**: 
- `.cursorrules` (if extension supports it)
- `AI_INSTRUCTIONS.md` (when referenced)
- `.vscode/settings.json` (configuration)

**How Discovery Works**:

**Option A: With Cursor Extension**
- Works same as Cursor IDE
- Automatically reads `.cursorrules`

**Option B: With Other AI Extensions**
- Some extensions auto-detect `.cursorrules`
- Others need `AI_INSTRUCTIONS.md` referenced in prompts
- `.vscode/settings.json` configures file associations

**Discovery Flow**:
```
User opens project in VS Code
    ↓
AI Extension scans for:
  - .cursorrules (if supported)
  - AI_INSTRUCTIONS.md (if referenced)
    ↓
Extension loads rules into context
    ↓
Rules available for code generation
```

#### Rule Application

**With Auto-Detection**:
- Same as Cursor IDE
- Rules applied automatically

**With Manual Reference**:
```
User: "Create component. Follow AI_INSTRUCTIONS.md"
    ↓
Extension reads AI_INSTRUCTIONS.md
    ↓
Applies rules from file
    ↓
Generates compliant code
```

#### Configuration

- **File Locations**: 
  - `.cursorrules` (root)
  - `AI_INSTRUCTIONS.md` (root)
  - `.vscode/settings.json` (config)
- **Auto-Load**: Depends on extension
- **Manual Setup**: May need to reference `AI_INSTRUCTIONS.md` in prompts

---

### 3. GitHub Codespaces / Replit

#### Discovery Mechanism

**Entry Point**: `AI_INSTRUCTIONS.md` (when referenced)

**How Discovery Works**:
1. Cloud IDEs typically don't auto-detect rules
2. User references `AI_INSTRUCTIONS.md` in prompts
3. AI reads the file and applies rules

**Discovery Flow**:
```
User opens project
    ↓
User references AI_INSTRUCTIONS.md in prompt
    ↓
AI reads file content
    ↓
Rules loaded into context
    ↓
Rules applied to generation
```

#### Rule Application

```
User: "Create component. See AI_INSTRUCTIONS.md"
    ↓
AI reads AI_INSTRUCTIONS.md
    ↓
Applies all rules from file
    ↓
References docs/rules/ if needed
    ↓
Generates compliant code
```

---

### 4. JetBrains IDEs (IntelliJ, WebStorm)

#### Discovery Mechanism

**Entry Point**: `.github/copilot-instructions.md` (for Copilot)

**How Discovery Works**:
- GitHub Copilot extension reads `.github/copilot-instructions.md`
- Works automatically when Copilot is active

**Discovery Flow**:
```
User opens project
    ↓
GitHub Copilot extension active
    ↓
Scans for .github/copilot-instructions.md
    ↓
Reads file automatically
    ↓
Applies rules to all suggestions
```

---

## How Rules Work with Different AI Tools

### 1. GitHub Copilot

#### Discovery Mechanism

**Entry Point**: `.github/copilot-instructions.md`

**How It Works**:
- Copilot automatically scans for `.github/copilot-instructions.md`
- Reads file when generating suggestions
- Applies rules to all code completions

**Discovery Flow**:
```
Copilot active in IDE
    ↓
Scans repository for .github/copilot-instructions.md
    ↓
Reads file content
    ↓
Rules loaded into suggestion engine
    ↓
All suggestions follow rules
```

#### Rule Application Example

**User Types**:
```typescript
const UserCard = ({ user }) => {
```

**Copilot Suggestion** (with rules applied):
```typescript
import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';

interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const UserCard = memo<UserCardProps>(({ user }) => {
  return (
    <Box
      component="article"
      role="article"
      aria-label={`User card for ${user.name}`}
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
      }}
      className="bg-white rounded-lg shadow-md"
    >
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="body2">{user.email}</Typography>
    </Box>
  );
});

UserCard.displayName = 'UserCard';
```

**Rules Applied**:
- ✅ React.memo used
- ✅ TypeScript interface defined
- ✅ Mobile-first responsive (sx prop)
- ✅ ARIA attributes
- ✅ Semantic HTML (article)
- ✅ Tailwind classes
- ✅ No inline styles

---

### 2. Cursor AI

#### Discovery Mechanism

**Entry Point**: `.cursorrules`

**How It Works**:
- Automatically loaded when project opens
- Always in AI context
- No need to reference in prompts

#### Rule Application Example

**User Request**:
```
Create a login form component with email and password fields
```

**AI Response** (with rules automatically applied):
1. Creates component with React.memo
2. Uses TypeScript interfaces
3. Implements mobile-first responsive design
4. Adds ARIA attributes
5. Includes keyboard navigation
6. Places in correct folder
7. Creates test file

**Generated Code**:
```typescript
import React, { memo, useCallback, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const LoginForm = memo<LoginFormProps>(({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  }, [email, password, onSubmit]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      role="form"
      aria-label="Login form"
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        maxWidth: { xs: '100%', sm: '400px' },
      }}
      className="flex flex-col gap-4"
    >
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-required="true"
        aria-label="Email input"
        sx={{ width: '100%' }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        aria-required="true"
        aria-label="Password input"
        sx={{ width: '100%' }}
      />
      <Button
        type="submit"
        variant="contained"
        aria-label="Submit login form"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e as any);
          }
        }}
      >
        Login
      </Button>
    </Box>
  );
});

LoginForm.displayName = 'LoginForm';
```

**Rules Applied**:
- ✅ React.memo
- ✅ useCallback for handlers
- ✅ TypeScript interfaces
- ✅ Mobile-first responsive
- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Semantic HTML
- ✅ No inline styles

---

### 3. Claude Code / Anthropic

#### Discovery Mechanism

**Entry Point**: `.cursorrules` or `AI_INSTRUCTIONS.md`

**How It Works**:
- Can read project files when in context
- May need explicit reference in prompt
- Scans project structure for instruction files

#### Rule Application Example

**User Request**:
```
Following .cursorrules, create a user profile page component
```

**AI Response**:
1. Reads `.cursorrules` file
2. Applies all rules from file
3. References `docs/rules/component-standards.md` for details
4. Generates compliant code

---

### 4. ChatGPT / OpenAI

#### Discovery Mechanism

**Entry Point**: `AI_INSTRUCTIONS.md` (when provided)

**How It Works**:
- User copies content or references file
- AI reads provided instructions
- Applies rules to generation

#### Rule Application Example

**User Request**:
```
I'm working on a React TypeScript project. Here are the project rules:

[Paste AI_INSTRUCTIONS.md content]

Create a dashboard component that shows user statistics.
```

**AI Response**:
- Applies all rules from provided instructions
- Generates compliant code following standards

---

## Rule Application Flow

### Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER REQUEST                           │
│  "Create a Dashboard component"                          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              AI TOOL DISCOVERY PHASE                     │
│                                                           │
│  1. Check if rules already loaded                        │
│     (From project open)                                  │
│                                                           │
│  2. If not loaded:                                       │
│     - Scan for .cursorrules                              │
│     - Scan for .github/copilot-instructions.md           │
│     - Scan for AI_INSTRUCTIONS.md                        │
│                                                           │
│  3. Load entry point file                                │
│  4. Parse rules from file                                │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              RULE APPLICATION PHASE                      │
│                                                           │
│  1. Extract mandatory rules from entry point:            │
│     ✓ Performance (React.memo, useMemo, useCallback)    │
│     ✓ Responsiveness (Mobile-first, Material UI)        │
│     ✓ Accessibility (ARIA, keyboard nav)                │
│     ✓ TypeScript (Interfaces, strict mode)              │
│     ✓ Testing (Test files, accessibility tests)         │
│     ✓ Folder Structure (Correct location)               │
│                                                           │
│  2. Check if detailed rules needed:                      │
│     - Reference docs/rules/component-standards.md       │
│     - Reference docs/rules/folder-structure.md         │
│     - Reference docs/rules/testing.md                   │
│                                                           │
│  3. Apply all rules to code generation                  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              CODE GENERATION PHASE                       │
│                                                           │
│  1. Generate component structure:                       │
│     - Import React, memo, hooks                          │
│     - Define TypeScript interface                        │
│     - Use React.memo wrapper                             │
│                                                           │
│  2. Implement performance optimizations:                 │
│     - Add useMemo for calculations                       │
│     - Add useCallback for handlers                       │
│                                                           │
│  3. Implement responsiveness:                           │
│     - Material UI sx prop with breakpoints              │
│     - Tailwind responsive classes                       │
│                                                           │
│  4. Implement accessibility:                            │
│     - Add ARIA attributes                               │
│     - Add keyboard navigation                           │
│     - Use semantic HTML                                 │
│                                                           │
│  5. Place in correct folder:                           │
│     - src/components/[category]/                        │
│                                                           │
│  6. Create test file:                                   │
│     - Component tests                                   │
│     - Accessibility tests                               │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              OUTPUT: COMPLIANT CODE                     │
│                                                           │
│  ✓ All performance rules applied                        │
│  ✓ All responsiveness rules applied                     │
│  ✓ All accessibility rules applied                      │
│  ✓ TypeScript standards met                             │
│  ✓ Test file created                                    │
│  ✓ Correct folder structure                             │
└─────────────────────────────────────────────────────────┘
```

### Step-by-Step Rule Application

#### Step 1: Request Received

**User Input**:
```
Create a UserCard component that displays user name, email, and avatar
```

#### Step 2: Rule Discovery

**AI Tool Action**:
1. Checks if rules are already in context (from project open)
2. If not, scans for entry point files:
   - `.cursorrules` ✓ Found
   - `.github/copilot-instructions.md` (if Copilot)
   - `AI_INSTRUCTIONS.md` (fallback)

#### Step 3: Rule Loading

**AI Tool Action**:
1. Reads `.cursorrules` content
2. Extracts mandatory rules:
   - Component Creation Standards
   - Folder Structure
   - TypeScript Standards
   - Testing Requirements
3. Notes references to detailed rules

#### Step 4: Rule Application

**AI Tool Action**:
1. **Performance Rules Applied**:
   - Will use `React.memo`
   - Will use `useMemo` if calculations needed
   - Will use `useCallback` for handlers

2. **Responsiveness Rules Applied**:
   - Mobile-first approach
   - Material UI breakpoints: `{ xs: 2, sm: 3, md: 4 }`
   - Tailwind responsive classes

3. **Accessibility Rules Applied**:
   - ARIA attributes
   - Keyboard navigation
   - Semantic HTML
   - No inline styles

4. **TypeScript Rules Applied**:
   - Interface for props
   - Strict typing
   - Path aliases

5. **Testing Rules Applied**:
   - Create test file
   - Accessibility tests
   - User interaction tests

6. **Folder Structure Rules Applied**:
   - Place in `src/components/common/UserCard.tsx`

#### Step 5: Code Generation

**AI Tool Generates**:

```typescript
// src/components/common/UserCard.tsx
import React, { memo } from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export const UserCard = memo<UserCardProps>(({ user }) => {
  return (
    <Box
      component="article"
      role="article"
      aria-label={`User card for ${user.name}`}
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 3 },
      }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <Avatar
        src={user.avatarUrl}
        alt={`${user.name} avatar`}
        sx={{ width: { xs: 56, md: 64 }, height: { xs: 56, md: 64 } }}
        aria-label={`Avatar for ${user.name}`}
      />
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          component="h3"
          aria-label={`User name: ${user.name}`}
        >
          {user.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          aria-label={`User email: ${user.email}`}
        >
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
});

UserCard.displayName = 'UserCard';
```

**Test File Generated**:

```typescript
// src/components/common/UserCard.test.tsx
import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  it('renders user information', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(<UserCard user={mockUser} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-label', 'User card for John Doe');
  });

  it('is responsive', () => {
    const { container } = render(<UserCard user={mockUser} />);
    // Test responsive behavior
  });
});
```

#### Step 6: Verification

**Rules Compliance Check**:
- ✅ React.memo used
- ✅ TypeScript interface defined
- ✅ Mobile-first responsive (sx with breakpoints)
- ✅ ARIA attributes present
- ✅ Semantic HTML (article)
- ✅ No inline styles
- ✅ Test file created
- ✅ Correct folder location

---

## Use Case Request Examples

### Example 1: Simple Component Request

**User Request**:
```
Create a Button component
```

**Rule Application Process**:

1. **Discovery**: AI finds `.cursorrules`
2. **Rules Applied**:
   - Performance: React.memo
   - Responsiveness: Mobile-first, Material UI + Tailwind
   - Accessibility: ARIA, keyboard nav
   - TypeScript: Interface for props
   - Testing: Test file
   - Folder: `src/components/common/Button.tsx`

3. **Generated Code**: Fully compliant with all rules

---

### Example 2: Complex Feature Request

**User Request**:
```
Create a user dashboard page with:
- User profile section
- Statistics cards
- Recent activity list
- Edit profile functionality
```

**Rule Application Process**:

1. **Discovery**: AI finds `.cursorrules`
2. **Rules Applied**:
   - **Performance**: 
     - React.memo for all components
     - useMemo for statistics calculations
     - useCallback for handlers
   - **Responsiveness**:
     - Mobile-first layout
     - Material UI Grid with breakpoints
     - Tailwind responsive utilities
   - **Accessibility**:
     - ARIA landmarks
     - Keyboard navigation
     - Screen reader support
   - **TypeScript**:
     - Interfaces for all props
     - Type-safe API calls
   - **State Management**:
     - Context for shared state
     - Local state for component-specific
   - **API Integration**:
     - Typed service calls
     - Error handling
     - Loading states
   - **Testing**:
     - Test files for all components
     - Accessibility tests
   - **Folder Structure**:
     - Page: `src/pages/Dashboard.tsx`
     - Components: `src/components/dashboard/`
     - Services: `src/services/endpoints/userService.ts`

3. **Generated Files**:
   - Dashboard page component
   - Profile section component
   - Statistics card component
   - Activity list component
   - API service
   - Test files
   - Type definitions

---

### Example 3: Enhancement Request

**User Request**:
```
Enhance the existing UserProfile component to add edit functionality
```

**Rule Application Process**:

1. **Discovery**: AI finds `.cursorrules`
2. **Code Review**: AI reads existing UserProfile component
3. **Rules Applied to New Code**:
   - All existing rules maintained
   - New edit functionality follows same standards
   - Tests updated
   - State management follows patterns
4. **Enhancement**: Code enhanced while maintaining all standards

---

## Entry Point Discovery Mechanism

### Discovery Priority

Different tools scan in different orders:

#### Cursor IDE
```
1. Check if .cursorrules exists in project root
2. If found, load immediately
3. Rules active for all interactions
```

#### GitHub Copilot
```
1. Check for .github/copilot-instructions.md
2. If found, load into suggestion engine
3. Rules applied to all suggestions
```

#### VS Code with AI Extensions
```
1. Check for .cursorrules (if extension supports)
2. Check for AI_INSTRUCTIONS.md (if referenced)
3. Load whichever is found/referenced
```

#### Universal Fallback
```
1. If no tool-specific file found
2. Use AI_INSTRUCTIONS.md when referenced
3. Works with any AI tool
```

### File Location Strategy

All entry point files are in **project root** for easy discovery:

```
project-root/
├── .cursorrules                    ← Cursor IDE
├── .github/
│   └── copilot-instructions.md     ← GitHub Copilot
├── AI_INSTRUCTIONS.md              ← Universal fallback
└── docs/
    └── rules/                      ← Detailed rules (referenced)
```

### Why This Works

1. **Standard Locations**: Tools know where to look
2. **Known File Names**: Tools recognize standard names
3. **Project Root**: Easy to find, no deep scanning needed
4. **Multiple Files**: Different tools, different entry points
5. **Fallback Option**: Universal file for any tool

---

## Rule Hierarchy and References

### Three-Tier System

#### Tier 1: Entry Points (Auto-Discovered)
- **Purpose**: Quick rules that AI loads immediately
- **Content**: Mandatory rules, essential standards
- **Size**: Concise, focused
- **Files**: `.cursorrules`, `.github/copilot-instructions.md`, `AI_INSTRUCTIONS.md`

#### Tier 2: Detailed Rules (Referenced)
- **Purpose**: Comprehensive guidelines
- **Content**: Detailed explanations, examples, patterns
- **Size**: Extensive, thorough
- **Files**: `docs/rules/*.md`
- **Access**: Referenced by entry points, read when needed

#### Tier 3: Quick Reference (On-Demand)
- **Purpose**: Fast lookup, checklists
- **Content**: Checklists, patterns, diagrams
- **Size**: Quick, scannable
- **Files**: `docs/quick-reference/*.md`
- **Access**: Used for verification, quick checks

### Reference Flow

```
Entry Point File
    │
    ├── Contains: Mandatory rules
    │
    └── References: "See docs/rules/component-standards.md"
            │
            └── AI reads detailed rules when needed
                    │
                    └── References: "See docs/quick-reference/component-checklist.md"
                            │
                            └── AI uses for verification
```

### Example Reference Chain

**User Request**: "Create a component"

1. **Entry Point** (`.cursorrules`):
   ```
   - Use React.memo
   - Mobile-first design
   - ARIA attributes
   - See docs/rules/component-standards.md for details
   ```

2. **Detailed Rules** (`docs/rules/component-standards.md`):
   ```
   - Detailed React.memo usage examples
   - Responsive design patterns
   - ARIA attribute guidelines
   - See docs/quick-reference/component-checklist.md for checklist
   ```

3. **Quick Reference** (`docs/quick-reference/component-checklist.md`):
   ```
   - [ ] React.memo used
   - [ ] Mobile-first implemented
   - [ ] ARIA attributes added
   ```

---

## Ensuring Consistency

### How Rules Stay Consistent

#### 1. Single Source of Truth

All entry points reference the same detailed rules:
- `.cursorrules` → references `docs/rules/`
- `.github/copilot-instructions.md` → references `docs/rules/`
- `AI_INSTRUCTIONS.md` → references `docs/rules/`

#### 2. Version Control

- All rules in Git repository
- Changes tracked and reviewed
- Team members always have latest version
- No local modifications needed

#### 3. Multiple Entry Points, Same Rules

All entry points contain the same core rules:
- Same performance requirements
- Same responsiveness standards
- Same accessibility requirements
- Same TypeScript standards

#### 4. Reference System

Entry points point to same detailed rules:
- All reference `docs/rules/component-standards.md`
- All reference `docs/rules/folder-structure.md`
- Consistent across all tools

### Team Alignment Strategy

#### For New Team Members

1. **Clone Repository**: Get all rules automatically
2. **Open in IDE**: Rules auto-discover
3. **Start Coding**: Rules applied automatically
4. **No Setup**: Zero configuration needed

#### For Existing Team Members

1. **Pull Latest**: Get rule updates
2. **Rules Auto-Update**: No manual changes needed
3. **Consistent Application**: Same rules for everyone

#### For Rule Updates

1. **Update Entry Points**: Modify `.cursorrules`, etc.
2. **Update Detailed Rules**: Modify `docs/rules/*.md`
3. **Commit to Git**: All team members get updates
4. **Automatic Application**: Rules apply on next project open

---

## Troubleshooting

### Issue: Rules Not Being Applied

#### Possible Causes

1. **File Not Found**
   - **Solution**: Ensure entry point files exist in project root
   - **Check**: `.cursorrules`, `.github/copilot-instructions.md`, `AI_INSTRUCTIONS.md`

2. **Wrong IDE/Tool**
   - **Solution**: Use correct entry point for your tool
   - **Cursor**: Uses `.cursorrules`
   - **Copilot**: Uses `.github/copilot-instructions.md`
   - **Others**: Reference `AI_INSTRUCTIONS.md`

3. **File Not in Context**
   - **Solution**: Explicitly reference file in prompt
   - **Example**: "Following AI_INSTRUCTIONS.md, create component"

#### Verification Steps

1. Check if entry point file exists
2. Verify file location (project root)
3. Check file content (rules present)
4. Try explicit reference in prompt
5. Check IDE/tool documentation for auto-discovery

### Issue: Rules Partially Applied

#### Possible Causes

1. **Entry Point Incomplete**
   - **Solution**: Ensure all mandatory rules in entry point
   - **Check**: Performance, Responsiveness, Accessibility rules present

2. **Detailed Rules Not Referenced**
   - **Solution**: Entry point should reference `docs/rules/`
   - **Check**: References present in entry point files

#### Verification Steps

1. Review entry point file content
2. Check if detailed rules are referenced
3. Verify detailed rules exist in `docs/rules/`
4. Test with explicit rule reference

### Issue: Different Behavior Across Tools

#### Possible Causes

1. **Different Entry Points**
   - **Solution**: Ensure all entry points have same core rules
   - **Check**: Compare `.cursorrules` and `AI_INSTRUCTIONS.md`

2. **Tool-Specific Interpretation**
   - **Solution**: Make rules more explicit
   - **Check**: Add examples to entry points

#### Verification Steps

1. Compare entry point files
2. Ensure same core rules in all
3. Test with different tools
4. Update entry points if inconsistencies found

---

## Summary

### Key Points

1. **Automatic Discovery**: AI tools automatically find and read entry point files
2. **Multiple Entry Points**: Different files for different tools ensure coverage
3. **Reference System**: Entry points reference detailed rules for comprehensive coverage
4. **Zero Manual Setup**: No configuration needed, just open project
5. **Consistent Application**: Same rules applied regardless of tool/IDE
6. **Version Controlled**: All rules in Git, team always aligned

### How It Works

```
Project Open → AI Tool Scans → Finds Entry Point → 
Loads Rules → User Requests Code → AI Applies Rules → 
Generates Compliant Code
```

### Success Criteria

- ✅ Rules automatically discovered
- ✅ Rules applied to all code generation
- ✅ Works across all IDEs and AI tools
- ✅ Team members aligned on standards
- ✅ No manual intervention required

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Maintained By**: Development Team

