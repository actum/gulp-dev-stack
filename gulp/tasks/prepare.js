const gulp = require('gulp');
const argv = require('yargs').argv;
const runSequence = require('run-sequence');

// TODO run browserSync after all tasks finished
const isDev = argv.dev || false;
const devSequence = ['clean', ['icon', 'styles', 'js'], 'tpl', 'styleguide'];
const buildSequence = devSequence;
const sequence = isDev ? devSequence : buildSequence;

gulp.task('prepare', () => runSequence(...sequence));
