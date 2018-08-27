const gulp = require('gulp');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync');
const merge = require('merge-stream');

const config = require('../config');

const DEVELOPMENT = config.environment.isDevelopment;

gulp.task('copySgAssets', () => {
  const css = gulp
    .src(`${config.CSS_BUILD}/*`)
    .pipe(gulp.dest(`${config.STYLEGUIDE_DEST}/css`))
    .pipe(gulpif(DEVELOPMENT, browserSync.stream()));

  const js = gulp
    .src(`${config.JS_BUILD}/*`)
    .pipe(gulp.dest(`${config.STYLEGUIDE_DEST}/js`));

  const gfx = gulp
    .src(`${config.GFX_BUILD}/**/*`)
    .pipe(gulp.dest(`${config.STYLEGUIDE_DEST}/gfx`));

  return merge(css, js, gfx);
});
