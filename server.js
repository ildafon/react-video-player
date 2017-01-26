var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var  webpack = require('webpack');
var config = require('./webpack.config.js');
var app = express();


// Source maps
    config.devtool = 'eval';

// Add Hot Loader server entry points.
    config.entry.unshift(
     'webpack-dev-server/client?http://localhost:8082',
     'webpack/hot/dev-server'
    );

// Add HMR plugin
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

// Add React Hot loader
    config.module.loaders[0].loaders.unshift('react-hot');


    var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'App.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
}));

app.use(express.static(__dirname + '/www'));

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Test App listenin at http://%s:%s', host, port);
});