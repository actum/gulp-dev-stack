const config = require('./config');
const environment = require('./config/environment');
const gulp = require('gulp');
const requireDir = require('require-dir');

environment.checkNodeVersion();
environment.define();

requireDir('./config/gulp');

/* API */
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['less']);
