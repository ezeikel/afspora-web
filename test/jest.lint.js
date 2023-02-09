const path = require('path');

const config = {
  rootDir: path.join(__dirname, '..'),
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/**/*.+(js|jsx|ts|tsx)'],
};

module.exports = config;
