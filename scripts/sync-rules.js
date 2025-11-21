#!/usr/bin/env node

/**
 * Rules Sync Script
 * 
 * Synchronizes rules from docs/rules/*.md and AI_INSTRUCTIONS.md to:
 * - .github/copilot-instructions.md
 * - replit.md
 * - .cursor/rules/*.mdc
 * 
 * This ensures all AI tools have consistent, up-to-date rules.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const AI_INSTRUCTIONS_FILE = path.join(ROOT_DIR, 'AI_INSTRUCTIONS.md');
const RULES_DIR = path.join(ROOT_DIR, 'docs', 'rules');
const COPILOT_FILE = path.join(ROOT_DIR, '.github', 'copilot-instructions.md');
const REPLIT_FILE = path.join(ROOT_DIR, 'replit.md');
const CURSOR_RULES_DIR = path.join(ROOT_DIR, '.cursor', 'rules');

// Rule file mappings: rule filename -> display name
const RULE_FILES = [
  { file: 'component-standards.md', name: 'Component Standards', key: 'component-standards' },
  { file: 'folder-structure.md', name: 'Folder Structure', key: 'folder-structure' },
  { file: 'testing.md', name: 'Testing', key: 'testing' },
  { file: 'routing.md', name: 'Routing', key: 'routing' },
  { file: 'state-management.md', name: 'State Management', key: 'state-management' },
  { file: 'api-integration.md', name: 'API Integration', key: 'api-integration' },
  { file: 'ai-tool-integration.md', name: 'AI Tool Integration', key: 'ai-tool-integration' },
];

/**
 * Extract version and last updated from AI_INSTRUCTIONS.md
 */
function extractMetadata(content) {
  const versionMatch = content.match(/<!-- VERSION: ([\d.]+) -->/);
  const lastUpdatedMatch = content.match(/<!-- LAST_UPDATED: ([\d-]+) -->/);
  
  return {
    version: versionMatch ? versionMatch[1] : '1.0.0',
    lastUpdated: lastUpdatedMatch ? lastUpdatedMatch[1] : new Date().toISOString().split('T')[0],
  };
}

/**
 * Extract core standards from AI_INSTRUCTIONS.md (between SYNC_START and SYNC_END)
 */
function extractCoreStandards(content) {
  const syncStart = content.indexOf('<!-- SYNC_START -->');
  const syncEnd = content.indexOf('<!-- SYNC_END -->');
  
  if (syncStart === -1 || syncEnd === -1) {
    throw new Error('SYNC_START or SYNC_END markers not found in AI_INSTRUCTIONS.md');
  }
  
  let coreStandards = content.substring(syncStart + '<!-- SYNC_START -->'.length, syncEnd).trim();
  
  // Remove INCLUDE_RULES markers (they're placeholders, not actual content)
  coreStandards = coreStandards.replace(/<!-- INCLUDE_RULES:START -->[\s\S]*?<!-- INCLUDE_RULES:END -->/g, '').trim();
  
  return coreStandards;
}

/**
 * Read a markdown file
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Write a file, creating directories if needed
 */
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✓ Generated: ${path.relative(ROOT_DIR, filePath)}`);
}

/**
 * Generate .mdc file content with frontmatter
 */
function generateMdcContent(ruleContent, ruleName, description) {
  const frontmatter = `---
description: ${description}
globs: '*.ts,*.tsx,*.js,*.jsx'
alwaysApply: true
---

`;
  
  // Remove the title from rule content if it exists (first line starting with #)
  let content = ruleContent.trim();
  if (content.startsWith('#')) {
    const lines = content.split('\n');
    // Skip the title line(s) - usually first line or first two lines
    if (lines[0].startsWith('# ')) {
      content = lines.slice(1).join('\n').trim();
    }
  }
  
  return frontmatter + content;
}

/**
 * Generate GitHub Copilot instructions
 */
function generateCopilotInstructions(coreStandards, rules, metadata) {
  const now = new Date().toISOString();
  
  let content = `# GitHub Copilot Instructions

**⚠️ IMPORTANT: This file is auto-generated from \`AI_INSTRUCTIONS.md\` and \`docs/rules/*.md\`. Do not edit manually.**

**Rules Version:** ${metadata.version}  
**Last Updated:** ${now}

${coreStandards}

## Detailed Rules

For comprehensive guidelines, refer to the following rule files in \`docs/rules/\`:

`;

  rules.forEach(rule => {
    if (rule.content) {
      content += `- **${rule.name}**: [docs/rules/${rule.file}](docs/rules/${rule.file})\n`;
    }
  });

  content += `- **Full Rules**: [docs/README.md](docs/rules/README.md)

## Quick Reference

For detailed guidelines with examples and checklists:

`;

  rules.forEach(rule => {
    if (rule.content) {
      content += `- ${rule.name}: docs/rules/${rule.file}\n`;
    }
  });

  content += `- Full Rules: docs/README.md

## When in Doubt

Read the detailed rules in docs/rules/ directory for comprehensive guidelines, examples, and best practices.

## Single Source of Truth

For the complete and authoritative rules, always refer to **\`AI_INSTRUCTIONS.md\`** at the project root. This file ensures consistency across all AI tools and IDEs.
`;

  return content;
}

/**
 * Generate Replit instructions
 */
function generateReplitInstructions(coreStandards, rules, metadata) {
  const now = new Date().toISOString();
  
  let content = `# Replit AI Instructions

**⚠️ IMPORTANT: This file is auto-generated from \`AI_INSTRUCTIONS.md\` and \`docs/rules/*.md\`. Do not edit manually.**

**Rules Version:** ${metadata.version}  
**Last Updated:** ${now}

${coreStandards}

## Detailed Rules

For comprehensive guidelines, refer to the following rule files in \`docs/rules/\`:

`;

  rules.forEach(rule => {
    if (rule.content) {
      content += `- **${rule.name}**: [docs/rules/${rule.file}](docs/rules/${rule.file})\n`;
    }
  });

  content += `- **Full Rules**: [docs/README.md](docs/rules/README.md)

## Quick Reference

For detailed guidelines with examples and checklists:

`;

  rules.forEach(rule => {
    if (rule.content) {
      content += `- ${rule.name}: docs/rules/${rule.file}\n`;
    }
  });

  content += `- Full Rules: docs/README.md

## When in Doubt

Read the detailed rules in docs/rules/ directory for comprehensive guidelines, examples, and best practices.

## Single Source of Truth

For the complete and authoritative rules, always refer to **\`AI_INSTRUCTIONS.md\`** at the project root. This file ensures consistency across all AI tools and IDEs.
`;

  return content;
}

/**
 * Generate Cursor main rules file
 */
function generateCursorMainRules(coreStandards, rules, metadata) {
  let content = `---
description: Project-wide development standards and rules for React TypeScript development
globs: '*.ts,*.tsx,*.js,*.jsx'
alwaysApply: true
---

# Project Rules for AI Code Generation

**⚠️ IMPORTANT: This rule aligns with \`AI_INSTRUCTIONS.md\` as the single source of truth.**

${coreStandards}

## Quick Reference

For detailed guidelines with examples and checklists, refer to the individual rule files in this directory:

`;

  rules.forEach(rule => {
    if (rule.content) {
      content += `- **${rule.name}**: See \`.cursor/rules/${rule.key}.mdc\`\n`;
    }
  });

  content += `
## Detailed Rules

The following individual rule files contain comprehensive guidelines:

`;

  rules.forEach(rule => {
    if (rule.content) {
      content += `- **${rule.name}**: \`.cursor/rules/${rule.key}.mdc\` (from \`docs/rules/${rule.file}\`)\n`;
    }
  });

  content += `
## When in Doubt

Read the detailed rules in \`docs/rules/\` directory or the corresponding \`.cursor/rules/*.mdc\` files for comprehensive guidelines, examples, and best practices.

## Single Source of Truth

For the complete and authoritative rules, always refer to **\`AI_INSTRUCTIONS.md\`** at the project root. This file ensures consistency across all AI tools and IDEs.
`;

  return content;
}

/**
 * Main sync function
 */
function syncRules() {
  console.log('🔄 Starting rules sync...\n');

  // Read AI_INSTRUCTIONS.md
  const aiInstructionsContent = readFile(AI_INSTRUCTIONS_FILE);
  if (!aiInstructionsContent) {
    console.error('❌ Failed to read AI_INSTRUCTIONS.md');
    process.exit(1);
  }

  // Extract metadata
  const metadata = extractMetadata(aiInstructionsContent);
  console.log(`📋 Version: ${metadata.version}, Last Updated: ${metadata.lastUpdated}\n`);

  // Extract core standards
  const coreStandards = extractCoreStandards(aiInstructionsContent);
  console.log('✓ Extracted core standards from AI_INSTRUCTIONS.md\n');

  // Read all rule files
  const rules = [];
  for (const ruleInfo of RULE_FILES) {
    const rulePath = path.join(RULES_DIR, ruleInfo.file);
    const ruleContent = readFile(rulePath);
    
    if (ruleContent) {
      rules.push({
        ...ruleInfo,
        content: ruleContent,
      });
      console.log(`✓ Read rule: ${ruleInfo.name}`);
    } else {
      console.log(`⚠ Skipped rule: ${ruleInfo.name} (file not found)`);
    }
  }

  console.log(`\n📚 Loaded ${rules.length} rule files\n`);

  // Generate GitHub Copilot instructions
  console.log('📝 Generating GitHub Copilot instructions...');
  const copilotContent = generateCopilotInstructions(coreStandards, rules, metadata);
  writeFile(COPILOT_FILE, copilotContent);

  // Generate Replit instructions
  console.log('\n📝 Generating Replit instructions...');
  const replitContent = generateReplitInstructions(coreStandards, rules, metadata);
  writeFile(REPLIT_FILE, replitContent);

  // Generate Cursor main rules file
  console.log('\n📝 Generating Cursor main rules file...');
  const cursorMainContent = generateCursorMainRules(coreStandards, rules, metadata);
  writeFile(path.join(CURSOR_RULES_DIR, 'project-standards.mdc'), cursorMainContent);

  // Generate individual Cursor rule files
  console.log('\n📝 Generating individual Cursor rule files...');
  rules.forEach(rule => {
    const description = `${rule.name} rules for React TypeScript development`;
    const mdcContent = generateMdcContent(rule.content, rule.name, description);
    writeFile(path.join(CURSOR_RULES_DIR, `${rule.key}.mdc`), mdcContent);
  });

  console.log('\n✅ Rules sync completed successfully!');
  console.log(`\n📊 Summary:`);
  console.log(`   - Core standards: Extracted`);
  console.log(`   - Rule files processed: ${rules.length}`);
  console.log(`   - GitHub Copilot: ${COPILOT_FILE}`);
  console.log(`   - Replit: ${REPLIT_FILE}`);
  console.log(`   - Cursor main: .cursor/rules/project-standards.mdc`);
  console.log(`   - Cursor individual: ${rules.length} .mdc files\n`);
}

// Run the sync
try {
  syncRules();
} catch (error) {
  console.error('\n❌ Error during sync:', error.message);
  console.error(error.stack);
  process.exit(1);
}

