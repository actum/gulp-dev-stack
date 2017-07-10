const config = require('../../config');
const environment = require('../environment');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync');
const merge = require('merge-stream');

gulp.task('copySgAssets', () => {
    const css = gulp.src(`${config.CSS_BUILD}/*`)
        .pipe(gulp.dest(`${config.STYLEGUIDE_DEST}/css`))
        .pipe(gulpif(environment.is('development'), browserSync.stream()));

    const js = gulp.src(`${config.JS_BUILD}/*`)
        .pipe(gulp.dest(`${config.STYLEGUIDE_DEST}/js`));

    const gfx = gulp.src(`${config.GFX_BUILD}/**/*`)
        .pipe(gulp.dest(`${config.STYLEGUIDE_DEST}/gfx`));

    return merge(css, js, gfx);
});
