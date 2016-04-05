import gulp from 'gulp';
import { argv } from 'yargs';
import runSequence from 'run-sequence';

// TODO run browserSync after all tasks finished
const isDev = argv.dev || false;
const devSequence = ['clean', 'icon', ['styles', 'js', 'tpl']];
const buildSequence = devSequence;
const sequence = isDev ? devSequence : buildSequence;

gulp.task('prepare', () => runSequence(...sequence));
