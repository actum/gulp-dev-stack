module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {},
  parser: 'babel-eslint',
  plugins: ['fp', 'prettier'],
  rules: {
    // Setup prettier
    'prettier/prettier': 'error',

    // Disallow the use of alert, confirm, and prompt
    // We don't want any alerts in the code
    // https://eslint.org/docs/rules/no-alert
    'no-alert': 'error',

    // Allow use of `console.log` for development with warning
    // Allow `console.error`
    // https://eslint.org/docs/rules/no-console
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      { allow: ['error'] },
    ],

    // Allow debugger with warning for development
    // https://eslint.org/docs/rules/no-debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // Disallow nested ternary expressions
    // It's nice for JSX
    // https://eslint.org/docs/rules/no-nested-ternary
    'no-nested-ternary': 'warn',

    // Disallow reassignment of function parameters
    // Allow parameter object manipulation
    // https://eslint.org/docs/rules/no-param-reassign.html
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],

    // Disallow use of assignment in return statement
    // Unless they are enclosed in parentheses, e.g.:
    // (element, value) => (element.innerHTML = value);
    // https://eslint.org/docs/rules/no-return-assign
    'no-return-assign': ['error', 'except-parens'],

    // Disallow declaration of variables already declared in the outer scope
    // For importing and using action creators with Redux and props
    // https://eslint.org/docs/rules/no-shadow
    'no-shadow': 'off',

    // Disallow use of variables before they are defined
    // Sometimes we declare `function ()` before we use it
    // https://eslint.org/docs/rules/no-use-before-define
    'no-use-before-define': ['error', { functions: false }],

    // Eslint plugin import
    // https://github.com/benmosher/eslint-plugin-import

    // This rule reports any imports that come after non-import statements
    // Use `import/order` below to set the exact order of imports
    'import/first': 'off',

    // Allow importing devDependencies
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    // Enforce a convention in module import order
    // Always have an empty line between import groups
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: [
          // 1. node `builtin` modules
          // import path from 'path';
          'builtin',

          // 2. `external` modules
          // import react from 'react';
          'external',
        ],
        'newlines-between': 'ignore',
      },
    ],

    // Require modules with a single export to use a default export
    // Sometimes we have a single function inside a utility file, but we don't want to use a `default export`
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',

    // Eslint plugin React
    // https://github.com/yannickcr/eslint-plugin-react/

    // Only `.jsx` files may have `jsx` syntax
    // We use `jsx` syntax in `.js` files
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': 'off',

    // Eslint plugin React
    // https://github.com/yannickcr/eslint-plugin-react/

    // Disable required default props
    // For stateless components we use default function parameters
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
    'react/require-default-props': 'off',

    // Enable `dangerouslySetInnerHTML`, e.g. rendering object in `<script>` tag as global config
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
    'react/no-danger': 'off',

    // Eslint plugin fp (Functional programming)
    // Forbid the use of Object.assign() with a variable as first argument
    // https://github.com/jfmengels/eslint-plugin-fp/blob/master/docs/rules/no-mutating-assign.md
    'fp/no-mutating-assign': 'error',

    // Accessibility rules on JSX elements
    // https://github.com/evcohen/eslint-plugin-jsx-a11y

    // Turn off some stupid accessibility rules
    // Cannot use '#' as link
    'jsx-a11y/anchor-is-valid': 'off',

    // Cannot use `onClick` on modal element for outside click event
    'jsx-a11y/no-static-element-interactions': 'off',

    // Difference to Actum gulp-devstack:
    // We want alphabetical props order
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: false,
        shorthandFirst: false,
        shorthandLast: false,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: false,
      },
    ],

    'flowtype/space-after-type-colon': 'off',
    'flowtype/generic-spacing': 'off',

    // Disallow declaration of variables that are not used in the code
    // If you create a variable then you must use it
    // The same for function arguments
    // Difference to Actum Gulp-devstack:
    // Enable declaring ingored arguments when prefixed with an underscore
    // https://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],

    // It is more readable and/or convenient to write code this way
    // https://eslint.org/docs/rules/no-unused-expressions
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],

    // default value of this rule is 'both' which requires the input to be
    // nested inside of its label, but Kentico HTML structure is different
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ],
  },
}
