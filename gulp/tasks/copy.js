const config = require('../config');
const gulp = require('gulp');

gulp.task('copyStyleguide', ['styleguide'], () => {
    gulp.src(`${config.STYLEGUIDE_BASE}/*`)
        .pipe(gulp.dest(config.STYLEGUIDE_DEST));
});
