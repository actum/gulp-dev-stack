/* Configuration */
const config = require('../config');

/* Plugins */
const gulp = require('gulp');
const path = require('path');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');

gulp.task('icon', () => {
    return gulp.src(config.SVG_ALL)
        .pipe(svgmin((file) => {
            const prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(gulp.dest(config.SVG_BUILD));
        // TODO run 'tpl' task and 'browserSync' after icon task
        // to include svg.svg file into all templates
});
