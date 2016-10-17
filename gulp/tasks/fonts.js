// const argv = require('yargs').argv;
// const gulpif = require('gulp-if');
// const glob = require('glob');
const gulp = require('gulp');
const sass = require('gulp-sass');
const concatCSS = require('gulp-concat-css');
const fontmin = require('gulp-fontmin');
const config = require('../config');

const src = config.paths.src;
const dist = config.paths.dist;
const entry = src.fonts.entry;
// const isDev = argv.dev || false;

gulp.task('fonts', () => {
    /* Create a bundle */
    gulp.src(src.fonts.faces)
        .pipe(concatCSS('bundle.css'))
        .pipe(gulp.dest(dist.fonts));

    /* Convert other formats and copy to dist */
    return gulp.src(src.fonts.all)
        .pipe(fontmin({ css: false }))
        .pipe(gulp.dest(dist.fonts));
});
