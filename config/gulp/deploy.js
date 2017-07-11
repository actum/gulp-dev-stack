import gulp from 'gulp';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import { argv } from 'yargs';
import tar from 'gulp-tar';
import gzip from 'gulp-gzip';
import scp from 'gulp-scp2';
import { buildSequence } from './prepare';
import {
    DEPLOY_HOST,
    DEPLOY_USERNAME,
    DEPLOY_PASSWORD,
    DEPLOY_DEST,
    STYLEGUIDE_DEST
} from '../../config';

const buildNumber = argv.buildNumber || '0';
const jobName = argv.jobName || 'unknown';
const buildFile = `${jobName}-${buildNumber}.tar`;
const buildDest = `${DEPLOY_DEST}/${jobName}`;

gulp.task('compress', () => {
    return gulp.src(`${STYLEGUIDE_DEST}/**`)
        .pipe(tar(buildFile))
        .pipe(gzip())
        .pipe(gulp.dest('.'));
});

gulp.task('upload', () => {
    const options = {
        host: DEPLOY_HOST,
        username: DEPLOY_USERNAME,
        password: DEPLOY_PASSWORD,
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
