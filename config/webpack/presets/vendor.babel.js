import { resolve } from 'path';
import webpack from 'webpack';
import { absolutePath } from '../webpack.utils';
import { VENDOR } from '../../../config';
import environment from '../../environment';
import packageJson from '../../../package.json';

/* Environment */
const PRODUCTION = environment.is('production');

const plugins = [
    /* Propagete process environment to the bundle */
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    /* Create a manifest containing module references */
    new webpack.DllPlugin({
        name: '[name]',
        path: VENDOR.MANIFEST_FILEPATH
    })
];

if (PRODUCTION) {
    plugins.push(
        /* Minimize the bundle */
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            sourceMap: false,
            mangle: {
                except: ['require', 'exports']
            }
        })
    );
}

export default {
    entry: {
        vendor: Object.keys(packageJson.dependencies)
    },
    output: {
        filename: '[name].js',
        path: absolutePath(VENDOR.BUILD_DIR),
        library: '[name]'
    },
    plugins
};
