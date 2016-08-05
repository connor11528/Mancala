const webpack = require('webpack')
const path  = require('path')


let config = {}

if(process.env.NODE_ENV === 'development'){

  config = {
      debug: true,
    devtool: 'cheap-module-eval-source-map',

    entry: [
      'webpack-hot-middleware/client?reload=true',
      'bootstrap-loader',
      './src/components/style.css',
      './src/index'
    ],
    target: 'web',
    output: {
      path:path.join( __dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './src'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: path.join(__dirname, 'src'),
          loader: 'babel'
        },
        {test: /(\.css)$/, loaders: ['style', 'css']},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
        {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
        {test: /\.(jpg)$/, loader: 'url?limit=5000'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},

        // Bootstrap 3 jquery requirement
        { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' }
      ]
    }
  }
 }


else if(process.env.NODE_ENV === 'production'){

  config = {
    devtool: 'source-map',

    entry: [
      'bootstrap-loader',
      './src/components/style.css',
      './src/index'
    ],

    target: 'web',
    output: {
      path: path.join(__dirname, 'production/client'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: path.join(__dirname, 'src'),
          loader: 'babel'
        },
        {test: /(\.css)$/, loaders: ['style', 'css']},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
        {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
        {test: /\.(jpg)$/, loader: 'url?limit=5000'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},

        // Bootstrap 3 jquery requirement
        { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' }
      ]
    }
  }

}
  module.exports = config;
