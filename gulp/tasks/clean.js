const gulp = require('gulp');
const del = require('del');
const config = require('../config');

// const { dist } = config.paths;
const dist = config.paths.dist;

gulp.task('clean', () => del(dist.base));
