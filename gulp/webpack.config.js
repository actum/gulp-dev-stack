/* Configuration */
const config = require('./config');
const environment = config.environment;
const DEVELOPMENT = environment.isDevelopment;

/* Plugins */
const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const eslintConfig = require('eslint-config-actum').getConfig({ environment });

// function prepareVendor() {
//     var files = [];

//     console.log(config.JS_VENDOR_ALL);

//     gulp.src(config.JS_VENDOR_ALL)
//         .pipe((file) => {
//             console.log(file);
//             files.push({ name: file.name, path: file.path});
//             return file;
//         })
//         .pipe(gulp.dest('./'));

//     return files;
// }

// // console.log(prepareVendor());

const APP_ENTRY_NAME = path.parse(config.JS_ENTRY).name;

module.exports = {
    entry: {
        [APP_ENTRY_NAME]: config.JS_ENTRY
    },
    output: {
        path: path.join(__dirname, config.JS_BUILD),
        publicPath: 'js/',
        filename: DEVELOPMENT ? '[name].js' : '[name].min.js',
        chunkFilename: '[name]_[id].js'
    },
    devtool: DEVELOPMENT ? 'cheap-eval-source-map' : false,
    plugins: DEVELOPMENT ? [
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: '[name].js',
        //     minChunks: Infinity
        // })
    ] : [
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
    node: {
        __filename: true
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                use: `eslint?{ configFile: '${eslintConfig}' }`,
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

/*

js/
    serp/
        actions/
        containers/
        reducers/
        index.js

    header/
        actions/
        containers/
        reducers/
        index.js

    app.js


*/
