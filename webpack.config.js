"use strict";
let path = require('path')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let extractCSS = new ExtractTextPlugin('css/screen.css')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let nodeModulesPath = path.resolve(__dirname, 'node_modules')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    path.resolve(__dirname, 'src/js/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '/js/bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    extractCSS,
    new CopyWebpackPlugin(
      [{ from: 'src/img', to: 'img' }],
      {ignore: ['*.txt']}
    ),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [nodeModulesPath],
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, '..', '..', 'src')
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract(['raw', 'sass'])
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
  }
}
