/* Environment */
const DEVELOPMENT = require('../environment').isDevelopment;

/* Plugins */
const gulp = require('gulp');
const argv = require('yargs').argv;
const runSequence = require('run-sequence');

// TODO run browserSync after all tasks finished
const devSequence = ['clean', ['icon', 'styles', 'js'], 'tpl', 'styleguide', 'copySgAssets'];
const buildSequence = devSequence;
const sequence = DEVELOPMENT ? devSequence : buildSequence;

gulp.task('prepare', () => runSequence(...sequence));
