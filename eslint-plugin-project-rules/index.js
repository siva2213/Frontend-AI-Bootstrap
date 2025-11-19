module.exports = {
  meta: {
    name: 'eslint-plugin-project-rules',
    version: '1.0.0',
  },
  rules: {
    // ============================================
    // CSP COMPLIANCE RULES
    // ============================================
    
    'no-inline-styles': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow inline styles for CSP compliance',
          category: 'CSP Compliance',
          recommended: true,
        },
        fixable: null,
        schema: [],
        messages: {
          noInlineStyle: 'Inline styles are not allowed. Use Material UI sx prop or Tailwind classes instead. See docs/rules/component-standards.md',
        },
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (
              node.name.name === 'style' &&
              node.value &&
              node.value.type === 'JSXExpressionContainer'
            ) {
              // Check if it's an object expression (style={{...}})
              if (node.value.expression.type === 'ObjectExpression') {
                context.report({
                  node,
                  messageId: 'noInlineStyle',
                });
              }
            }
          },
        };
      },
    },

    'no-inline-event-handlers': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow inline event handlers in JSX attributes',
          category: 'CSP Compliance',
          recommended: true,
        },
        messages: {
          noInlineHandler: 'Inline event handlers are not allowed for CSP compliance. Use function references instead. See docs/rules/component-standards.md',
        },
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (
              node.name.name &&
              node.name.name.startsWith('on') &&
              node.value &&
              node.value.type === 'JSXExpressionContainer'
            ) {
              const expression = node.value.expression;
              // Check for onClick={() => ...} or onClick={handleClick()}
              if (
                expression.type === 'ArrowFunctionExpression' ||
                (expression.type === 'CallExpression' && 
                 expression.callee.type === 'Identifier')
              ) {
                context.report({
                  node,
                  messageId: 'noInlineHandler',
                });
              }
            }
          },
        };
      },
    },

    // ============================================
    // ADA COMPLIANCE RULES
    // ============================================

    'require-aria-label': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require aria-label for interactive elements without visible text',
          category: 'ADA Compliance',
          recommended: true,
        },
        messages: {
          requireAriaLabel: 'Interactive element without visible text must have aria-label. See docs/rules/component-standards.md',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            const elementName = node.name.name?.toLowerCase();
            const interactiveElements = ['button', 'a', 'input', 'select', 'textarea'];
            
            const isInteractive = 
              interactiveElements.includes(elementName) ||
              node.attributes.some(attr => 
                attr.name && attr.name.name === 'role' && 
                ['button', 'link', 'menuitem'].includes(attr.value?.value)
              );

            if (isInteractive) {
              const hasAriaLabel = node.attributes.some(
                attr => attr.name && (
                  attr.name.name === 'aria-label' ||
                  attr.name.name === 'aria-labelledby'
                )
              );
              
              // Check if element has visible text content
              const parent = node.parent;
              const hasVisibleText = parent && (
                (parent.children && parent.children.some(child => 
                  child.type === 'JSXText' && child.value.trim().length > 0
                )) ||
                (parent.type === 'JSXElement' && parent.children && 
                 parent.children.some(child => 
                   child.type === 'JSXText' && child.value.trim().length > 0
                 ))
              );

              // Check if it's an icon-only button (common case)
              const hasIconOnly = node.attributes.some(
                attr => attr.name && (
                  attr.name.name === 'children' ||
                  (attr.name.name === 'startIcon' || attr.name.name === 'endIcon')
                )
              );

              if (!hasAriaLabel && !hasVisibleText && hasIconOnly) {
                context.report({
                  node,
                  messageId: 'requireAriaLabel',
                });
              }
            }
          },
        };
      },
    },

    'require-semantic-html': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Prefer semantic HTML elements over divs for accessibility',
          category: 'ADA Compliance',
        },
        messages: {
          useSemantic: 'Use semantic HTML element (nav, main, article, section, etc.) instead of div for better accessibility. See docs/rules/component-standards.md',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'div') {
              // Check if it has onClick (should be button)
              const hasOnClick = node.attributes.some(
                attr => attr.name && attr.name.name === 'onClick'
              );
              
              // Check if it has navigation-related role
              const isNavigation = node.attributes.some(
                attr => attr.name && attr.name.name === 'role' && 
                attr.value?.value === 'navigation'
              );

              if (hasOnClick && !isNavigation && 
                  !node.attributes.some(attr => attr.name?.name === 'role')) {
                context.report({
                  node,
                  messageId: 'useSemantic',
                });
              }
            }
          },
        };
      },
    },

    'require-keyboard-handler': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require keyboard event handlers for interactive elements',
          category: 'ADA Compliance',
        },
        messages: {
          requireKeyboard: 'Interactive element with onClick must have onKeyDown handler for keyboard accessibility. See docs/rules/component-standards.md',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            const hasOnClick = node.attributes.some(
              attr => attr.name && attr.name.name === 'onClick'
            );
            
            const hasOnKeyDown = node.attributes.some(
              attr => attr.name && attr.name.name === 'onKeyDown'
            );

            const isNativeButton = node.name.name === 'button' || 
              node.name.name === 'a';

            if (hasOnClick && !hasOnKeyDown && !isNativeButton) {
              context.report({
                node,
                messageId: 'requireKeyboard',
              });
            }
          },
        };
      },
    },

    'require-alt-text': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require alt text for images',
          category: 'ADA Compliance',
        },
        messages: {
          requireAlt: 'Images must have alt text for accessibility. See docs/rules/component-standards.md',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'img' || node.name.name === 'Image') {
              const hasAlt = node.attributes.some(
                attr => attr.name && attr.name.name === 'alt'
              );
              
              if (!hasAlt) {
                context.report({
                  node,
                  messageId: 'requireAlt',
                });
              }
            }
          },
        };
      },
    },

    // ============================================
    // MOBILE-FRIENDLY RULES
    // ============================================

    'require-responsive-breakpoints': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Require Material UI responsive breakpoints in sx prop',
          category: 'Mobile-First',
        },
        messages: {
          requireBreakpoints: 'Use responsive breakpoints in sx prop for mobile-first design. Example: sx={{ padding: { xs: 2, sm: 3, md: 4 } }}. See docs/rules/component-standards.md',
        },
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (node.name.name === 'sx' && node.value) {
              const expression = node.value.expression;
              
              // Check if sx prop has object with responsive breakpoints
              if (expression && expression.type === 'ObjectExpression') {
                const hasBreakpoints = expression.properties.some(prop => {
                  if (prop.value && prop.value.type === 'ObjectExpression') {
                    // Check if it has xs, sm, md, lg, xl keys
                    const breakpointKeys = prop.value.properties.map(p => 
                      p.key?.name || p.key?.value
                    );
                    return ['xs', 'sm', 'md', 'lg', 'xl'].some(bp => 
                      breakpointKeys.includes(bp)
                    );
                  }
                  return false;
                });

                // If sx has many properties but no breakpoints, suggest using them
                if (expression.properties.length > 3 && !hasBreakpoints) {
                  context.report({
                    node,
                    messageId: 'requireBreakpoints',
                  });
                }
              }
            }
          },
        };
      },
    },

    'require-touch-target-size': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Ensure touch targets are at least 44x44px',
          category: 'Mobile-First',
        },
        messages: {
          requireTouchTarget: 'Interactive elements should have minimum 44x44px touch target for mobile. Add minWidth and minHeight in sx prop. See docs/rules/component-standards.md',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            const isInteractive = node.attributes.some(
              attr => attr.name && (
                attr.name.name === 'onClick' ||
                (attr.name.name === 'role' && 
                 ['button', 'link'].includes(attr.value?.value))
              )
            );

            if (isInteractive) {
              const sxProp = node.attributes.find(
                attr => attr.name && attr.name.name === 'sx'
              );

              if (sxProp && sxProp.value) {
                const expression = sxProp.value.expression;
                if (expression && expression.type === 'ObjectExpression') {
                  const hasMinSize = expression.properties.some(prop => {
                    const key = prop.key?.name || prop.key?.value;
                    return key === 'minWidth' || key === 'minHeight';
                  });

                  if (!hasMinSize) {
                    context.report({
                      node,
                      messageId: 'requireTouchTarget',
                    });
                  }
                }
              } else {
                // No sx prop at all - suggest adding it
                context.report({
                  node,
                  messageId: 'requireTouchTarget',
                });
              }
            }
          },
        };
      },
    },

    // ============================================
    // PERFORMANCE RULES
    // ============================================

    'require-react-memo': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Suggest React.memo for components with props',
          category: 'Performance',
        },
        messages: {
          requireMemo: 'Component with props should consider using React.memo for performance optimization. See docs/rules/component-standards.md',
        },
      },
      create(context) {
        let componentName = null;
        let hasProps = false;
        let hasMemo = false;
        let isExport = false;

        return {
          ExportNamedDeclaration(node) {
            isExport = true;
            componentName = null;
            hasProps = false;
            hasMemo = false;
          },
          
          VariableDeclarator(node) {
            if (
              node.init &&
              node.init.type === 'CallExpression' &&
              node.init.callee
            ) {
              // Check for React.memo() or memo() (imported from React)
              const isReactMemo = 
                node.init.callee.type === 'MemberExpression' &&
                node.init.callee.object.name === 'React' &&
                node.init.callee.property.name === 'memo';
              
              const isMemoImport = 
                node.init.callee.type === 'Identifier' &&
                node.init.callee.name === 'memo';
              
              if (isReactMemo || isMemoImport) {
                hasMemo = true;
                componentName = node.id.name;
              }
            }
          },

          ArrowFunctionExpression(node) {
            // Check if function has parameters (props)
            if (node.params && node.params.length > 0) {
              hasProps = true;
            }
          },

          FunctionDeclaration(node) {
            if (node.params && node.params.length > 0) {
              hasProps = true;
            }
          },

          'ExportNamedDeclaration:exit'(node) {
            if (isExport && hasProps && !hasMemo) {
              // Check if this is a component export
              const declaration = node.declaration;
              if (declaration) {
                let exportedName = null;
                
                if (declaration.type === 'VariableDeclaration') {
                  exportedName = declaration.declarations[0]?.id?.name;
                } else if (declaration.type === 'FunctionDeclaration') {
                  exportedName = declaration.id?.name;
                }
                
                // Skip if it's a hook (starts with 'use')
                if (exportedName && !exportedName.startsWith('use') && 
                    exportedName[0] === exportedName[0].toUpperCase()) {
                  context.report({
                    node,
                    messageId: 'requireMemo',
                  });
                }
              }
            }
            isExport = false;
          },
        };
      },
    },
  },
};

