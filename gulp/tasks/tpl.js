const gulp = require('gulp');
const argv = require('yargs').argv;
const nunjucks = require('gulp-nunjucks');
const nunj = require('nunjucks');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const glob = require('glob');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const prettify = require('gulp-prettify');
const config = require('../config');

const Environment = nunj.Environment;
const FileSystemLoader = nunj.FileSystemLoader;
// const { src, dist } = config.paths;
const src = config.paths.src;
const dist = config.paths.dist;
const entry = src.tpl.entry;
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
    const searchPaths = [src.tpl.base, './'];
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
        .pipe(gulp.dest(dist.base))
        .pipe(browserSync.stream({ once: true }));
});
