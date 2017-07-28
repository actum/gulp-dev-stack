import { resolve } from 'path';
import environment from '../../environment';
import { JS_ENTRY, JS_BUILD } from '../../../config';

const CWD = process.cwd();
const DEVELOPMENT = environment.is('development');

export default {
    entry: {
        app: ['babel-polyfill', JS_ENTRY]
    },
    /* Exclude external modules from bundling */
    externals: /^[^.]/,
    output: {
        path: resolve(CWD, JS_BUILD),
        pathinfo: DEVELOPMENT,
        filename: DEVELOPMENT ? '[name].js' : '[name].[chunkhash].js'
    },
    cache: DEVELOPMENT
};
