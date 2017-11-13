import gulp from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import cssnano from 'cssnano';
import postCSS from 'gulp-postcss';
import flexbugsFixes from 'postcss-flexbugs-fixes';
import sourcemaps from 'gulp-sourcemaps';
import environment from '../environment';
import { CSS } from '../../config';

const DEVELOPMENT = environment.is('development');
const PRODUCTION = !DEVELOPMENT;

gulp.task('styles', ['stylelint'], () => {
    const postcssPlugins = [
        // flexbugs must come first, because flexbugs do not process vendor-prefixed variants
        flexbugsFixes,
        autoprefixer({ browsers: ['last 2 versions'] })
    ];

    const postcssDistPlugins = [
        cssnano({ safe: true })
    ];

    return gulp.src(CSS.SRC_ENTRY)
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(postCSS(postcssPlugins))
        .pipe(gulpif(DEVELOPMENT, sourcemaps.write()))
        .pipe(gulp.dest(CSS.BUILD_DIR))
        .pipe(gulpif(DEVELOPMENT, browserSync.stream()))
        .pipe(gulpif(PRODUCTION, postCSS(postcssDistPlugins)))
        .pipe(gulpif(PRODUCTION, rename({ suffix: '.min' })))
        .pipe(gulpif(PRODUCTION, gulp.dest(CSS.BUILD_DIR)));
});
