/* Environment */
const config = require('./gulp/config');
process.env.NODE_ENV = config.ENVIRONMENT.NAME;

/* Gulp */
const gulp = require('gulp');
const argv = require('yargs').argv;
const requireDir = require('require-dir');

requireDir('./gulp/tasks');

/* API */
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['less']);
