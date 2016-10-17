const gulp = require('gulp');
const path = require('path');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const glob = require('glob');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('gulp-babel');
const babelify = require('babelify');
const uglifyify = require('uglifyify');
const envify = require('envify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const transform = require('vinyl-transform');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const browserSync = require('browser-sync');
const config = require('../config');

const src = config.paths.src;
const dist = config.paths.dist;
const names = config.names;
const isDev = argv.dev || false;

function bundle() {
    const transforms = [envify, babelify];
    const opts = {
        entries: src.app.entry,
        debug: isDev,
        transform: isDev ? transforms : [...transforms, uglifyify]
    };
    const bundler = isDev ? watchify(browserify(Object.assign({}, watchify.args, opts))) : browserify(opts);

    function rebundle() {
        return bundler.bundle()
            .on('error', e => gutil.log(gutil.colors.red(e.name) + e.message.substr(e.message.indexOf(': ') + 1)))
            .pipe(source(names.js.src))
            .pipe(buffer())
            .pipe(gulpif(isDev, sourcemaps.init({ loadMaps: true })))
            .pipe(gulpif(isDev, sourcemaps.write('./')))
            .pipe(gulp.dest(dist.js.base))
            .pipe(gulpif(isDev, browserSync.stream()))
            .pipe(gulpif(!isDev, uglify()))
            .pipe(gulpif(!isDev, rename(names.js.min)))
            .pipe(gulpif(!isDev, gulp.dest(dist.js.base)));
    };

    bundler
        .on('update', rebundle)
        .on('log', gutil.log);
    return rebundle();
};

gulp.task('js:vendor', () => {
    glob(src.app.vendor.all, (err, files) => {
        if (err) { done(err); }

        files.map((entry) => {
            return browserify({
                    entries: entry,
                    transform: [babelify]
                })
                .bundle()
                .pipe(source(path.relative(src.app.vendor.base, entry)))
                .pipe(browserSync.stream({ once: true }))
                .pipe(gulp.dest(dist.js.vendor))
        });
    });
});

gulp.task('js', ['lint', 'js:vendor'], bundle);
