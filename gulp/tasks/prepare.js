const gulp = require('gulp');
const runSequence = require('run-sequence');

const config = require('../config');

const DEVELOPMENT = config.environment.isDevelopment;

// TODO run browserSync after all tasks finished
const devSequence = [
  'clean',
  ['images', 'svg', 'styles', 'js'],
  'tpl',
  'styleguide',
  'copySgAssets',
];
if (config.environment.isApi) {
  devSequence.push('api');
}
const buildSequence = devSequence;
const sequence = DEVELOPMENT ? devSequence : buildSequence;

gulp.task('prepare', () => runSequence(...sequence));

module.exports = {
  buildSequence,
};
