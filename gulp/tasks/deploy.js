const gulp = require('gulp');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const scp = require('gulp-scp2');

const config = require('../config');

const buildSequence = require('./prepare').buildSequence;

const buildNumber = argv.buildNumber || '0';
const jobName = argv.jobName || 'unknown';
const buildFile = `${jobName}-${buildNumber}.tar`;
const buildDest = `${config.DEPLOY_DEST}/${jobName}`;

gulp.task('compress', () =>
  gulp
    .src(`${config.STYLEGUIDE_DEST}/**`)
    .pipe(tar(buildFile))
    .pipe(gzip())
    .pipe(gulp.dest('.')),
);

gulp.task('upload', () => {
  const options = {
    host: config.DEPLOY_HOST,
    username: config.DEPLOY_USERNAME,
    password: config.DEPLOY_PASSWORD,
    dest: buildDest,
  };

  if (!options.host || !options.username || !options.password) {
    throw new gutil.PluginError(
      'deploy',
      'Upload destination is not specified correctly',
    );
  }

  return gulp
    .src(`${buildFile}.gz`)
    .pipe(scp(options))
    .on('error', gutil.log);
});

gulp.task('deploy', () => runSequence(...buildSequence, 'compress', 'upload'));
