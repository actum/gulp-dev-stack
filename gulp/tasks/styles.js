import gulp from 'gulp';
import { argv } from 'yargs';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import flexbugsFixes from 'postcss-flexbugs-fixes';
import cssnano from 'cssnano';
import cssGlobbing from 'gulp-css-globbing';
import browserSync from 'browser-sync';
import config from '../config';

const { src, dist } = config.paths;
const isDev = argv.dev || false;

gulp.task('styles', () => {
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
        .pipe(gulp.dest(isDev ? src.styles.dest : dist.css))
        .pipe(gulpif(isDev, browserSync.stream()))
        .pipe(gulpif(!isDev, postcss(postcssDistPlugins)))
        .pipe(gulpif(!isDev, rename(path => path.basename += '.min')))
        .pipe(gulpif(!isDev, gulp.dest(dist.css)));
});
