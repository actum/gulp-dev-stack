import gulp from 'gulp';
import { argv } from 'yargs';
import requireDir from 'require-dir';

const isDev = argv.dev || false;
process.env.NODE_ENV = isDev ? 'development' : 'production';

requireDir('./gulp/tasks');

// API
gulp.task('default', ['serve']);
gulp.task('build', ['prepare']);
gulp.task('css', ['less']);
