const environment = require('../environment');
const gulp = require('gulp');
const runSequence = require('run-sequence');

// TODO run browserSync after all tasks finished
const devSequence = ['clean', ['images', 'svg', 'styles'], 'tpl', 'styleguide', 'copySgAssets'];
if (environment.isApi) {
    devSequence.push('api');
}
const buildSequence = devSequence;
const sequence = environment.is('development') ? devSequence : buildSequence;

gulp.task('prepare', () => runSequence(...sequence));

module.exports = {
    buildSequence
};
