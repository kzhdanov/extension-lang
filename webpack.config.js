const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/pageContent/index.js',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
};