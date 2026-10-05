const path = require('path');
const fs = require('fs');

// Ensure complete web distribution bundle is assembled in dist
try {
  require('./scripts/build.js');
} catch (e) {
  console.warn('[webpack] Notice: build.js auto-assembly skipped:', e.message);
}

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'vitalora.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: false,
  },
  resolve: {
    extensions: ['.js'],
  },
};

