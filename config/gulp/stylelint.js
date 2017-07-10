const config = require('../../config');
const environment = require('../environment');
const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const cached = require('gulp-cached');

gulp.task('stylelint', () => {
    return gulp
        .src(config.CSS_ALL)
        .pipe(cached('stylelint'))
        .pipe(stylelint({
            failAfterError: environment.is('production'),
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});
