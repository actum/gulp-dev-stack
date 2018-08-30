const gulp = require('gulp');
const gulpif = require('gulp-if');
const eslint = require('gulp-eslint');
const cached = require('gulp-cached');

const config = require('../config');

const PRODUCTION = config.environment.isProduction;
const DEVELOPMENT = !PRODUCTION;

/**
 * Has ESLint fixed the file contents?
 *
 * @param {object} file
 */
const isFixed = (file) => file.eslint != null && file.eslint.fixed;

/**
 *
 * @param {string|Array} globs
 * @param {string} dest Destination of fixed files
 */
const lint = (globs, dest) =>
  gulp
    .src(globs)
    .pipe(cached('eslint'))
    .pipe(
      eslint({
        fix: DEVELOPMENT,
      }),
    )
    .pipe(eslint.format())
    .pipe(gulpif(isFixed, gulp.dest(dest)))
    .pipe(gulpif(PRODUCTION, eslint.failOnError()));

gulp.task('eslint:app', () => lint(config.JS_ALL, config.JS_BASE));

gulp.task('eslint:mock', () => lint(config.MOCK_ALL, config.MOCK_BASE));

gulp.task('eslint:gulpTasks', () => lint(config.GULP_TASKS, config.GULP_BASE));

gulp.task('eslint:gulpfile', () => lint(config.GULPFILE, './'));

gulp.task('eslint:gulpAll', () => lint(config.GULP_ALL, './'));

gulp.task('eslint', [
  'eslint:gulpfile',
  'eslint:gulpTasks',
  'eslint:mock',
  'eslint:app',
]);
