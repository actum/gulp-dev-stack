/* Configuration */
const config = require('./config');
const DEVELOPMENT = process.env.isDevelopment !== 'false';

/* Modules */
const path = require('path');
const webpack = require('webpack');
// const WriteFilePlugin = require('write-file-webpack-plugin');
// const eslintConfig = require('eslint-config-actum').getConfig({
//     environment: false
// });
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;

module.exports = {
    watch: true,
    cache: true,
    devtool: '#cheap-module-eval-source-map',
    // context: srcPath,
    entry: {
        app: config.JS_ENTRY
    },
    output: {
        path: path.resolve(process.cwd(), config.JS_BUILD),
        filename: DEVELOPMENT ? '[name].js' : '[name].min.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    {
                        loader: 'babel-loader',
                        query: { cacheDirectory: true }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules']
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
