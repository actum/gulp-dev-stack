/* Configuration */
const config = require('../config');
const DEVELOPMENT = config.ENVIRONMENT.IS_DEVELOPMENT;
const PRODUCTION = !DEVELOPMENT;

/* Gulp */
const argv = require('yargs').argv;
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const path = require('path');
const rename = require('gulp-rename');

/* Plugins */
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const buffer = require('vinyl-buffer');
const envify = require('envify');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const uglifyify = require('uglifyify');
const watchify = require('watchify');

function bundle() {
    const transforms = [envify, babelify];
    const opts = {
        entries: config.JS_ENTRY,
        debug: DEVELOPMENT,
        transform: DEVELOPMENT ? transforms : [...transforms, uglifyify]
    };
    const bundler = DEVELOPMENT ? watchify(browserify(Object.assign({}, watchify.args, opts))) : browserify(opts);

    function rebundle() {
        return bundler.bundle()
            .on('error', e => gutil.log(gutil.colors.red(e.name) + e.message.substr(e.message.indexOf(': ') + 1)))
            .pipe(source(path.basename(opts.entries)))
            .pipe(buffer())
            .pipe(gulpif(DEVELOPMENT, sourcemaps.init({ loadMaps: true })))
            .pipe(gulpif(DEVELOPMENT, sourcemaps.write('./')))
            .pipe(gulp.dest(config.JS_BUILD))
            .pipe(gulpif(DEVELOPMENT, browserSync.stream()))
            .pipe(gulpif(PRODUCTION, uglify()))
            .pipe(gulpif(PRODUCTION, rename({
                suffix: '.min'
            })))
            .pipe(gulpif(PRODUCTION, gulp.dest(config.JS_BUILD)));
    };

    bundler
        .on('update', rebundle)
        .on('log', gutil.log);
    return rebundle();
};

gulp.task('js', ['eslint'], bundle);
