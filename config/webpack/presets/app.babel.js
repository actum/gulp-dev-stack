import { resolve } from 'path';
import environment from '../../environment';
import { JS_ENTRY, JS_CLIENT_BUILD } from '../../../config';
import webpackVendorConfig from '../presets';

const CWD = process.cwd();
const DEVELOPMENT = environment.is('development');

export default {
    entry: {
        app: ['babel-polyfill', JS_ENTRY]
    },
    /* Exclude external modules from bundling */
    externals: /^[^.]/,
    output: {
        path: resolve(CWD, JS_CLIENT_BUILD),
        pathinfo: DEVELOPMENT,
        filename: '[name].js'
    },
    cache: DEVELOPMENT
};
