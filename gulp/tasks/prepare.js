const config = require('../config');
const DEVELOPMENT = config.environment.isDevelopment;
const gulp = require('gulp');
const runSequence = require('run-sequence');

// TODO run browserSync after all tasks finished
const devSequence = devSequence = ['clean', ['images', 'svg', 'styles', 'js'], 'tpl', 'styleguide', 'copySgAssets'];
const buildSequence = devSequence;
const sequence = DEVELOPMENT ? devSequence : buildSequence;

gulp.task('prepare', () => runSequence(...sequence));
