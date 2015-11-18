import gulp from 'gulp';
import { argv } from 'yargs';
import swig from 'gulp-swig';
import gutil from 'gulp-util';
import glob from 'glob';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import config from '../config';

const { src, dist } = config.paths;
const { entry } = src.tpl;
const isDev = argv.dev || false;

gulp.task('tpl', () => {
    let opts = {
        defaults: { cache: false },
        data: {
            '_dev': isDev,
            '_pages': (() => {
                return glob.sync(entry).map((pathname) => {
                    return pathname.replace(/\.[^\.]+$/, '').substring(pathname.lastIndexOf('/') + 1, pathname.length - 1);
                });
            })()
        }
    };
    return gulp.src(entry)
        // Temporary fix for gulp's error handling within streams, see https://github.com/actum/gulp-dev-stack/issues/7#issuecomment-152490084
        .pipe(plumber({
            errorHandler: e => gutil.log(gutil.colors.red(`${e.name} in ${e.plugin}: ${e.message}`))
        }))
        .pipe(swig(opts))
        .pipe(gulp.dest(isDev ? src.base : dist.base))
        .pipe(browserSync.reload({ stream: true }));
});