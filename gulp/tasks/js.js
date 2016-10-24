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

// const { src, dist } = config.paths;
const src = config.paths.src;
const dist = config.paths.dist;
const names = config.names;
const isDev = argv.dev || false;

gulp.task('js', () => {
    return gulp.src(src.app.entry)
        .pipe(plumber(function(e) {
            // gutil.log(gutil.colors.red(e.name) + e.message.substr(e.message.indexOf(': ') + 1));
            this.emit('end');
        }))
        .pipe(webpackStream( require('./../webpack.config.js'), webpack ))
        .pipe(gulpif(isDev, gulp.dest(dist.js)))
        .pipe(gulpif(isDev, browserSync.stream()))
        .pipe(gulpif(!isDev, rename(names.js.min)))
        .pipe(gulpif(!isDev, gulp.dest(dist.js)))
        .pipe(plumber.stop());
});
