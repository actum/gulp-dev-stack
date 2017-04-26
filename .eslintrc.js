module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'plugin:flowtype/recommended'],
    plugins: ['flowtype', 'fp'],
    env: {
        browser: true
    },
    rules: {
        'arrow-body-style': 0,
        'arrow-parens': 0, // Does not work with Flow generic types.
        'class-methods-use-this': [1, { 'exceptMethods': [] }],
        'comma-dangle': [1, 'never'],
        'fp/no-mutating-assign': 2,
        'import/extensions': 2, // Ensure consistent use of file extension.
        'import/first': 0, // Este sorts by atom/sort-lines natural order.
        'import/newline-after-import': 0,
        'import/no-duplicates': 2,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/prefer-default-export': 0, // No. Actions can have just one action.
        indent: [1, 4, { SwitchCase: 1 }],
        'jsx-a11y/html-has-lang': 0, // Can't recognize the Helmet.
        'max-len': 0,
        'no-alert': 2,
        'no-class-assign': 0, // Class assign is used for higher order components.
        'no-confusing-arrow': 0, // This rule is super confusing.
        'no-console': 1,
        'no-duplicate-imports': 0, // github.com/babel/eslint-plugin-babel/issues/59#issuecomment-230118848
        'no-nested-ternary': 0, // It's nice for JSX.
        'no-param-reassign': 0, // We love param reassignment. Naming is hard.
        'no-return-assign': 0,
        'no-shadow': 0, // Shadowing is a nice language feature. Naming is hard.
        'no-unused-expressions': 0,
        'no-unused-vars': 0,
        'no-use-before-define': ['error', { functions: false }],
        'padded-blocks': 0,
        'react/forbid-prop-types': 0, // Este is going to use Flow types.
        'react/jsx-filename-extension': 0, // No, JSX belongs to .js files
        'react/jsx-indent': 0, // Damn. We need Yarn asap.
        'react/jsx-indent-props': [1, 4],
        'react/no-unused-prop-types': 0, // Este is going to use Flow types.
        'react/prop-types': 0, // Can't detect flowtype correctly.
        // 'sort-keys': 2,
        'space-before-function-paren': 0,
        strict: 0
    },
};
