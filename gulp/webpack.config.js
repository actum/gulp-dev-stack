const autoprefixer = require('autoprefixer');
const config = require('./config');
const path = require('path');
const webpack = require('webpack');
const argv = require('yargs').argv;

const src = config.paths.src;
const dist = config.paths.dist;

const isDev = argv.dev || false;

module.exports = {
    entry: {
        'app' : src.app.entry
    },
    output: {
        filename: '[name].js',
    },
    devtool: isDev ? 'source-map' : null,
    plugins: isDev ? [] : [
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
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                loader: 'style!css!postcss-loader!sass'
            }
        ]
    }
    // ,
    // eslint: {
    //     configFile: '.eslintrc'
    // }
};
