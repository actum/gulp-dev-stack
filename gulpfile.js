/* Environment */
const environment = require('./gulp/environment');
process.env.NODE_ENV = environment.type;

/* Plugins */
const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp/tasks');

// API
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['less']);
