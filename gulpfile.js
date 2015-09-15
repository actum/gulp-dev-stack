var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var argv = require('yargs').argv;
var del = require('del');
var assign = require('lodash.assign');

var eslint = require('gulp-eslint');

var less = require('gulp-less');
var cleancss = require('less-plugin-clean-css');
var autoprefixer = require('gulp-autoprefixer');

var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync').create();

gulp.task('lint:gulpfile', function() {
    // TODO eslint options
    return gulp.src(['gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('clean:build', function(cb) {
    del([
        './www/css/*',
        './www/js/*'
    ], cb);
});

gulp.task('less', ['clean:build'], function() {
    var lessOptions = {
        paths: [path.join(__dirname, './www/less', 'www/bower')],
        relativeUrls: true
    };
    if (!argv.dev) {
        lessOptions.plugins = [
            new cleancss({
                advanced: true
            })
        ];
    }
    return gulp.src('./www/less/main.less')
        .pipe(sourcemaps.init())
        .pipe(less(lessOptions))
        .pipe(autoprefixer({
            browsers: ['> 5%', 'last 2 version', 'ie 10', 'ie 9', 'ie 8']
        }))
        .pipe(sourcemaps.write())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./www/css'));
});

gulp.task('lint:app', function() {
    // TODO eslint options
    return gulp.src(['./www/app/**/*.js'])
        .pipe(eslint({
            rules: {
                quotes: [2, 'single']
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// TODO: add custom browserify options here
var customOpts = {
    entries: ['./www/app/app.js'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));
var bundleJs = function(filepath) {
    if (typeof filepath === 'object') {
        console.log('lint');
        gulp.src([filepath[0]])
            .pipe(eslint({
                rules: {
                    quotes: [2, 'single']
                }
            }))
            .pipe(eslint.format())
            .pipe(eslint.failOnError());
    }
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('app-compiled.js'))
        .pipe(buffer())
        .pipe(gulpif(argv.dev, sourcemaps.init({loadMaps: true}))) // loads map from browserify file
        .pipe(gulpif(argv.dev, sourcemaps.write('./'))) // writes .map file
        .pipe(gulp.dest('./www/js/'));
};
// so you can run `gulp js` to build the file
gulp.task('js', ['lint:app'], bundleJs);

gulp.task('default', ['less', 'js'], function() {
    browserSync.init({
        // watchTask: true,
        port: 4444,
        server: {
            baseDir: './www'
        },
        open: false
    });
    gulp.watch(['./www/*.html', './www/css/style.css', './www/js/app-compiled.js']).on('change', browserSync.reload);
    gulp.watch(['./www/less/**/*'], ['less']);
    
    b.on('update', bundleJs); // on any dep update, runs the bundler
    b.on('log', gutil.log); // output build logs to terminal
});

gulp.task('build', ['clean:build', 'lint:gulpfile', 'less', 'js']);
