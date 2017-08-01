import { resolve } from 'path';
import webpack from 'webpack';
import { JS_VENDOR_BUILD } from '../../../config';

export default {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux'
        ]
    },
    output: {
        filename: '[name].js',
        path: resolve(process.cwd(), JS_VENDOR_BUILD),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: `${JS_VENDOR_BUILD}/[name]-manifest.json`,
            name: '[name]'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false,
            comments: false,
            screw_ie8: true,
            compress: {
                drop_console: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            }
        })
    ]
};
