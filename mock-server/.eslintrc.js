module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  // extends: ['airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix',
    ], // https://stackoverflow.com/q/39114446/2771889
  },
};
