const gulp = require('gulp');
const gutil = require('gulp-util');
const requireDir = require('require-dir');
const config = require('./config');
const environment = require('./config/environment');

/* Determine current environment */
environment.checkNodeVersion();
environment.define();

/* Require Gulp tasks dynamically */
requireDir('./config/gulp');

/* Broadcast current environment to the console */
gutil.log(`Environment: ${gutil.colors.green(process.env.NODE_ENV)}`);

/* Gulp API */
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['less']);
