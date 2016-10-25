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

// Parser does not handle "let" variables:
// https://github.com/mishoo/UglifyJS2/issues/448
let UglifyJsPluginConfig = {
    compress: {
        warnings: false
    },
    sourceMap: true,
    mangle: false,
    comments: false
};

module.exports = {
    entry: {
        'app' : src.app.entry
    },
    output: {
        filename: '[name].js'
    },
    devtool: DEVELOPMENT ? 'cheap-eval-source-map' : 'hidden-source-map',
    plugins: DEVELOPMENT ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(UglifyJsPluginConfig)
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'eslint',
                enforce: 'pre',
                exclude: /(node_modules)/
            },
            {
                test: /\.js$/,
                use: 'babel',
                exclude: /(node_modules)/,
                options: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
