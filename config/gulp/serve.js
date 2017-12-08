import gulp from 'gulp';
import gutil from 'gulp-util';
import gwatch from 'gulp-watch';
import { buildSequence } from './build';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { copy as copyToClipboard } from 'copy-paste';
import runSequence from 'run-sequence';
import environment from '../environment';
import webpackAppConfig from '../webpack/presets/app.babel';
import {
    PORT,
    NPM,
    DEVELOPMENT_BASE,
    STYLEGUIDE,
    BUILD_DIR,
    CSS,
    GFX,
    SVG,
    TEMPLATES,
    API
} from '../../config';

const DEVELOPMENT = environment.is('development');

/**
 * Prepare.
 */
gulp.task('prepare', () => runSequence(...buildSequence));

/**
 * Serve.
 */
gulp.task('serve', ['prepare'], () => {
    const baseDir = DEVELOPMENT ? [
        DEVELOPMENT_BASE,
        BUILD_DIR,
        NPM,
        STYLEGUIDE.SRC_DIR
    ] : BUILD_DIR;

    // webpackAppConfig.entry.app.unshift(
    //     'react-hot-loader/patch',
    //     'webpack-hot-middleware/client'
    // );

    const compiler = webpack(webpackAppConfig);

    browserSync({
        port: PORT,
        server: { baseDir },
        middleware: DEVELOPMENT && [
            webpackDevMiddleware(compiler, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                publicPath: webpackAppConfig.output.publicPath,
                historyApiFallback: true,
                hotOnly: true, // force page reload in case hot update failed
                quiet: false,
                stats: {
                    colors: true
                }
            }),
            webpackHotMiddleware(compiler)
        ],
        open: false
    }, (unknown, bs) => {
        const finalPort = bs.options.get('port');
        copyToClipboard(
            `localhost:${finalPort}`,
            () => gutil.log(gutil.colors.green('Local server address has been copied to your clipboard'))
        )
    });

    const watch = (glob, tasks) => gwatch(glob, () => runSequence(...tasks));

    if (DEVELOPMENT) {
        watch(CSS.SRC_ALL, ['styles', 'styleguide', 'copySgAssets']);
        watch(GFX.SRC_ALL, ['images', 'tpl']);
        watch(SVG.SPRITES.SRC_ALL, ['svg', 'tpl']);
        watch(TEMPLATES.SRC_ALL, ['tpl']);
        watch(API.SRC_ENTRY, ['api:reload']);
    }
});
