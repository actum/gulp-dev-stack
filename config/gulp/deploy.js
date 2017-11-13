import gulp from 'gulp';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import { argv } from 'yargs';
import tar from 'gulp-tar';
import gzip from 'gulp-gzip';
import scp from 'gulp-scp2';
import { buildSequence } from './build';
import {
    DEPLOY,
    DEPLOY_HOST,
    DEPLOY_USERNAME,
    DEPLOY_PASSWORD,
    DEPLOY_DEST,
    STYLEGUIDE
} from '../../config';

const buildNumber = argv.buildNumber || '0';
const jobName = argv.jobName || 'unknown';
const buildFile = `${jobName}-${buildNumber}.tar`;
const buildDest = `${DEPLOY.BUILD_DIR}/${jobName}`;

gulp.task('compress', () => {
    return gulp.src(`${STYLEGUIDE.BUILD_DIR}/**`)
        .pipe(tar(buildFile))
        .pipe(gzip())
        .pipe(gulp.dest('.'));
});

gulp.task('upload', () => {
    const options = {
        host: DEPLOY.HOST,
        username: DEPLOY.USERNAME,
        password: DEPLOY.PASSWORD,
        dest: buildDest
    };

    if (!options.host || !options.username || !options.password) {
        throw new gutil.PluginError('deploy', 'Upload destination is not specified correctly');
    }

    return gulp.src(`${buildFile}.gz`)
        .pipe(scp(options))
        .on('error', gutil.log);
});

gulp.task('deploy', () => runSequence(...buildSequence, 'compress', 'upload'));
