const config = require('../config');
const gulp = require('gulp');
const stylelint = require('gulp-stylelint');

gulp.task('stylelint', () => {
    return gulp
        .src(config.CSS_ALL)
        .pipe(stylelint({
            failAfterError: false,
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
});
