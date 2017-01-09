const config = require('../config');
const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const cached = require('gulp-cached');

gulp.task('stylelint', () => {
    return gulp
        .src(config.CSS_ALL)
        .pipe(cached('stylelint'))
        .pipe(stylelint({
            failAfterError: false,
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});
