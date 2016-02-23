import gulp from 'gulp';
import { argv } from 'yargs';
import nunjucks from 'gulp-nunjucks';
import gutil from 'gulp-util';
import glob from 'glob';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import config from '../config';

const { src, dist } = config.paths;
const { entry } = src.tpl;
const isDev = argv.dev || false;

function getPagesList() {
    return glob.sync(entry)
        .map(pathname => pathname.replace(/\.[^\.]+$/, '').substring(pathname.lastIndexOf('/') + 1, pathname.length - 1))
        .filter(name => 'index' !== name);
}

gulp.task('tpl', () => {
    const data = {
        '_dev': isDev,
        '_pages': getPagesList()
    };

    return gulp.src(entry)
        // Temporary fix for gulp's error handling within streams, see https://github.com/actum/gulp-dev-stack/issues/7#issuecomment-152490084
        .pipe(plumber({
            errorHandler: e => gutil.log(gutil.colors.red(`${e.name} in ${e.plugin}: ${e.message}`))
        }))
        .pipe(nunjucks.compile(data))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulp.dest(isDev ? src.base : dist.base))
        .pipe(browserSync.stream({ once: true }));
});
