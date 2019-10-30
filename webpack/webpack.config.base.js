const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const htmling = require('htmling')
var nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    index: './app.js'
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
          // options: {
          //   attrs: [':data-src']
          // }
        }
      }
    ]
  },
  resolve: {
    // alias: {
    //   htmling: path.resolve(__dirname, '../node_modules/htmling')
    // }
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve(__dirname, '../views'),
        to: path.resolve(__dirname, '../dist/views')
      },
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static')
      }
    ]),
    new CleanWebpackPlugin()
    // new webpack.DefinePlugin({
    //   htmling
    // })
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    // filename: '[name].[hash].bundle.js'
    filename: '[name].js'
  },
  node: {
    __dirname: false
  },
  externals: [nodeExternals()] //'htmling',
}
