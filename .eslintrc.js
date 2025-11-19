module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y',
    'project-rules', // Custom project rules plugin (linked via npm link)
  ],
  rules: {
    // React rules
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/prop-types': 'off', // Using TypeScript for prop validation
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // TypeScript rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'error',
    
    // Accessibility rules
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    
    // Custom project rules - CSP Compliance
    'project-rules/no-inline-styles': 'error',
    'project-rules/no-inline-event-handlers': 'error',
    
    // Custom project rules - ADA Compliance
    'project-rules/require-aria-label': 'warn',
    'project-rules/require-semantic-html': 'warn',
    'project-rules/require-keyboard-handler': 'error',
    'project-rules/require-alt-text': 'error',
    
    // Custom project rules - Mobile-Friendly
    'project-rules/require-responsive-breakpoints': 'warn',
    'project-rules/require-touch-target-size': 'warn',
    
    // Custom project rules - Performance
    'project-rules/require-react-memo': 'warn',
    
    // General rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx', '*.spec.ts', '*.spec.tsx'],
      rules: {
        // Relax some rules in test files
        'project-rules/require-react-memo': 'off',
        'project-rules/require-responsive-breakpoints': 'off',
        'project-rules/require-touch-target-size': 'off',
        'project-rules/require-keyboard-handler': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};

