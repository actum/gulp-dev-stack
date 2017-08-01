import gulp from 'gulp';
import del from 'del';
import { BUILD_BASE, JS_CLIENT_BUILD, JS_VENDOR_BUILD } from '../../config';

gulp.task('clean', () => del(BUILD_BASE));
gulp.task('clean/app', () => del(JS_CLIENT_BUILD));
gulp.task('clean/vendor', () => del(JS_VENDOR_BUILD));
