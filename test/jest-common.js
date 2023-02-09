const path = require('path');

const config = {
  rootDir: path.join(__dirname, '..'),
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};

module.exports = config;
