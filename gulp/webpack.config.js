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
        path: path.join(__dirname, dist.js),
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
