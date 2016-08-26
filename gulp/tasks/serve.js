const gulp = require('gulp');
const argv = require('yargs').argv;
const gutil = require('gulp-util');
const browserSync = require('browser-sync');
const copyToClipboard = require('copy-paste').copy;
const config = require('../config');

// const {
//     port,
//     paths: { gulpfile, npm, src, dist }
// } = config;
const port = config.port;
const gulpfile = config.paths.gulpfile;
const npm = config.paths.npm;
const src = config.paths.src;
const dist = config.paths.dist;
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
        watch(src.styles.all, ['styles']);
        watch(src.tpl.all, ['tpl']);
        watch(src.icon.entry, ['icon']);
        watch(src.app.all, ['lint:app']);
        watch(gulpfile, ['lint:gulpfile']);
    }
});
