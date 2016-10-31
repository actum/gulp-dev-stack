/* Environment */
const config = require('./gulp/config');
process.env.NODE_ENV = config.environment.type;

/* Gulp */
const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp/extensions');
requireDir('./gulp/tasks');

/* API */
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['less']);
