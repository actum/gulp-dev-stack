/* Environment */
const DEVELOPMENT = require('../environment').isDevelopment;

const gulp = require('gulp');
const argv = require('yargs').argv;
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const copyToClipboard = require('copy-paste').copy;
const config = require('../config');

// const {
//     port,
//     paths: { gulpfile, npm, src, dist, styleguide }
// } = config;
const port = config.port;
const gulpfile = config.paths.gulpfile;
const npm = config.paths.npm;
const src = config.paths.src;
const dist = config.paths.dist;
const styleguide = config.paths.styleguide;

gulp.task('serve', ['prepare'], () => {
    const baseDir = DEVELOPMENT ? [src.base, dist.base, npm, styleguide.base] : dist.base;

    browserSync({
        port,
        server: { baseDir },
        open: false
    }, () => copyToClipboard(`localhost:${port}`, () => gutil.log(gutil.colors.green('Local server address has been copied to your clipboard'))));

    const sanitize = pathname => pathname.replace(/^\.\//, '');
    const watch = (pathname, tasks) => gulp.watch(sanitize(pathname), tasks);

    if (DEVELOPMENT) {
        watch(src.styles.all, () => runSequence(['styles', 'styleguide']));
        watch(src.tpl.all, ['tpl']);
        watch(src.icon, ['icon']);
        watch(src.app.all, ['js']);
        // watch(gulpfile.entry, ['eslint:gulpfile']);
        // watch(gulpfile.rest, ['eslint:gulpfile']);
        // TODO: modify watch to take also array of files [gulpfile.entry, gulpfile.rest]
        // Question is if we need it, because after changes in any gulp task, you have to run gulp again, so the lint will start anyway
    }
});
