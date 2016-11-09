const config = require('../config');
const DEVELOPMENT = config.environment.isDevelopment;
const gulp = require('gulp');
const gulpif = require('gulp-if');
const path = require('path');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');

/* SVG sprites */
/* Single SVG images are optimized in "images.js" */
gulp.task('svg:sprite', () => {
    var spriteName;

    return gulp.src(config.SVG_SPRITE_ALL)
        .pipe(svgmin((file) => {
            const prefix = path.basename(file.relative, path.extname(file.relative));

            /* Get dynamic sprite folder name */
            spriteName = path.dirname(file.relative);

            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: `${prefix}-`,
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename((file) => {
            file.basename = spriteName;
            return file;
        }))
        .pipe(gulp.dest(config.SVG_BUILD))
        .pipe(gulpif(DEVELOPMENT, browserSync.stream()));
});

gulp.task('svg', ['svg:sprite']);
