/* Configuration */
const config = require('../config');

/* Gulp */
const gulp = require('gulp');

/* Plugins */
const imagemin = require('gulp-imagemin');

/* Task */
gulp.task('images:optimize', () => {
    return gulp.src(config.IMAGES_ALL, { base: config.GFX_BASE })
        .pipe(imagemin())
        .pipe(gulp.dest(config.GFX_BUILD));
});

gulp.task('images', ['images:optimize']);
