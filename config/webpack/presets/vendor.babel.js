import { resolve } from 'path';
import webpack from 'webpack';
import { absolutePath } from '../webpack.utils';
import { VENDOR } from '../../../config';
import packageJson from '../../../package.json';

console.log('packageJson', Object.keys(packageJson.dependencies));

export default {
    entry: {
        vendor: Object.keys(packageJson.dependencies)
    },
    output: {
        filename: '[name].js',
        path: absolutePath(VENDOR.BUILD_DIR),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: VENDOR.MANIFEST_FILEPATH
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            sourceMap: false,
            mangle: {
                except: ['require', 'exports']
            }
        })
    ]
};
