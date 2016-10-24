/* Environment */
const DEVELOPMENT = require('../environment').isDevelopment;
const PRODUCTION = !DEVELOPMENT;

/* Plugins */
const gulp = require('gulp');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const plumber = require('gulp-plumber');
const config = require('../config');

/* Paths */
// const { src, dist } = config.paths;
const src = config.paths.src;
const dist = config.paths.dist;
const names = config.names;

gulp.task('js', () => {
    return gulp.src(src.app.entry)
        .pipe(plumber(function(e) {
            // gutil.log(gutil.colors.red(e.name) + e.message.substr(e.message.indexOf(': ') + 1));
            this.emit('end');
        }))
        .pipe(webpackStream( require('./../webpack.config.js'), webpack ))
        .pipe(gulpif(DEVELOPMENT, gulp.dest(dist.js)))
        .pipe(gulpif(DEVELOPMENT, browserSync.stream()))
        .pipe(gulpif(PRODUCTION, rename(names.js.min)))
        .pipe(gulpif(PRODUCTION, gulp.dest(dist.js)))
        .pipe(plumber.stop());
});
