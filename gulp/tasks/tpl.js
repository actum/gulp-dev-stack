const config = require('../config');
const DEVELOPMENT = config.environment.isDevelopment;
const PRODUCTION = !DEVELOPMENT;
const glob = require('glob');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const nunj = require('nunjucks');
const nunjucks = require('gulp-nunjucks');
const prettify = require('gulp-prettify');

const Environment = nunj.Environment;
const FileSystemLoader = nunj.FileSystemLoader;

function getPagesList() {
    return glob.sync(config.TEMPLATE_PAGES)
        .map(pathname => pathname.replace(/\.[^.]+$/, '').substring(pathname.lastIndexOf('/') + 1, pathname.length - 1))
        .filter(name => name !== 'index');
}

gulp.task('tpl', () => {
    const data = {
        _dev: DEVELOPMENT,
        _pages: getPagesList()
    };
    const searchPaths = [config.TEMPLATE_BASE, config.SVG_BUILD];
    const options = {
        noCache: true
    };

    return gulp.src(config.TEMPLATE_PAGES)
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
        .pipe(gulpif(PRODUCTION, prettify()))
        .pipe(gulp.dest(config.BUILD_BASE))
        .pipe(browserSync.stream({ once: true }));
});
