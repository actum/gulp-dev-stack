import gulp from 'gulp';
import cached from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import { GFX } from '../../config';

/* Optimize images */
/* Handles common images format (jpg, png, gif) and single SVG images */
gulp.task('images', () => {
    return gulp.src(GFX.SRC_ALL, { base: GFX.SRC_DIR })
        .pipe(cached('images'))
        .pipe(imagemin())
        .pipe(gulp.dest(GFX.BUILD_DIR));
});
