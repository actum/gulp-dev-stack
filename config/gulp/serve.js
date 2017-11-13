import gulp from 'gulp';
import gutil from 'gulp-util';
import gwatch from 'gulp-watch';
import browserSync from 'browser-sync';
import { copy as copyToClipboard } from 'copy-paste';
import environment from '../environment';
import runSequence from 'run-sequence';
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

gulp.task('serve', ['build'], () => {
    const baseDir = DEVELOPMENT ? [
        DEVELOPMENT_BASE,
        BUILD_DIR,
        NPM,
        STYLEGUIDE.SRC_DIR

    ] : BUILD_DIR;

    browserSync({
        port: PORT,
        server: { baseDir },
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
