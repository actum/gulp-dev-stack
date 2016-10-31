/* Configuration */
const config = require('./config');
const environment = config.environment;
const DEVELOPMENT = environment.isDevelopment;

/* Modules */
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

/* Get dynamic entry name from the one set in config.js@JS_ENTRY */
const APP_ENTRY_NAME = path.parse(config.JS_ENTRY).name;

/* Common plugins */
const commonPlugins = [];

/* Environment-specific plugins */
const uniquePlugins = {
    DEVELOPMENT: [],

    PRODUCTION: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true,
            mangle: false,
            comments: false
        })
    ]
};

/* Concat common and unique plugins */
const plugins = commonPlugins.concat(uniquePlugins[environment.type]);

module.exports = {
    entry: {
        [APP_ENTRY_NAME]: config.JS_ENTRY
    },
    output: {
        path: path.join(__dirname, config.JS_BUILD),
        publicPath: 'js/',
        filename: DEVELOPMENT ? '[name].js' : '[name].min.js',
        chunkFilename: 'chunks/chunk.[name].js'
    },
    devtool: DEVELOPMENT ? 'cheap-eval-source-map' : false,
    plugins,
    module: {
        rules: [
            {
                test: /\.js?/,
                use: `eslint?{ configFile: '${eslintConfig}' }`,
                enforce: 'pre',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015']
                }
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
