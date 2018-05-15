module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'plugin:flowtype/recommended'],
    plugins: ['flowtype', 'fp'],
    env: {
        browser: true
    },
    rules: {
        // This option sets a specific tab width for your code
        // We use 4 spaces as indetation
        // Also indent `case` in `switch` statement
        // https://eslint.org/docs/rules/indent
        indent: ['error', 4, { SwitchCase: 1 }],

        // Specify the maximum length of a line in your program
        // https://eslint.org/docs/rules/max-len
        'max-len': 'off',

        // Disallow the use of alert, confirm, and prompt
        // We don't want any alerts in the code
        // https://eslint.org/docs/rules/no-alert
        'no-alert': 'error',

        // Disallow arrow functions where they could be confused with comparisons
        // Allow if the body of the arrow function is wrapped in parenthesis
        // https://eslint.org/docs/rules/no-confusing-arrow
        'no-confusing-arrow': [
            'error',
            {
                allowParens: true
            }
        ],

        // Disallow use of console
        // Allow `console.error`
        // https://eslint.org/docs/rules/no-console
        'no-console': ['warn', { allow: ['error'] }],

        // Disallow nested ternary expressions
        // It's nice for JSX
        // https://eslint.org/docs/rules/no-nested-ternary
        'no-nested-ternary': 'warn',

        // Disallow reassignment of function parameters
        // Allow parameter object manipulation
        // https://eslint.org/docs/rules/no-param-reassign.html
        'no-param-reassign': ['error', {
            props: false
        }],

        // Disallow use of assignment in return statement
        // Unless they are enclosed in parentheses, e.g.:
        // (element, value) => (element.innerHTML = value);
        // https://eslint.org/docs/rules/no-return-assign
        'no-return-assign': ['error', 'except-parens'],

        // Disallow declaration of variables already declared in the outer scope
        // For importing and using action creators with Redux and props
        // https://eslint.org/docs/rules/no-shadow
        'no-shadow': 'off',

        // Disallow declaration of variables that are not used in the code
        // If you create a variable then you must use it
        // The same for function arguments
        // https://eslint.org/docs/rules/no-unused-vars
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'all',
                ignoreRestSiblings: true
            }
        ],

        // Disallow use of variables before they are defined
        // Sometimes we declare `function ()` before we use it
        // https://eslint.org/docs/rules/no-use-before-define
        'no-use-before-define': ['error', { functions: false }],

        // Eslint plugin import
        // https://github.com/benmosher/eslint-plugin-import

        // This rule reports any imports that come after non-import statements
        // Use `import/order` below to set the exact order of imports
        'import/first': 'off',

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

                    // 3. `internal` modules
                    // import foo from 'src/foo';
                    'internal',

                    // 4. modules from a `parent` directory
                    // import foo from '../foo';
                    'parent',

                    // 5. `sibling` modules from the same or a sibling's directory
                    // import bar from './bar';
                    'sibling',

                    // 6. `index` of the current directory
                    // import main from './';
                    'index'
                ],
                'newlines-between': 'always-and-inside-groups'
            }
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

        // Enforce JSX indentation
        // We use 4 spaces as indetation in `js`, for `jsx` as well
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': ['error', 4],

        // Validate props indentation in `jsx`
        // We use 4 spaces as indetation
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': ['error', 4],

        // Eslint plugin fp (Functional programming)
        // Forbid the use of Object.assign() with a variable as first argument
        // https://github.com/jfmengels/eslint-plugin-fp/blob/master/docs/rules/no-mutating-assign.md
        'fp/no-mutating-assign': 'error'
    }
};
