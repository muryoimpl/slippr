require('babel-polyfill')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  target: 'electron',

  entry: {
    'app': path.resolve(__dirname, 'src/index.jsx'),
    'child': path.resolve(__dirname, 'src/child.jsx')
  },

  output: {
    path: path.resolve(__dirname),
    filename: './dist/[name].bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: { presets: ['react', 'es2015', 'stage-3'] }, exclude: path.resolve(__dirname, 'node_modules') },
      { test: /entities\/maps\/.*\.json$/, loader: 'json' },
      { test: /markdown-it-emoji\/lib\/data\/.*\.json$/, loader: 'json' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ]
}
