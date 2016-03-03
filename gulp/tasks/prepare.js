import gulp from 'gulp';
import { argv } from 'yargs';
import runSequence from 'run-sequence';

// lets use 'prepare' task for both dev and prod so we can use production build sequence for both build task and prod serve task
// before this change, we've been using dev 'prepare' in prod serve task…

// TODO run browserSync after all tasks finished
const isDev = argv.dev || false;
const devSequence = ['icon', ['less', 'js', 'tpl']];
const buildSequence = ['clean', ...devSequence];
const sequence = isDev ? devSequence : buildSequence;

gulp.task('prepare', () => runSequence(...sequence));
