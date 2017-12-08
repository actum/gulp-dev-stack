import del from 'del';
import gulp from 'gulp';
import { BUILD_DIR, CSS, CLIENT, VENDOR, HTML } from '../../config';

gulp.task('clean:full', () => del(BUILD_DIR));
gulp.task('clean:css', () => del(CSS.BUILD_DIR));
gulp.task('clean:html', () => del(HTML.BUILD_DIR));
gulp.task('clean:app', () => del(CLIENT.BUILD_DIR));
gulp.task('clean:vendor', () => del(VENDOR.BUILD_DIR));

gulp.task('clean', [
  'clean:css',
  'clean:gfx',
  'clean:html',
  'clean:app'
]);
