var webpack = require('webpack');
var path = require('path');
var OfflinePlugin = require('offline-plugin');


var config = {
    debug : true,




    entry: [
      './src/index.js',
    ],
    output: {
      path: path.join(__dirname, 'www'),
      filename: 'app.js',
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
                loaders: ['babel'],
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(svg|woff|ttf|eot|png|jpg|gif)(\?.*)?$/i,
                loader: 'url-loader?limit=10000'
            },
        ],
    },
    resolveLoader: {
        root:[
           path.join(__dirname, 'node_modules'),
        ],
    },
    resolve: {
       root: [
            path.join(__dirname, 'node_modules'),
       ],
    },
    plugins: [
      new OfflinePlugin(),
      new webpack.NoErrorsPlugin()
    ],
};

module.exports = config;