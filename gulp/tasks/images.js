const config = require('../config');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cached = require('gulp-cached');

/* Optimize images */
/* Handles common images format (jpg, png, gif) and single SVG images */
gulp.task('images', () => {
    return gulp.src(config.IMAGES_ALL, { base: config.GFX_BASE })
        .pipe(cached('images'))
        .pipe(imagemin())
        .pipe(gulp.dest(config.GFX_BUILD));
});
