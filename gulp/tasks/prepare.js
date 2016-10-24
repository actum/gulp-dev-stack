/* Environment */
const DEVELOPMENT = require('../environment').isDevelopment;

/* Gulp */
const gulp = require('gulp');

/* Plugins */
const runSequence = require('run-sequence');

// TODO run browserSync after all tasks finished
const devSequence = ['clean', 'icon', ['styles', 'js', 'tpl'], 'styleguide'];
const buildSequence = devSequence;
const sequence = DEVELOPMENT ? devSequence : buildSequence;

gulp.task('prepare', () => runSequence(...sequence));
