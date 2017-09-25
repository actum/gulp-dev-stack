import webpack from 'webpack';
import { resolvers, processors } from '../webpack.parts';
import { mergeParts, absolutePath } from '../webpack.utils';
import environment from '../../environment';
import { CLIENT, VENDOR } from '../../../config';

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// TODO Check proper environment propagation
const DEVELOPMENT = environment.is('development');
const PRODUCTION = !DEVELOPMENT;

export default mergeParts([
    {
        entry: {
            app: ['babel-polyfill', CLIENT.ENTRY]
        },
        output: {
            filename: '[name].js',
            path: absolutePath(CLIENT.BUILD_DIR),
            pathinfo: DEVELOPMENT
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: absolutePath(VENDOR.MANIFEST_FILEPATH)
            }),

            new BundleAnalyzerPlugin() // TODO Remove
        ],
        devtool: DEVELOPMENT ? 'source-map' : 'cheap-module-inline-source-map',
        cache: true,
        bail: PRODUCTION,
        profile: DEVELOPMENT
    },

    /* Compile JavaScript */
    processors.js({
        include: [CLIENT.SRC_DIR]
    }),

    /* Include custom resolvers */
    resolvers()
]);
