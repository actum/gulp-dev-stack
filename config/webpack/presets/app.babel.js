import webpack from 'webpack';
import BabelMinifyPlugin from 'babel-minify-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
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
    })
];

if (PRODUCTION) {
    plugins.push(
        /**
         * Minification, tree shaking.
         * NOTE: Tree shaking (or dead code elimination) is acheived by setting { "modules": false }
         * in the .babelrc of the application directory. Without this, modules will be transpiled
         * and determination of a dead code will become impossible.
         */
        new BabelMinifyPlugin({
            mangle: {
                topLevel: true
            }
        }),

        /* Optimize code for better performance */
        new OptimizeJsPlugin(),

        /**
         * Prevent from emitting files to disk when build failed.
         * NOTE: You may want to comment this out for debugging purposes.
         * For example, to investigate a stack trace within the built bundle.
         */
        new webpack.NoEmitOnErrorsPlugin()
    );
}

export default mergeParts(
    {
        entry: {
            app: ['babel-polyfill', CLIENT.ENTRY]
        },
        output: {
            filename: '[name].js',
            path: absolutePath(CLIENT.BUILD_DIR),
            pathinfo: DEVELOPMENT
        },
        plugins,
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
        include: [absolutePath(CLIENT.SRC_DIR)]
    }),

    /* Common resolvers */
    resolvers()
);
