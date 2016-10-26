/* Configuration */
const config = require('./config');
const DEVELOPMENT = config.environment.isDevelopment;

/* Plugins */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'app' : config.JS_ENTRY
    },
    output: {
        path: path.join(__dirname, config.JS_BUILD),
        filename: DEVELOPMENT ? '[name].js' : '[name].min.js'
    },
    devtool: DEVELOPMENT ? 'cheap-eval-source-map' : false,
    plugins: DEVELOPMENT ? [ ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true,
            mangle: false,
            comments: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.js?/,
                use: 'eslint',
                enforce: 'pre',
                exclude: /(node_modules)/
            },
            {
                test: /\.js?/,
                use: 'babel',
                exclude: /(node_modules)/,
                options: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
