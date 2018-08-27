const gulp = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const uglifyify = require('uglifyify');
const envify = require('envify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const browserSync = require('browser-sync');

const config = require('../config');

const DEVELOPMENT = config.environment.isDevelopment;
const PRODUCTION = !DEVELOPMENT;

function bundle() {
  const transforms = [babelify, envify];
  const opts = {
    entries: config.JS_ENTRY,
    debug: DEVELOPMENT,
    transform: DEVELOPMENT ? transforms : [...transforms, uglifyify],
  };
  const bundler = DEVELOPMENT
    ? watchify(browserify(Object.assign({}, watchify.args, opts)))
    : browserify(opts);
  const rebundle = () =>
    bundler
      .bundle()
      .on('error', (e) =>
        gutil.log(`${gutil.colors.red(`${e.name}:`)} ${e.message}`),
      )
      .pipe(source(config.JS_MAIN_FILENAME))
      .pipe(buffer())
      .pipe(gulpif(DEVELOPMENT, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(DEVELOPMENT, sourcemaps.write('./')))
      .pipe(gulp.dest(config.JS_BUILD))
      .pipe(gulpif(DEVELOPMENT, browserSync.stream()))
      .pipe(gulpif(PRODUCTION, uglify()))
      .pipe(gulpif(PRODUCTION, rename({ suffix: '.min' })))
      .pipe(gulpif(PRODUCTION, gulp.dest(config.JS_BUILD)));
  bundler.on('update', rebundle).on('log', gutil.log);
  return rebundle();
}

gulp.task('js', ['eslint'], bundle);
