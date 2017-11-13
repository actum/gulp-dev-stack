import gulp from 'gulp';
import del from 'del';
import { BUILD_DIR, CLIENT, VENDOR } from '../../config';

gulp.task('clean', () => del(BUILD_DIR));
gulp.task('clean:app', () => del(CLIENT.BUILD_DIR));
gulp.task('clean:vendor', () => del(VENDOR.BUILD_DIR));
