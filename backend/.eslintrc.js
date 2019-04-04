module.exports = {
   env: {
      es6: true,
      node: true,
   },
   extends: 'airbnb-base',
   globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
   },
   parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
   },
   rules: {
      'prefer-destructuring': 0,
      'indent': ['error', 3],
      'no-console': 0,
      'strict': 0,
      'no-trailing-spaces': 0,
      'padded-blocks': 0,
      'consistent-return': 0,
      'arrow-body-style': 0,
      'comma-dangle': ['error', 'never'],
      'eol-last': 0,
      'no-empty': 0,
      'import/newline-after-import': 0,
      'eqeqeq': 0,
      'no-unneeded-ternary': 0,
      "max-len": 0,
      "no-unreachable": 0
   },
};
