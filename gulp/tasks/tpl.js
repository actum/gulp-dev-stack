import gulp from 'gulp';
import { argv } from 'yargs';
import nunjucks from 'gulp-nunjucks';
import { Environment, FileSystemLoader } from 'nunjucks';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import glob from 'glob';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import prettify from 'gulp-prettify';
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
    const searchPaths = isDev ? [src.tpl.base, src.icon.dest] : [src.tpl.base, dist.icon];
    const options = {
        noCache: true
    };

    return gulp.src(entry)
        // Temporary fix for gulp's error handling within streams, see https://github.com/actum/gulp-dev-stack/issues/7#issuecomment-152490084
        .pipe(plumber({
            errorHandler: e => gutil.log(gutil.colors.red(`${e.name} in ${e.plugin}: ${e.message}`))
        }))
        // https://mozilla.github.io/nunjucks/api.html#filesystemloader
        .pipe(nunjucks.compile(data, {
            env: new Environment(
                new FileSystemLoader(searchPaths, options)
            )
        }))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(gulpif(!isDev, prettify()))
        .pipe(gulp.dest(isDev ? src.base : dist.base))
        .pipe(browserSync.stream({ once: true }));
});
