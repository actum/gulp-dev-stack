const gulp = require('gulp');
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
const cached = require('gulp-cached');

const config = require('../config');

const PRODUCTION = config.environment.isProduction;

const lint = (globs) => {
    return gulp.src(globs)
        .pipe(cached('eslint'))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(gulpif(PRODUCTION, eslint.failOnError()));
};

gulp.task('eslint:app', () => lint(config.JS_ALL));

gulp.task('eslint', ['eslint:app']);
