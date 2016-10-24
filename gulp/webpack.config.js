/* Environment */
const DEVELOPMENT = require('./environment').isDevelopment;
const PRODUCTION = !DEVELOPMENT;

/* Plugins */
const config = require('./config');
const path = require('path');
const webpack = require('webpack');
const argv = require('yargs').argv;
const src = config.paths.src;
const dist = config.paths.dist;

module.exports = {
    entry: {
        'app' : src.app.entry
    },
    output: {
        filename: '[name].js',
    },
    devtool: DEVELOPMENT ? 'source-map' : null,
    plugins: DEVELOPMENT ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ],
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/,
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
