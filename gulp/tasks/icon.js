const gulp = require('gulp');
const argv = require('yargs').argv;
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');
const config = require('../config');

// const { src, dist } = config.paths;
const src = config.paths.src;
const dist = config.paths.dist;
const isDev = argv.dev || false;

gulp.task('icon', () => {
    return gulp.src(src.icon.entry)
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
        .pipe(gulp.dest(isDev ? src.icon.dest : dist.icon));
        // TODO run 'tpl' task and 'browserSync' after icon task
        // to include svg.svg file into all templates
});
