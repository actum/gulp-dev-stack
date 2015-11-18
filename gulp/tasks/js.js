import gulp from 'gulp';
import { argv } from 'yargs';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
// import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import config from '../config';

const { src, dist } = config.paths;
const names = config.names;
const isDev = argv.dev || false;

// todo isDev ? sourcemaps

const bundle = () => {
    const opts = {
        entries: src.app.entry,
        debug: isDev,
        transform: [babelify]
    };
    const bundler = isDev ? watchify(browserify(Object.assign({}, watchify.args, opts))) : browserify(opts);
    const rebundle = () => {
        return bundler.bundle()
            .on('error', e => gutil.log(gutil.colors.red(e.name) + e.message.substr(e.message.indexOf(': ') + 1)))
            .pipe(source(names.js.src))
            .pipe(buffer())
            .pipe(gulpif(isDev, sourcemaps.init({ loadMaps: true })))
            .pipe(gulpif(isDev, sourcemaps.write('./')))
            .pipe(gulp.dest(isDev ? src.app.dest : dist.js))
            .pipe(gulpif(isDev, browserSync.reload({ stream: true })))
            .pipe(gulpif(!isDev, uglify()))
            .pipe(gulpif(!isDev, rename(names.js.min)))
            .pipe(gulpif(!isDev, gulp.dest(dist.js)));
    };
    bundler
        .on('update', rebundle)
        .on('log', gutil.log);
    return rebundle();
};
gulp.task('js', ['lint'], () => bundle());