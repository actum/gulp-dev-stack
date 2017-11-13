import gulp from 'gulp';
import gutil from 'gulp-util';
import requireDir from 'require-dir';
import config from './config';
import environment from './config/environment';

/* Determine current environment */
environment.checkNodeVersion();
environment.define();

/* Require Gulp tasks recursively */
requireDir('./config/gulp');

/* Broadcast current environment to the console */
gutil.log(`Environment: ${gutil.colors.green(process.env.NODE_ENV)}`);

/* Gulp API */
gulp.task('default', ['serve']);
gulp.task('css', ['less']);
