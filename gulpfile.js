const config = require('./gulp/config');
config.environment.check();
process.env.NODE_ENV = config.environment.type;

const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp/tasks');

/* API */
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
