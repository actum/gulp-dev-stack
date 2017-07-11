import gulp from 'gulp';
import cached from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import { GFX_BASE, GFX_BUILD, IMAGES_ALL } from '../../config';

/* Optimize images */
/* Handles common images format (jpg, png, gif) and single SVG images */
gulp.task('images', () => {
    return gulp.src(IMAGES_ALL, { base: GFX_BASE })
        .pipe(cached('images'))
        .pipe(imagemin())
        .pipe(gulp.dest(GFX_BUILD));
});
