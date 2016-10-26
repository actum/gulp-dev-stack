/* Plugins */
const gulp = require('gulp');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
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
            this.emit('end');
        }))
        .pipe(webpackStream(require('./../webpack.config.js'), webpack))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(dist.js))
        .pipe(plumber.stop());
});
