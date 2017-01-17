var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var  webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var app = express();

var compiler = webpack(webpackConfig);

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

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Test App listenin at http://%s:%s', host, port);
});