const gulp = require('gulp');
const argv = require('yargs').argv;
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

// const { src, dist } = config.paths;
const src = config.paths.src;
const dist = config.paths.dist;
const isDev = argv.dev || false;

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
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(gulp.dest(dist.css))
        .pipe(gulpif(isDev, browserSync.stream()))
        .pipe(gulpif(!isDev, postcss(postcssDistPlugins)))
        .pipe(gulpif(!isDev, rename(path => path.basename += '.min')))
        .pipe(gulpif(!isDev, gulp.dest(dist.css)));
});
