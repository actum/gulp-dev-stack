import webpack from 'webpack';
import { resolvers, processors } from '../webpack.parts';
import { mergeParts, absolutePath } from '../webpack.utils';
import environment from '../../environment';
import { CLIENT, VENDOR } from '../../../config';

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
            })
        ],
        devtool: DEVELOPMENT ? 'source-map' : 'cheap-module-inline-source-map',
        cache: DEVELOPMENT,
        bail: PRODUCTION,
        profile: DEVELOPMENT
    },

    /* Include custom resolvers */
    resolvers(),

    /* Compile JavaScript */
    processors.js({
        include: CLIENT.SRC_DIR
    })
]);
