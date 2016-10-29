const webpack = require('webpack');
const path = require('path');

module.exports = {
  target: 'electron',

  entry: path.resolve(__dirname, 'src/index.jsx'),

  output: {
    path: path.resolve(__dirname),
    filename: 'app.bundle.js',
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: { presets: ['react', 'es2015'] }, exclude: path.resolve(__dirname, 'node_modules') },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  devtool: 'inline-source-map',

  plugins: [],
};
