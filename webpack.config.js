var path = require('path');
var OfflinePlugin = require('offline-plugin');


var config = {
    context: path.join(__dirname, 'src'),

    entry: [
      './index.js',
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
      new OfflinePlugin()
    ],
};

module.exports = config;