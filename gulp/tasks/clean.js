/* Configuration */
const config = require('../config');

/* Gulp */
const gulp = require('gulp');

/* Plugins */
const del = require('del');

gulp.task('clean', () => del(config.BUILD_BASE));
