var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    admin: './www/admin/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'app/public/admin'),
    filename: '[name].js',
    publicPath: '/public/admin/',
    chunkFilename: '[name].js'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'www'),
      'node_modules'
    ],
    // 约定省略后缀
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ]
  }
}
