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
    STYLEGUIDE_BASE,
    BUILD_BASE,
    CSS_ALL,
    IMAGES_ALL,
    SVG_SPRITE_ALL,
    TEMPLATE_ALL,
    API
} from '../../config';

const DEVELOPMENT = environment.is('development');

gulp.task('serve', ['prepare'], () => {
    const baseDir = DEVELOPMENT ? [
        DEVELOPMENT_BASE,
        BUILD_BASE,
        NPM,
        STYLEGUIDE_BASE

    ] : BUILD_BASE;

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
        watch(CSS_ALL, ['styles', 'styleguide', 'copySgAssets']);
        watch(IMAGES_ALL, ['images', 'tpl']);
        watch(SVG_SPRITE_ALL, ['svg', 'tpl']);
        watch(TEMPLATE_ALL, ['tpl']);
        watch(API, ['api-reload']);
    }
});
