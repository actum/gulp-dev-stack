/* Configuration */
const config = require('../config');

/* Gulp */
const gulp = require('gulp');
const plumber = require('gulp-plumber');

/* Plugins */
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../webpack.config.js');

gulp.task('js', () => {
    return gulp.src(config.JS_ENTRY)
        .pipe(plumber(function() {
            this.emit('end');
        }))
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(config.JS_BUILD))
        .pipe(plumber.stop());
});
