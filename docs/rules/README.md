# Rules Format Standards

This document defines the format and structure standards for all rules in this framework. These standards ensure that rules are:

- **IDE-agnostic**: No Cursor-specific or IDE-specific references
- **AI-friendly**: Structured with clear sections, examples, and checklists that AI tools can parse
- **Copy-paste ready**: Rules can be easily included in AI prompts as context
- **Version-controlled**: Rules are in markdown for easy tracking and sharing
- **Self-contained**: Each rule file includes all necessary context without external dependencies
- **Human-readable**: Clear enough for developers to understand and follow manually

## Rule Document Structure

Each rule document should follow this structure:

### 1. Title and Overview
- Clear, descriptive title
- Brief overview of what the rule covers
- Purpose and benefits

### 2. Core Principles
- Key principles that guide the rule
- Rationale behind the rule

### 3. Detailed Guidelines
- Specific, actionable guidelines
- Code examples where applicable
- Do's and Don'ts

### 4. Checklist
- Quick reference checklist for compliance
- Can be used in AI prompts or manual review

### 5. Examples
- Real-world examples
- Best practices demonstrations
- Common patterns

### 6. Related Rules
- Links to related rule documents
- Cross-references for context

## Formatting Standards

### Code Blocks
- Always specify language for syntax highlighting
- Include complete, runnable examples
- Add comments explaining key points

### Lists
- Use numbered lists for sequential steps
- Use bullet lists for options or features
- Use checkboxes for checklists

### Headers
- Use H2 for main sections
- Use H3 for subsections
- Maintain consistent hierarchy

### Emphasis
- Use **bold** for important terms and requirements
- Use *italic* for notes and optional items
- Use `code` for file names, paths, and code references

## AI Tool Integration

When using these rules with AI tools:

1. **Copy the entire rule document** or relevant sections into your prompt
2. **Reference specific sections** by header name
3. **Include the checklist** at the end of your prompt for verification
4. **Specify the rule file** you're following (e.g., "Follow the guidelines in component-standards.md")

Example prompt format:
```
Please create a [component/feature] following the rules in [rule-file].md.
Specifically ensure:
- [Checklist item 1]
- [Checklist item 2]
- [Checklist item 3]
```

## Version Control

- All rules are version-controlled in markdown format
- Changes should be documented in commit messages
- Breaking changes should be clearly marked
- Each rule file should include a "Last Updated" date (optional but recommended)

## Accessibility

- Rules should be accessible to developers of all experience levels
- Include both beginner-friendly explanations and advanced patterns
- Provide examples for common scenarios
- Link to external resources when appropriate

