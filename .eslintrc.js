module.exports = {
  parser: 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: true,
    jest: true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb'
  ],
  rules: {
    "react/jsx-uses-react": "error",
    'import/prefer-default-export': 0,
    'comma-dangle': 0,
    'arrow-parens': 0,
    'react/jsx-filename-extension': 0,
    'no-underscore-dangle': 0,
    'import/no-mutable-exports': 0,
    'no-restricted-syntax': 0,
    'react/prefer-stateless-function': 0,
    'no-unused-vars': 1,
    'react/self-closing-comp': 1,
    'eol-last': 1,
    'no-trailing-spaces': 0,
    'global-require': 0,
    'no-console': 0,
    'react/destructuring-assignment': 0,
    "react/require-default-props": 0,
    "react/forbid-prop-types": 0,
    "react/prop-types": 0,
    'import/no-named-as-default': 0,
    'react/no-unused-prop-types': 1,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'class-methods-use-this': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/no-unused-prop-types': 0,
    'react/no-unused-prop-types': 0
  }
};