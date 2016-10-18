/* Environment */
const DEVELOPMENT = require('../environment').isDevelopment;
const PRODUCTION = !DEVELOPMENT;

/* Plugins */
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const cssnano = require('cssnano');
const cssGlobbing = require('gulp-css-globbing');
const browserSync = require('browser-sync');
const config = require('../config');

/* Paths */
const src = config.paths.src;
const dist = config.paths.dist;

gulp.task('styles', ['stylelint'], () => {

    const postcssPlugins = [
        flexbugsFixes, // first must be flexbugs, because flexbugs do not process vendor-prefixed variants
        autoprefixer({ browsers: ['last 2 versions'] })
    ];

    const postcssDistPlugins = [
        cssnano({ safe: true })
    ];

    return gulp.src(src.styles.entry)
        .pipe(cssGlobbing({ extensions: ['.css', '.scss'] }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(gulpif(DEVELOPMENT, sourcemaps.write()))
        .pipe(gulp.dest(dist.css))
        .pipe(gulpif(DEVELOPMENT, browserSync.stream()))
        .pipe(gulpif(PRODUCTION, postcss(postcssDistPlugins)))
        .pipe(gulpif(PRODUCTION, rename(path => path.basename += '.min')))
        .pipe(gulpif(PRODUCTION, gulp.dest(dist.css)));
});
