const config = require('../config');
const DEVELOPMENT = config.environment.isDevelopment;
const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const notify = require('gulp-notify');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../webpack.config.js');

gulp.task('bundle', () => {
    return gulp.src(config.JS_ENTRY)
        .pipe(plumber(function() { this.emit('end'); }))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(config.JS_BUILD))
        .pipe(gulpif(DEVELOPMENT, notify({ message: "JS's been built", onLast: true })))
        .pipe(plumber.stop());
});

gulp.task('js', ['bundle'], (done) => {
    browserSync.reload();
    done();
});
