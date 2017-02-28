const webpack = require('webpack')
const path = require('path')

module.exports = {
  target: 'electron-renderer',

  entry: {
    'app': path.resolve(__dirname, 'src/index.jsx'),
    'child': path.resolve(__dirname, 'src/child.jsx')
  },

  output: {
    path: path.resolve(__dirname),
    filename: './dist/[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(jsx?|json)$/,
        loader: 'babel-loader',
        options: JSON.stringify({
          presets: ['react', 'es2015', 'stage-3']
        }),
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ]
}
