import gulp from 'gulp';
import { argv } from 'yargs';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import combiner from 'stream-combiner2';
import less from 'gulp-less';
import lessPluginGlob from 'less-plugin-glob';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import config from '../config';
import browserSync from 'browser-sync';

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
    let combined = combiner.obj([
        gulp.src(src.less.entry),
        sourcemaps.init(),
        less({
            paths: [src.less, src.bower],
            plugins: [lessPluginGlob]
        }),
        postcss(postcssPlugins),
        gulpif(isDev, sourcemaps.write()),
        rename(names.css.src),
        gulp.dest(isDev ? src.less.dest : dist.css),
        gulpif(isDev, browserSync.reload({ stream: true })),
        gulpif(!isDev, postcss(postcssAfterPlugins)),
        gulpif(!isDev, rename(names.css.min)),
        gulpif(!isDev, gulp.dest(dist.css))
    ]);
    return combined;
});