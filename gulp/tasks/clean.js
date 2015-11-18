import gulp from 'gulp';
import del from 'del';
import config from '../config';

const { dist } = config.paths;

gulp.task('clean', () => del(dist.base));