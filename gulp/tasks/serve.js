import gulp from 'gulp';
import { argv } from 'yargs';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import { copy as copyToClipboard } from 'copy-paste';
import config from '../config';

const {
    port,
    paths: { gulpfile, npm, src, dist }
} = config;
const isDev = argv.dev || false;

gulp.task('serve', ['prepare'], () => {
    const baseDir = isDev ? [src.base, npm] : dist.base;

    browserSync({
        port,
        server: { baseDir },
        open: false
    }, () => copyToClipboard(`localhost:${port}`, () => gutil.log(gutil.colors.green('Local server address has been copied to your clipboard'))));

    const sanitize = pathname => pathname.replace(/^\.\//, '');
    const watch = (pathname, tasks) => gulp.watch(sanitize(pathname), tasks);

    if (isDev) {
        watch(src.styles.all, () => runSequence(['lint:styles', 'styles']));
        watch(src.tpl.all, ['tpl']);
        watch(src.icon.entry, ['icon']);
        watch(src.app.all, ['lint:app']);
        watch(gulpfile, ['lint:gulpfile']);
    }
});
