const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const config = require('../config');
const cached = require('gulp-cached');
const debug = require('gulp-debug');

const src = config.paths.src;

gulp.task('stylelint', () => {
    return gulp
        .src(src.styles.all)
        .pipe(cached('stylelint'))
        .pipe(debug())
        .pipe(stylelint({
            failAfterError: false,
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});
