var path = require('path');
var webpack = require('webpack');
var utils = require('./build-utils');

var vueLoaderConfig = {
  loaders: utils.cssLoaders({
    sourceMap: false,
    extract: false
  })
};

module.exports = {
  devtool: 'source-map',
  entry: {
    admin: './www/admin/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'app/public/admin'),
    filename: 'js/app.js',
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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash].[ext]'
        }
      }
    ]
  }
}
