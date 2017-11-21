const browserSync = require('browser-sync');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const styleguide = require('devbridge-styleguide');

const config = require('../config');
const DEVELOPMENT = require('../environment').isDevelopment;

gulp.task('styleguide', () => {
    styleguide.startServer();
});

gulp.task('styleguideCopy', () => {
    gulp.src(`${config.STYLEGUIDE_BASE}/**/*`)
        .pipe(gulp.dest(config.STYLEGUIDE_DEST))
        .pipe(gulpif(DEVELOPMENT, browserSync.stream()));
});
