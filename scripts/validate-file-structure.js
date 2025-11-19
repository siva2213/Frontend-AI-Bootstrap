#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Folder structure rules - aligned with docs/rules/folder-structure.md
const FOLDER_RULES = {
  components: ['common', 'forms', 'feedback'],
  hooks: ['api', 'ui', 'utils'],
  utils: ['validators', 'formatters', 'constants'],
  types: ['api', 'components', 'common'],
  services: ['api', 'endpoints'],
  store: ['slices', 'contexts', 'selectors'],
};

// Naming conventions - aligned with docs/rules/folder-structure.md
const NAMING_RULES = {
  components: /^[A-Z][a-zA-Z0-9]*\.tsx?$/, // PascalCase
  hooks: /^use[A-Z][a-zA-Z0-9]*\.tsx?$/, // camelCase with 'use' prefix
  utils: /^[a-z][a-zA-Z0-9]*\.tsx?$/, // camelCase
  types: /^[A-Z][a-zA-Z0-9]*\.tsx?$/, // PascalCase
  services: /^[a-z][a-zA-Z0-9]*Service\.tsx?$/, // camelCase with Service suffix
  pages: /^[A-Z][a-zA-Z0-9]*\.tsx?$/, // PascalCase
  layouts: /^[A-Z][a-zA-Z0-9]*Layout\.tsx?$/, // PascalCase with Layout suffix
};

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
    });
    return output
      .split('\n')
      .filter(Boolean)
      .filter((file) => file.endsWith('.ts') || file.endsWith('.tsx'));
  } catch (error) {
    return [];
  }
}

function validateFolderStructure(filePath) {
  const errors = [];
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  // Skip if file is in root or outside src
  if (!normalizedPath.includes('src/')) {
    return errors;
  }

  const parts = normalizedPath.split('src/')[1].split('/');
  const fileName = parts[parts.length - 1];
  const folderPath = parts.slice(0, -1);

  // Check component folder structure
  if (normalizedPath.includes('/components/')) {
    const componentIndex = folderPath.indexOf('components');
    const subfolder = folderPath[componentIndex + 1];
    
    if (subfolder && !FOLDER_RULES.components.includes(subfolder)) {
      errors.push({
        type: 'folder-structure',
        message: `Component should be in one of: ${FOLDER_RULES.components.join(', ')}. Found in: components/${subfolder}/`,
        file: filePath,
      });
    }
    
    // Check file naming
    if (!NAMING_RULES.components.test(fileName)) {
      errors.push({
        type: 'naming-convention',
        message: `Component files must use PascalCase. Found: ${fileName}. Example: Button.tsx, UserCard.tsx`,
        file: filePath,
      });
    }
  }

  // Check hooks folder structure
  if (normalizedPath.includes('/hooks/')) {
    const hooksIndex = folderPath.indexOf('hooks');
    const subfolder = folderPath[hooksIndex + 1];
    
    if (subfolder && !FOLDER_RULES.hooks.includes(subfolder)) {
      errors.push({
        type: 'folder-structure',
        message: `Hook should be in one of: ${FOLDER_RULES.hooks.join(', ')}. Found in: hooks/${subfolder}/`,
        file: filePath,
      });
    }
    
    // Check file naming
    if (!NAMING_RULES.hooks.test(fileName)) {
      errors.push({
        type: 'naming-convention',
        message: `Hook files must start with 'use' and use camelCase. Found: ${fileName}. Example: useAuth.ts, useApi.ts`,
        file: filePath,
      });
    }
  }

  // Check pages folder structure
  if (normalizedPath.includes('/pages/')) {
    if (!NAMING_RULES.pages.test(fileName)) {
      errors.push({
        type: 'naming-convention',
        message: `Page files must use PascalCase. Found: ${fileName}. Example: Dashboard.tsx, Login.tsx`,
        file: filePath,
      });
    }
  }

  // Check layouts folder structure
  if (normalizedPath.includes('/layouts/')) {
    if (!NAMING_RULES.layouts.test(fileName)) {
      errors.push({
        type: 'naming-convention',
        message: `Layout files must use PascalCase with 'Layout' suffix. Found: ${fileName}. Example: AppLayout.tsx, AuthLayout.tsx`,
        file: filePath,
      });
    }
  }

  // Check utils folder structure
  if (normalizedPath.includes('/utils/')) {
    const utilsIndex = folderPath.indexOf('utils');
    const subfolder = folderPath[utilsIndex + 1];
    
    if (subfolder && !FOLDER_RULES.utils.includes(subfolder)) {
      errors.push({
        type: 'folder-structure',
        message: `Utility should be in one of: ${FOLDER_RULES.utils.join(', ')}. Found in: utils/${subfolder}/`,
        file: filePath,
      });
    }
    
    // Check file naming
    if (!NAMING_RULES.utils.test(fileName)) {
      errors.push({
        type: 'naming-convention',
        message: `Utility files must use camelCase. Found: ${fileName}. Example: formatDate.ts, validateEmail.ts`,
        file: filePath,
      });
    }
  }

  // Check types folder structure
  if (normalizedPath.includes('/types/')) {
    const typesIndex = folderPath.indexOf('types');
    const subfolder = folderPath[typesIndex + 1];
    
    if (subfolder && !FOLDER_RULES.types.includes(subfolder)) {
      errors.push({
        type: 'folder-structure',
        message: `Type should be in one of: ${FOLDER_RULES.types.join(', ')}. Found in: types/${subfolder}/`,
        file: filePath,
      });
    }
    
    // Check file naming
    if (!NAMING_RULES.types.test(fileName)) {
      errors.push({
        type: 'naming-convention',
        message: `Type files must use PascalCase. Found: ${fileName}. Example: User.ts, ApiResponse.ts`,
        file: filePath,
      });
    }
  }

  // Check services folder structure
  if (normalizedPath.includes('/services/')) {
    const servicesIndex = folderPath.indexOf('services');
    const subfolder = folderPath[servicesIndex + 1];
    
    if (subfolder && !FOLDER_RULES.services.includes(subfolder)) {
      errors.push({
        type: 'folder-structure',
        message: `Service should be in one of: ${FOLDER_RULES.services.join(', ')}. Found in: services/${subfolder}/`,
        file: filePath,
      });
    }
    
    // Check file naming (only for endpoint services)
    if (normalizedPath.includes('/services/endpoints/')) {
      if (!NAMING_RULES.services.test(fileName)) {
        errors.push({
          type: 'naming-convention',
          message: `Service files must use camelCase with 'Service' suffix. Found: ${fileName}. Example: userService.ts, authService.ts`,
          file: filePath,
        });
      }
    }
  }

  // Check store folder structure
  if (normalizedPath.includes('/store/')) {
    const storeIndex = folderPath.indexOf('store');
    const subfolder = folderPath[storeIndex + 1];
    
    if (subfolder && !FOLDER_RULES.store.includes(subfolder)) {
      errors.push({
        type: 'folder-structure',
        message: `Store should be in one of: ${FOLDER_RULES.store.join(', ')}. Found in: store/${subfolder}/`,
        file: filePath,
      });
    }
  }

  // Check for path aliases usage - aligned with tsconfig.json paths
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    // Check if using relative imports when should use aliases
    // Based on docs/rules/folder-structure.md - should use @components, @hooks, etc.
    if (normalizedPath.includes('/components/') || 
        normalizedPath.includes('/pages/') ||
        normalizedPath.includes('/hooks/') ||
        normalizedPath.includes('/utils/') ||
        normalizedPath.includes('/types/') ||
        normalizedPath.includes('/services/') ||
        normalizedPath.includes('/store/')) {
      
      // Check for deep relative imports (../../components, etc.)
      const relativeImportRegex = /from\s+['"]\.\.\/\.\.\/(components|hooks|utils|types|services|store|pages|layouts)/;
      if (relativeImportRegex.test(content)) {
        errors.push({
          type: 'import-path',
          message: `Use path aliases (@components, @hooks, @utils, etc.) instead of relative imports. See docs/rules/folder-structure.md and tsconfig.json paths configuration.`,
          file: filePath,
        });
      }
    }
  }

  return errors;
}

function main() {
  log('\n📁 Validating folder structure and file naming...\n', 'blue');
  
  const stagedFiles = getStagedFiles();
  
  if (stagedFiles.length === 0) {
    log('No staged TypeScript files to validate.', 'yellow');
    process.exit(0);
  }
  
  log(`Found ${stagedFiles.length} staged file(s) to validate.\n`, 'blue');
  
  const allErrors = [];
  
  stagedFiles.forEach((file) => {
    const errors = validateFolderStructure(file);
    if (errors.length > 0) {
      allErrors.push(...errors);
    }
  });
  
  if (allErrors.length > 0) {
    log('\n❌ Folder structure violations found:\n', 'red');
    
    // Group errors by type
    const errorsByType = {};
    allErrors.forEach((error) => {
      if (!errorsByType[error.type]) {
        errorsByType[error.type] = [];
      }
      errorsByType[error.type].push(error);
    });
    
    Object.keys(errorsByType).forEach((type) => {
      log(`\n  ${type.toUpperCase().replace(/-/g, ' ')}:`, 'yellow');
      errorsByType[type].forEach((error) => {
        log(`    File: ${error.file}`, 'red');
        log(`    ${error.message}\n`, 'red');
      });
    });
    
    log('💡 Please fix these issues before committing.\n', 'yellow');
    log('📖 See docs/rules/folder-structure.md for guidelines.\n', 'blue');
    process.exit(1);
  }
  
  log('✅ Folder structure validation passed!\n', 'green');
  process.exit(0);
}

main();

