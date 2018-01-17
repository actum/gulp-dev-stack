import { argv } from 'yargs';
import webpack from 'webpack';
import BabelMinifyPlugin from 'babel-minify-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { processors, resolvers } from '../webpack.parts';
import { mergeParts, absolutePath } from '../webpack.utils';
import environment from '../../environment';
import { CLIENT, VENDOR } from '../../../config';

// TODO Check proper environment propagation
const DEVELOPMENT = environment.is('development');
const PRODUCTION = environment.is('production');

/* Plugins */
const plugins = [
    /* Reference vendor bundle manifest */
    new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: absolutePath(VENDOR.MANIFEST_FILEPATH)
    }),
    new webpack.NamedChunksPlugin()
    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'static',
    // })
];

if (DEVELOPMENT) {
    console.log('webpack.HotModuleReplacementPlugin', webpack.HotModuleReplacementPlugin);

    plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (PRODUCTION) {
    plugins.push(
        /* Optimize code for better performance */
        new OptimizeJsPlugin(),

        /**
         * Minification, tree shaking.
         * NOTE: Tree shaking (or dead code elimination) is acheived by setting { "modules": false }
         * in the .babelrc of the application directory. Without this, modules will be transpiled
         * and determination of a dead code will become impossible.
         */
        new BabelMinifyPlugin({
            removeConsole: true,
            removeDebugger: true,
            mangle: {
                topLevel: true
            }
        }),

        /**
         * (Optional) Gzip compression.
         * Provide "--gzip" CLI flag to compress the bundle during the production build.
         * NOTE: Make sure back-end handles Gzip encoding beforehand.
         */
        argv.gzip && new CompressionPlugin(),

        /**
         * Prevent from emitting files to disk when build fails.
         * NOTE: You may want to comment this out for debugging purposes.
         * For example, to investigate a stack trace within the built bundle.
         */
        new webpack.NoEmitOnErrorsPlugin()
    );
}

export default mergeParts([
    {
        entry: {
            /* If you wish to rename the bundle make sure to rename it in "serve.js" Gulp task as well */
            app: ['babel-polyfill', CLIENT.ENTRY]
        },
        output: {
            filename: '[name].js',
            path: absolutePath(CLIENT.BUILD_DIR),
            publicPath: '/js',
            pathinfo: DEVELOPMENT
        },
        plugins: plugins.filter(Boolean),
        devtool: DEVELOPMENT && 'source-map',
        cache: true,
        bail: PRODUCTION,
        profile: DEVELOPMENT,
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        }
    },

    /* Compile JavaScript */
    processors.js({
        include: [absolutePath(CLIENT.SRC_DIR)],
        hot: DEVELOPMENT
    }),

    /* Common resolvers */
    resolvers()
]);
