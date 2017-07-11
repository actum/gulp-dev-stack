import gulp from 'gulp';
import del from 'del';
import { BUILD_BASE } from '../../config';

gulp.task('clean', () => del(BUILD_BASE));
