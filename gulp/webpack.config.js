/* Configuration */
const config = require('./config');
const DEVELOPMENT = config.environment.isDevelopment;

/* Modules */
const path = require('path');
const webpack = require('webpack');

const pluginsCollection = {
    /* Plugins common for each environment */
    common: [
        /* Declare Node environment within Webpack */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                isDevelopment: JSON.stringify(DEVELOPMENT)
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    development: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    production: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false,
            comments: false
        })
    ]
};

/* Concat common and unique plugins */
const plugins = pluginsCollection.common.concat(
    pluginsCollection[process.env.NODE_ENV]
);

module.exports = {
    cache: true,
    devtool: '#cheap-module-eval-source-map',
    entry: {
        app: ['babel-polyfill', 'svgxuse', config.JS_ENTRY]
    },
    output: {
        path: path.resolve(process.cwd(), config.JS_BUILD),
        publicPath: config.JS_WEBPACK_PUBLIC_PATH,
        filename: DEVELOPMENT ? '[name].js' : '[name].min.js',
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
    resolve: {
        modules: ['node_modules']
    },
    plugins
};
