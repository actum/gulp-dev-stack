import gulp from 'gulp';
import { argv } from 'yargs';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import cssGlobbing from 'gulp-css-globbing';
import browserSync from 'browser-sync';
import config from '../config';

const { src, dist } = config.paths;
const cssNames = config.names.css;
const isDev = argv.dev || false;

gulp.task('styles', () => {
    const postcssPlugins = [
        autoprefixer({ browsers: ['last 2 versions'] })
    ];
    const postcssDistPlugins = [
        cssnano()
    ];

    return gulp.src(src.styles.entry)
        .pipe(cssGlobbing({ extensions: ['.css', '.scss'] }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(rename(cssNames.src))
        .pipe(gulp.dest(isDev ? src.styles.dest : dist.css))
        .pipe(gulpif(isDev, browserSync.stream()))
        .pipe(gulpif(!isDev, postcss(postcssDistPlugins)))
        .pipe(gulpif(!isDev, rename(cssNames.min)))
        .pipe(gulpif(!isDev, gulp.dest(dist.css)));
});
