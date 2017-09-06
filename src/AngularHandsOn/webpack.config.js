var path = require('path');
var webpack = require('webpack');

const entry = ['bookapp_updated/app.js'];

module.exports = {
    devtool: 'inline-source-map',
    context: path.join(__dirname, 'wwwroot/js'),
    entry: entry,
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html', '.cshtml'],
        modules: [path.resolve(__dirname, './wwwroot/js')]
    },
    module: {
        rules: [{
            test: /\.js$/,
            loaders: ['babel-loader', 'babel-core'],
            exclude: /node_modules/
        }]
    },
    output: {
        path: path.join(__dirname, 'wwwroot/dist'),
        filename: 'bundle.js'
    }
};