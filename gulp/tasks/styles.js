const config = require('../config');
const DEVELOPMENT = config.environment.isDevelopment;
const PRODUCTION = !DEVELOPMENT;
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const sassGlob = require('gulp-sass-glob');
const cssnano = require('cssnano');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', ['stylelint'], () => {
    const postcssPlugins = [
        flexbugsFixes, // first must be flexbugs, because flexbugs do not process vendor-prefixed variants
        autoprefixer({ browsers: ['last 2 versions'] })
    ];

    const postcssDistPlugins = [
        cssnano({ safe: true })
    ];

    return gulp.src(config.CSS_ENTRY)
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(postcss(postcssPlugins))
        .pipe(gulpif(DEVELOPMENT, sourcemaps.write()))
        .pipe(gulp.dest(config.CSS_BUILD))
        .pipe(gulpif(DEVELOPMENT, browserSync.stream()))
        .pipe(gulpif(PRODUCTION, postcss(postcssDistPlugins)))
        .pipe(gulpif(PRODUCTION, rename({ suffix: '.min' })))
        .pipe(gulpif(PRODUCTION, gulp.dest(config.CSS_BUILD)));
});
