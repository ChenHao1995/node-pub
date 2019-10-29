const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
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
  plugins: [new CleanWebpackPlugin()],
  output: {
    path: path.resolve(__dirname, '../dist'),
    // filename: '[name].[hash].bundle.js'
    filename: '[name].js'
  }
  // externals: ['htmling']
}
