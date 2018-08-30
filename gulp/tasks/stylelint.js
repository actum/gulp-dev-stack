const fs = require('fs');

const gulp = require('gulp');
const gulpif = require('gulp-if');
const stylelint = require('gulp-stylelint');
const cached = require('gulp-cached');
const postcss = require('gulp-postcss');
const postscss = require('postcss-scss');
const postcssSorting = require('postcss-sorting');

const config = require('../config');

const stylelintrc = JSON.parse(fs.readFileSync('.stylelintrc', 'utf8'));

const PRODUCTION = config.environment.isProduction;
const DEVELOPMENT = config.environment.isDevelopment;
const propertiesOrder = stylelintrc.rules['order/properties-order'];

gulp.task('stylelint', () =>
  gulp
    .src(config.CSS_ALL)
    .pipe(cached('stylelint'))
    .pipe(
      gulpif(
        DEVELOPMENT,
        postcss([postcssSorting({ 'properties-order': propertiesOrder })], {
          syntax: postscss,
        }),
      ),
    )
    .pipe(gulpif(DEVELOPMENT, gulp.dest(config.CSS_BASE)))
    .pipe(
      stylelint({
        failAfterError: PRODUCTION,
        reporters: [
          {
            formatter: 'string',
            console: true,
          },
        ],
        fix: DEVELOPMENT,
      }),
    )
    .pipe(gulpif(DEVELOPMENT, gulp.dest(config.CSS_BASE))),
);
