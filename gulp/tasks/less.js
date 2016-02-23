import gulp from 'gulp';
import { argv } from 'yargs';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import combiner from 'stream-combiner2';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import cssGlobbing from 'gulp-css-globbing';
import browserSync from 'browser-sync';
import config from '../config';

const { src, dist } = config.paths;
const names = config.names;
const isDev = argv.dev || false;

gulp.task('less', () => {
    let postcssPlugins = [
        autoprefixer({browsers: ['last 1 version']})
    ];
    let postcssAfterPlugins = [
        cssnano()
    ];
    // Is there any reason for using stream-combiner?
    // I tested the same pipeline without it and it works fine.
    // But maybe I'm missing something…
    let combined = combiner.obj([
        gulp.src(src.less.entry),
        cssGlobbing({ extensions: ['.css', '.less'] }),
        sourcemaps.init(),
        less({
            paths: [src.less.base, src.bower]
        }),
        postcss(postcssPlugins),
        gulpif(isDev, sourcemaps.write()),
        rename(names.css.src),
        gulp.dest(isDev ? src.less.dest : dist.css),
        gulpif(isDev, browserSync.stream()),
        gulpif(!isDev, postcss(postcssAfterPlugins)),
        gulpif(!isDev, rename(names.css.min)),
        gulpif(!isDev, gulp.dest(dist.css))
    ]);
    return combined;
});
