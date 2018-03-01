const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const cached = require('gulp-cached');

const config = require('../config');

const PRODUCTION = config.environment.isProduction;

gulp.task('stylelint', () => {
    return gulp
        .src(config.CSS_ALL)
        .pipe(cached('stylelint'))
        .pipe(stylelint({
            failAfterError: PRODUCTION,
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});
