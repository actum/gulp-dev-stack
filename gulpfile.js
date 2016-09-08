const gulp = require('gulp');
const argv = require('yargs').argv;
const requireDir = require('require-dir');

const isDev = argv.dev || false;
process.env.NODE_ENV = isDev ? 'development' : 'production';

requireDir('./gulp/tasks');

// API
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['less']);
