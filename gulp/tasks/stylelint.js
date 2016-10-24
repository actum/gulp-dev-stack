/* Configuration */
const config = require('../config');

/* Gulp */
const gulp = require('gulp');

/* Plugins */
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
