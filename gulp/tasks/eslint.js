/* Configuration */
const config = require('../config');
const DEVELOPMENT = config.environment.isDevelopment;
const PRODUCTION = !DEVELOPMENT;

/* Gulp */
const gulp = require('gulp');
const gulpif = require('gulp-if');

/* Plugins */
const eslint = require('gulp-eslint');

const lint = (globs) => {
    const opts = DEVELOPMENT ? {
        'rules': {
            'no-empty': 0,
            'space-in-parens': 0,
            'no-unused-vars': 0,
            'no-multiple-empty-lines': 0
        }
    } : {};

    return gulp.src(globs)
        .pipe(eslint(opts))
        .pipe(eslint.format())
        .pipe(gulpif(PRODUCTION, eslint.failOnError()));
};

gulp.task('eslint:app', () => lint(config.JS_ALL));
gulp.task('eslint:gulpfile', () => lint(config.GULP_ALL));

gulp.task('eslint', ['eslint:gulpfile', 'eslint:app']);
