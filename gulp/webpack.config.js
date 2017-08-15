/* Configuration */
const config = require('./config');
const DEVELOPMENT = config.environment.isDevelopment;

/* Modules */
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pluginsCollection = {
    /* Plugins common for each environment */
    common: [
        /* Declare Node environment within Webpack */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    development: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js',
            minChunks: 0
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new BundleAnalyzerPlugin()
    ],
    production: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].min.js',
            minChunks: Infinity
        })
    ]
};

/* Concat common and unique plugins */
const plugins = pluginsCollection.common.concat(
    pluginsCollection[process.env.NODE_ENV]
);

module.exports = {
    cache: true,
    devtool: DEVELOPMENT ? '#cheap-module-eval-source-map' : false,
    entry: {
        app: ['babel-polyfill', 'svgxuse', config.JS_ENTRY],
        vendor: ['react', 'react-dom', 'react-redux', 'redux']
    },
    output: {
        path: path.resolve(process.cwd(), config.JS_BUILD),
        publicPath: config.JS_WEBPACK_PUBLIC_PATH,
        filename: DEVELOPMENT ? '[name].js' : '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: { cacheDirectory: true }
                    },
                    {
                        loader: 'eslint-loader'
                    }
                ]
            }
        ]
    },
    plugins
};
